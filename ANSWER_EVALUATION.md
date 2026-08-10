# Answer Evaluation

Evaluator là deterministic và chỉ dựa vào dataset:

1. trim, Unicode NFKC, apostrophe/contraction, punctuation, case và khoảng trắng;
2. so khớp canonical + accepted answers sau normalize;
3. chạy rule có cấu trúc cho polarity/question/tense/concept/critical value và common mistakes;
4. nếu turn có semantic constraints được biên soạn, kiểm tra một cách viết khác có thỏa toàn bộ constraint hay không;
5. tính token similarity, keyword coverage và single-typo để tạo feedback;
6. phân loại `correct`, `acceptable`, `almost-correct`, hoặc `incorrect`.

`correct` chỉ xảy ra khi khớp canonical/accepted đã biên soạn. `acceptable` chỉ xảy ra khi metadata semantic tồn tại và mọi constraint đều đạt. Similarity không bao giờ tự cho đúng: score từ 82 trở lên, đủ keyword và không có lỗi critical chỉ tạo `almost-correct`. Polarity đảo, sai tense bắt buộc, sai loại câu hỏi và sai con số/concept critical luôn chặn kết quả đúng.

Mistake detector ưu tiên rule semantic và rule do người biên soạn cung cấp, sau đó bổ sung missing/extra token có giới hạn để tránh feedback nhiễu. A1/A2 hiện tối đa hai lỗi ưu tiên; B1/B2 tối đa bốn. Diff hiện token đỏ/xanh; canonical bị ẩn đến lần thử thứ ba hoặc khi người học chủ động xem đáp án.

Golden set cố định gồm 100 case positive/negative, bao phủ contraction, accepted variants, typo, polarity, tense, question form, numeric/critical concepts và giới hạn similarity. Ngoài ra validator chạy toàn bộ canonical và accepted answers của dataset ở mỗi build.
