---
title: 221124 TIL: PLM Input Features
date: 2022-11-24
description: 1 day 1 lesson
category: "TIL"
---

## 1. PLM
- `input_ids`: 어휘집(vocab)을 기준으로 토큰들의 ID를 나열한 리스트이다.
- `token_type_ids`: 두 개의 문장을 입력으로 받았을 경우, 첫 번째 문장은 0으로, 두 번째 문장은 1로 구분한다.
- `attention_mask`: 어텐션 연산이 수행되어야 하는 토큰에는 1을, 나머지 토큰에는 0을 할당한다.
