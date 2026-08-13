# Vocabulary Practice

Module Vocabulary Practice là hệ thống học từ vựng offline theo quy trình: tìm từ → hiểu nghĩa và cách dùng → viết câu Việt–Anh → ôn lại theo lịch → đạt mastery. Đây không phải từ điển tổng quát và không gọi API dịch, AI hay backend.

## Phạm vi dữ liệu

- Repository có 5.950 mục chuẩn hóa từ 5.948 mục vocabulary trong 500 topic, cộng hai mục biên soạn trọng tâm `deadline` và `issue` (các bản ghi trùng được hợp nhất).
- Phase 1 bật luyện cho đúng 500 mục, mỗi mục có 5 câu, tổng 2.500 `VocabularyPracticeItem`.
- Mỗi bài giữ prompt tiếng Việt, canonical/accepted answers, target expression, CEFR, sense và source topic/conversation khi có.
- `issue` minh họa multi-sense noun/verb. `deadline` minh họa collocation và phân biệt “đúng ý” với “đã dùng đúng cụm mục tiêu”.
- Mục chưa có bài vẫn tìm và xem chi tiết được. Từ không có trong repository hiển thị trạng thái chưa biết; ứng dụng không tự đoán nghĩa.

## Kiến trúc dữ liệu

`scripts/generate-vocabulary-data.ts` đọc content nguồn, chuẩn hóa term, hợp nhất nghĩa và tạo:

```text
src/data/vocabulary/
  vocabulary-repository.ts
  generated/
    vocabulary-index.generated.json
    details/0..15.generated.json
    practice/0..15.generated.json
```

Index nhẹ được tải cùng route tìm kiếm. Detail và practice chia 16 shard, chỉ tải khi mở từ tương ứng và được cache bởi repository/PWA. UI không import trực tiếp topic content.

Không sửa JSON generated bằng tay. Sau khi thay đổi content hoặc logic generator, chạy:

```bash
npm run vocabulary:generate
npm run vocabulary:validate
npm run vocabulary:report
```

Validator chặn ID/normalized key trùng, reference mồ côi, item lỗi schema, canonical/accepted answer không được evaluator chấp nhận, target expression không có trong canonical và coverage dưới 500×5.

## Chế độ luyện

- Quick Practice: 5 câu.
- Standard Practice: 10 lượt truy hồi qua hai vòng.
- Master This Word: tiếp tục cho tới khi dùng đúng target expression 5 lần liên tiếp.

Người học được thử lại không giới hạn, dùng ba cấp hint hoặc xem đáp án. `correct-target` cộng production mastery; `acceptable-meaning` xác nhận đúng nghĩa nhưng nhắc dùng cụm mục tiêu; câu xem đáp án không được tính là tự sản xuất. Lỗi được đưa vào Review bằng `vocabularyId` và scheduler chung.

## Flexible vocabulary và lookup online

Người dùng có thể thêm, sửa và xóa custom vocabulary; thêm/sửa/xóa/disable từng practice sentence; hoặc bỏ static entry khỏi My Vocabulary mà không xóa corpus. Duplicate check dùng canonical identity nên không tạo bản sao chỉ vì case, dấu gạch ngang hay whitespace.

Online pipeline không chứa private API key:

1. [Free Dictionary API](https://dictionaryapi.dev/) cung cấp definition/POS/IPA cho word.
2. [Wiktionary](https://en.wiktionary.org/) là definition fallback cho word/phrase.
3. [Tatoeba API](https://api.tatoeba.org/) cung cấp usage seed có attribution; app không sao chép hàng loạt.
4. [MyMemory REST API](https://mymemory.translated.net/doc/spec.php) dịch các segment ngắn EN→VI.
5. Generator ưu tiên controlled templates đa context, deduplicate và chỉ lưu item khi canonical/accepted answers đều qua evaluator và canonical chứa target expression.

Kết quả được cache trong localStorage và dùng offline. Không lookup lại khi mở trang; `Cập nhật dữ liệu từ Internet` và `+5 câu` là thao tác chủ động. Nếu offline/provider lỗi/timeout/no-result/translation lỗi, UI cho retry và giữ form nhập thủ công.

## Persistence V8

Static definitions chỉ nằm trong repository. localStorage key cũ `lingotalk-progress` được giữ để không mất dữ liệu, nhưng `VocabularyProgress` chỉ lưu ID, counters, mastery, favorite và lịch ôn. Migration V7 loại các bản sao meaning/example cũ khỏi static progress. V8 thêm danh sách practice bị disable, giữ nguyên toàn bộ dữ liệu V7; generated exercises và static edits nằm trong practice local, không ghi ngược vào shard.

Từ tự tạo là ngoại lệ có chủ đích: definition và bài luyện do người dùng tự nhập nằm trong `customVocabulary` và `customVocabularyPractice` trên thiết bị. Không có đồng bộ đám mây; xóa dữ liệu trình duyệt sẽ xóa các mục này.

## Kiểm tra

```bash
npm run lint
npm run typecheck
npm run test
npm run vocabulary:validate
npm run vocabulary:report
npm run test:e2e
npm run build
npm run test:e2e:pwa
```

Unit test bao phủ repository/evaluator/mastery/migration; component test bao phủ search/detail/custom/practice; Playwright bao phủ desktop/mobile, retry, Review, persistence và tải lại detail/practice shard khi offline.

## Giới hạn đã biết

- Public providers là best-effort và có thể có quota/downtime; cache không đồng nghĩa dữ liệu online luôn khả dụng lần đầu.
- Dịch tự động và controlled templates phải được người học kiểm tra; UI cung cấp edit/disable/delete. Quality gate xác nhận cấu trúc dữ liệu, target và evaluator, nhưng không thay thế biên tập viên ngôn ngữ cho mọi expression hiếm.
- Static corpus vẫn read-only. Người dùng có thể override/disable practice hoặc remove khỏi notebook, nhưng không xóa definition gốc.

Checkpoint định lượng hiện tại nằm trong [VOCABULARY_COVERAGE_REPORT.md](VOCABULARY_COVERAGE_REPORT.md).
