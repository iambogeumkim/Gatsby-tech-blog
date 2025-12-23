---
title: 221130 TIL: Transformer와 그래디언트 안정화
date: 2022-11-30
description: 1 day 1 lesson
category: "TIL"
---

## 1. Transformer
- `out = self.embedding(x) * math.sqrt(self.d_embed)` 이 코드는 그래디언트 안정화 목적이다.