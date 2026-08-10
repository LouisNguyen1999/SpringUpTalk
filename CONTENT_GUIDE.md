# Content Guide

Mỗi topic phải có mục đích giao tiếp riêng, ưu tiên 3–5 conversation và mỗi conversation 6–12 lượt xen kẽ A/B. Một số topic cũ có thể có 2 conversation nhưng batch mới không được giảm độ sâu. Viết tiếng Việt tự nhiên trước, sau đó biên soạn English theo ý định thay vì dịch từng chữ.

Với mỗi lượt:

- `canonicalAnswer`: rõ, đúng cấp độ và tự nhiên.
- `acceptedAnswers`: luôn chứa canonical; thêm biến thể thực sự tương đương.
- `naturalAlternatives`: cách nói tự nhiên hơn nhưng không dùng làm đáp án bắt buộc.
- `requiredKeywords`: chỉ chứa ý không thể bỏ; tránh function words.
- `semanticConstraints`: dùng khi polarity, dạng câu hỏi, thì, con số hoặc concept là điều kiện làm thay đổi nghĩa; không tự suy diễn metadata hàng loạt.
- `commonMistakes`: regex hẹp, correction và giải thích cụ thể bằng tiếng Việt.
- `vocabulary`: chỉ thêm từ/cụm đáng học, có nghĩa và ví dụ mới.

Không tạo nội dung bằng cách chỉ thay tên, địa danh hoặc đồ vật. Trước khi thêm batch, so sánh mục tiêu, speech act, cấu trúc dialogue và canonical sentences. Validator báo trùng câu toàn dataset; report cũng thống kê opening, trigram, độ dài theo CEFR, vocabulary frequency và structural warning. Người biên tập phải disposition mọi warning, không chỉ chạy auto-fix.

Conversation A/B cần tạo thành một mạch: mở đầu → làm rõ → phản hồi → thương lượng → xác nhận → kết thúc. Cả hai vai phải có câu hữu ích khi học riêng.

Quy trình một batch: scaffold/biên soạn → đăng ký loader → tạo manifest → `content:lint` → `validate:content` → lấy mẫu thủ công 10 conversation mỗi level → full test/build. Không đổi ID đã phát hành; correction cần giữ ID hoặc cung cấp migration mapping.
