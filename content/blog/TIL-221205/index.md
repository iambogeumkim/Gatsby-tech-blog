---
title: 221205 TIL: Pandas 데이터셋 분할 (train/valid)
date: 2022-12-05
description: 1 day 1 lesson
category: "TIL"
---

## 1. Pandas
- 데이터프레임 형태에서 Train/Validation 데이터셋을 나누고 싶을 때, `데이터프레임명.sample(frac=원하는 비율, random_state=값)`을 사용하면 완전 랜덤하게 데이터셋을 나눌 수 있다.