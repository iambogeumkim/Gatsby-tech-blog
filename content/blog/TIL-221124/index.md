---
title: "221124 TIL: PLM 입력의 구성 요소"
date: "2022-11-24T12:00:00.000+09:00"
description: "1 day 1 lesson"
category: "TIL"
---

## 1. PLM (Pre-trained Language Model)
- `input_ids`: 토큰(token)들의 ID 리스트이다. (어휘집(vocab) 기준)
- `token_type_ids`: 2개의 문장을 입력으로 받았을 경우 첫 번째 문장은 0, 두 번째 문장은 1로 구분한다.
- `attention_mask`: 어텐션(attention) 연산이 수행되어야 하는 토큰에는 1, 나머지는 0이다.