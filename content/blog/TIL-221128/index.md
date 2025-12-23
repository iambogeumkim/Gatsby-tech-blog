---
title: "221128 TIL: PyTorch Warmup과 Pandas 효율성"
date: "2022-11-28T12:00:00.000+09:00"
description: "1 day 1 lesson"
category: "TIL"
---

## 1. PyTorch
- Warmup: 학습률(lr)을 0.01로 지정하고 워밍업(warmup)을 사용할 경우, 학습률을 한 번에 0.01로 설정하는 것이 아니라 값을 서서히 증가시키면서 0.01이 되도록 한다. (이는 오픈채팅방에서 얻은 정보이므로 추가 조사가 필요하다.)

## 2. Pandas
- Pandas에서 `for` 문을 사용하면 성능이 느려진다.