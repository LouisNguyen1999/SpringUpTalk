# Writing Learning Path

Writing Learning Path sắp xếp 500 Writing Topics hiện có thành lộ trình đề xuất. Nó không thay đổi nội dung tiếng Việt, evaluator, mastery hay quyền Free Browse.

## Coverage

- 500/500 topics được map đúng một main unit.
- 24 units: 6 unit cho mỗi level A1, A2, B1 và B2.
- Daily Path: 300 topics.
- IT Path: 200 topics.
- Story: 356; Problem Explanation: 144.
- 16 writing skills, gồm situation, sequence, reason, cause/result, problem, action, result, next step, apology, plan change, summary, technical issue, blocker, risk, tradeoff và incident update.

Static metadata chỉ giữ `topicId`, `unitId`, order, skills và difficulty score. Full topic vẫn nằm trong Writing shards và không bị sao chép.

## Progression

```text
A1: tình huống → người/nơi/thời gian → trình tự → kế hoạch → vấn đề → kết quả
A2: lý do → cause/result → đổi kế hoạch → vấn đề → action/outcome → update
B1: full account → detailed cause → problem → blocker → bug → follow-up
B2: complex context → uncertainty → incident → risk → tradeoff → stakeholder explanation
```

Mỗi level được stratify theo `domain × writingType`, sau đó xếp bằng difficulty deterministic. Vì vậy difficulty tăng dần nhưng mỗi unit vẫn trộn Daily/IT và Story/Problem theo coverage thực tế.

## Difficulty model

Điểm 0–100 chỉ được tính từ dữ liệu tĩnh:

- CEFR base;
- số required ideas;
- critical facts;
- số từ trong Vietnamese source;
- số target structures;
- số story/problem arc stages;
- problem-explanation và IT communication load.

Không gọi AI và không lưu điểm vào progress.

## Unlock rule

Unit tiếp theo được đề xuất khi unit hiện tại đồng thời đạt:

- số topic truyền đạt tốt `>= ceil(total × 70%)`;
- số topic mastery-ready `>= ceil(total × 60%)`;
- topic yếu `<= floor(total × 25%)`.

Khóa chỉ là trạng thái recommended. Mọi unit và toàn bộ 500 topics luôn mở qua Unit page hoặc Free Browse. Review không làm tụt unit và mastery vẫn thuộc Writing module.

## Continue Learning

`Tiếp tục luyện viết` chọn deterministic theo thứ tự:

1. draft chưa hoàn thành;
2. due review cũ nhất;
3. topic cùng level/current unit luyện skill yếu nhất;
4. topic tiếp theo trong current unit/path.

Daily Learning giữ priority review hiện có, sau đó dùng weak skill, current unit và path order để xếp new Writing candidates.

## Persistence

Progress V12 chỉ thêm:

- `writingPathPreference`: `all | daily-life | it-work`;
- `writingCurrentUnitId` tùy chọn.

Units, skill metadata và difficulty không persist. Migration V11 → V12 giữ nguyên mọi draft, attempt, mastery và review date.

## Commands

```bash
npm run writing:path:generate
npm run writing:path:validate
npm run writing:path:report
```

Validator kiểm tra đủ 500 mappings, orphan/duplicate, unit/order, skill, prerequisite, CEFR progression, unlock chain và tái tạo deterministic metadata.
