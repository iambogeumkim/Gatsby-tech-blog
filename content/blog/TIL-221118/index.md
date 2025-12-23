---
title: 221118 TIL: PLM & Tensor
date: 2022-11-18
description: 1 day 1 lesson
category: "TIL"
---

### 1. PLM
- Hugging Face 모델 사용 시 모델과 토크나이저 쌍을 맞춰야 한다.
- `tokenizer.decode(100)`과 `tokenizer.decode(100.0)`이 다르므로, 정수형으로 변경해야 한다.
   
### 2. Tensor
- 정수 리스트를 `torch.Tensor()`를 이용해 Tensor 형태로 바꾸면 정수형 그대로 들어가는 것이 아니라 2.5e+00와 같은 형태로 바뀐다.
