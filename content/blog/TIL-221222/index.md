---
title: 221222 TIL: Stable Diffusion 개요 및 구성 요소
date: 2022-12-22
description: 1 day 1 lesson
category: "TIL"
---

## 1. Stable Diffusion (맛보기)
- 텍스트(입력) → 이미지(출력)
- Stable Diffusion 구성: Encoder (입력으로 들어온 텍스트를 이해하는 역할) + Image Generator
- Encoder는 CLIP 모델의 텍스트 인코더이다.
- Image Generator 구성: Image Information Creator (UNet & Scheduler) + Image Decoder (오토인코더 디코더)