# Vocabulary Coverage Report

Generated checkpoint: Phase 1 Vocabulary Practice.

## Summary

| Metric | Value |
| --- | ---: |
| Existing topics | 500 |
| Source vocabulary annotations | 6.083 |
| Unique source vocabulary | 5.948 |
| Canonical repository entries | 5.950 |
| Practice-enabled entries | 500 |
| Practice items | 2.500 |
| Coverage ≥ 1 / ≥ 3 / ≥ 5 | 500 / 500 / 500 |
| Canonical evaluator pass | 2.500 / 2.500 |
| Accepted evaluator pass | 5.723 / 5.723 |
| Validation errors / warnings | 0 / 0 |

## Practice distribution

| Dimension | Count |
| --- | ---: |
| A1 / A2 / B1 / B2 | 50 / 135 / 161 / 154 |
| word | 58 |
| noun | 2 |
| phrasal verb | 2 |
| collocation | 65 |
| phrase | 11 |
| expression | 362 |

Mỗi mục phase 1 có đúng 5 item. Selection ưu tiên cụm có thể truy vết ít nhất 5 câu nguồn và trải rộng topic, thay vì tạo câu hàng loạt không có ngữ cảnh. Vì annotation nguồn chủ yếu là cụm/cấu trúc hội thoại, tỷ lệ expression cao phản ánh dataset hiện tại.

## Repository quality

- 12.658 example records và 6.328 collocation records.
- 64 entry có nhiều nghĩa; `issue` có noun/verb sense được biên soạn rõ.
- `timeout` và `time out` có identity riêng để tránh normalized-key collision.
- 6 entry có IPA từ nguồn/curated data. UI nói rõ khi IPA chưa có, không tự sinh.
- 5.450 entry vẫn tra cứu/đọc được nhưng chưa có practice phase 1.
- Duplicate practice sentence trong cùng vocabulary: 0.

## Reproduce

```bash
npm run vocabulary:generate
npm run vocabulary:validate
npm run vocabulary:report
```

`vocabulary:generate` là bước duy nhất ghi các JSON generated. Hai lệnh sau chỉ đọc và kiểm tra dữ liệu. Số liệu authoritative mới nhất luôn là output của `vocabulary:report`.
