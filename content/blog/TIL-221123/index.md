---
title: 221123 TIL: PyTorch Loss & PLM Output
date: 2022-11-23
description: 1 day 1 lesson
category: "TIL"
---

## 1. PyTorch
- `nn.CrossEntropyLoss`는 클래스 형태로, 내부 상태를 저장하는 반면, `F.cross_entropy`는 함수 형태로, 내부 상태를 저장하지 않는다. 하지만 두 함수의 결과는 차이가 없다.
   
## 2. PLM
- `AutoModel` 대신 특정 모델을 명시하여 사용할 때는 `output.logits`을 사용해야 하는 것으로 보인다. (다만, 모델 사용 시마다 확인이 필요하다!)
