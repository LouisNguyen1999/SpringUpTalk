# Roadmap

Core product và content schema đã được mở rộng thành 250 topic có biên tập thuộc 19 category. Các ID cũ vẫn ổn định; progress V5 lưu riêng Person A/B và được migrate tại chỗ, vocabulary variant được hợp nhất theo canonical key và dữ liệu người dùng hiện tại không bị reset.

Lộ trình content chi tiết từ 250 tới 1000 nằm trong [CONTENT_SCALE_PLAN.md](CONTENT_SCALE_PLAN.md). Mỗi batch tiếp theo vẫn cần review về trùng ý định, độ tự nhiên và CEFR. Conversation hiện là dynamic chunks; app shell được precache và content được cache theo nhu cầu. Khi history lớn hơn, có thể chuyển persistence adapter sang IndexedDB và phát triển scheduler 1/3/7/14 ngày thành mô hình thích nghi theo lịch sử người học.
