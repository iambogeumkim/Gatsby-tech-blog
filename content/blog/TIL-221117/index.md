---
title: "221117 TIL: PyTorch, Encoder/Decoder"
date: "2022-11-17"
description: "1 day 1 lesson"
category: "TIL"
---

### 1. PyTorch   
- 데이터셋을 고루고루 섞고 싶으면 `torch.utils.data.random_split`을 사용한다.   
- 2개로 나눌 수도 있고 3개로 나눌 수도 있다.   
예시) `train_dataset`, `valid_dataset`, `test_dataset = torch.utils.data.random_split(train_set, [train_size, valid_size, test_size])`   

### 2. Encoder/Decoder   
- 인코더로 텍스트 생성은 가능하지만, 굳이 인코더를 사용할 필요는 없다.   
- 생성 작업에는 디코더 기반 모델을 사용해야 한다!