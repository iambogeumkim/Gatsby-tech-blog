---
title: "221123 TIL: PyTorch CrossEntropyLoss와 PLM Logits 사용"
date: "2022-11-23T12:00:00.000+09:00"
description: "1 day 1 lesson"
category: "TIL"
---

## 1. PyTorch
- `nn.CrossEntropyLoss` (클래스, 상태 저장)와 `F.cross_entropy` (함수, 상태 저장 안 함)는 결과에는 차이가 없다.
   
## 2. PLM (Pre-trained Language Model)
- `AutoModel` 대신 특정 모델을 명시해서 사용할 때는 `output.logits`을 사용해야 하는 것으로 보인다. (하지만 모델을 사용할 때마다 확인해야 한다.)