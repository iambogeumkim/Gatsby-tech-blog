---
title: "221206 TIL: Pandas sample 후 reset_index() 필요성"
date: "2022-12-06T12:00:00.000+09:00"
description: "1 day 1 lesson"
category: "TIL"
---

## 1. Pandas
- 데이터프레임에 `sample()`을 적용하여 모델 데이터셋을 만들 때 `reset_index()`를 해주어야 모델에 데이터를 넣을 때 `KeyError`가 발생하지 않는다.