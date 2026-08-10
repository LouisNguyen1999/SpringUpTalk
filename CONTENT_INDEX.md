# Content Index

Dataset V3 hiện có **250 topic, 813 conversation, 5.372 lượt** và **2.459 vocabulary/collocation duy nhất**. Mỗi topic có 3–4 hội thoại; mỗi hội thoại có 6–10 lượt, với cả vai A và B đều được luyện.

| Level | Topics | Tỷ lệ |
|---|---:|---:|
| A1 | 65 | 26,0% |
| A2 | 80 | 32,0% |
| B1 | 68 | 27,2% |
| B2 | 37 | 14,8% |

| Category | Topics | Category | Topics |
|---|---:|---|---:|
| Business | 2 | Communication | 5 |
| Community | 20 | Daily Life | 16 |
| Education | 15 | Entertainment | 10 |
| Environment | 1 | Family | 12 |
| Fitness | 5 | Food & Drink | 13 |
| Friends & Social Life | 11 | Health | 13 |
| Home | 23 | Services | 17 |
| Shopping | 12 | Technology | 15 |
| Transportation | 14 | Travel | 12 |
| Work | 34 |  |  |

Các batch 100 → 250 mở rộng dịch vụ công, sức khỏe, giáo dục, cộng đồng, business, môi trường, công nghệ, công việc và đời sống thực tế. 813 learning objective đều duy nhất; exact/normalized/VI/sequence duplicate và near-duplicate warning đều bằng 0.

Manifest đầy đủ được tạo tại `src/data/topic-manifest.generated.json`. Chạy `npm run content:report` để xem số liệu authoritative về level, category, grammar, độ dài theo CEFR, speaker balance, vocabulary frequency, repetition signal, duplicate và evaluator.
