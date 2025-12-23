---
title: 221122 TIL: PLM, Python Counter, PyTorch Dataset 팁
date: 2022-11-22
description: 1 day 1 lesson
category: "TIL"
---

## 1. PLM (Pre-trained Language Model)   
- 허깅페이스에 릴리즈된 모델의 사용법을 모른다면, 허깅페이스 사이트에서 해당 모델을 찾은 후 '\</> Use in Transformers' 기능을 사용한다.   
     
## 2. Python
- `Counter` 모듈을 사용할 때 `Counter(~).most_common()`을 적용하면 개수를 기준으로 오름차순으로 정렬된다.   
    
## 3. PyTorch
- 데이터셋 클래스를 만들 때 `mode = train`을 지정하는 방식을 사용하면 테스트 데이터셋도 깔끔하게 해결할 수 있다.   
- 학습 과정에서 이미 셔플(shuffle)을 진행했기 때문에, Validation/Test `DataLoader`는 셔플할 필요가 없다. (학습 과정이 아니기 때문)