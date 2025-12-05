---
title: "멀고도 험한 오픈소스 코드 기여의 길(가제)" 
date: "2025-09-05T12:00:00.000+09:00"
description: Hugging Face PEFT 라이브러리 코드 기여를 향한 여정
category: "Contribution"
---
일단 막 적어놓고 작업 끝나면 정리해야겠다.

기존 kasa 코드: 그냥 peft 라이브러리 안에 바로 구현한 듯

hf에서 원하는 방향: 사용자가 활성화했을 때만 쓸 수 있게 클래스로 따로 빼는 것

## Benjamin guide (1)
![benjamin 1](./img/b1.png)

이 단계 작업하다가 어떤 파일을 어떻게 수정해야하는지 아예 감을 못 잡음

그래서 질문 남김
![me 1](./img/m1.png)

## Benjamin guide (2)
그는 천사였음

![benjamin 2-1](./img/b2-1.png)
![benjamin 2-2](./img/b2-2.png)

- KasaLinearVariant 추가해뒀는데 이게 가장 중요한 거라 제대로 추가한 게 맞음

- 하지만 KasaLinearVariant 내부 코드 변경 필요

    - DoRA에만 해당하고 KaSA에서는 불필요한 코드가 일부 있기 때문
    
    - 근데 이 작업이 지금 우선순위는 아니라서 변경해야 한다는 것만 인지하고 있으면 됨

- lora/layer.py에 self.use_kasa 속성을 추가해놨는데 이건 필요없음

    - self.use_dora는 과거 코드와 호환성을 유지하려고 있는 것뿐임

- lora/layer.py는 아래처럼 수정하면 됨

```python
def resolve_lora_variant(self, *, use_dora: bool, use_kasa: bool, **kwargs) -> Optional[LoraVariant]:
    if use_dora and use_kasa:
        raise ValueError("Cannot use DoRA and KaSA at the same time, please choose only one.")

    variant = None
    if use_dora:
        from .variants import DoraLinearVariant

        variant = DoraLinearVariant()
    elif use_kasa:
        ...

    return variant
```
    
💭 코드블럭까지 추가해서 설명해주는 메인테이너에게 감동 안 받을 사람 없다고 본다 진짜로

- 위랑 비슷한 방식으로 다른 LoRA 레이어들의 resolve_lora_variant 메서드도 KaSA와 함께 작동하는지 여부에 따라 업데이트 필요(KaSA가 Conv2d 등과 함께 작동하는지는 확실하지 않음)

💭 내가 왜 손을 못 대고 있었을까? → 어떤 게 LoRA 레이어인지 모르는 상태로 코드부터 고치려고 했기 때문인 듯

### DoraLinearVariant 클래스 분석
DoraLinearVariant 클래스를 한 번 다시 보자.

- LoraVariant를 상속받음

- init, merge_safe, merge_unsafe, unmerge

    - 다 static 메서드
        
        - @staticmethod 데코레이터를 사용하는 함수는 self 매개변수를 사용하지 않음

# 기존 LoRA: W + B @ A (원본 가중치 + 적응)
# KASA: W_compressed + B @ diag @ A (압축된 가중치 + 대각선 적응)

요약
KASA의 SVD 구현은 이중 압축 전략을 사용합니다:
SVD로 가중치 압축: 원본 가중치를 저차원으로 압축
대각선 행렬로 적응: 압축된 공간에서 효율적인 적응
계산 복잡도 최적화: 전체 파라미터 수를 크게 줄이면서도 성능 유지
이렇게 SVD와 대각선 행렬을 결합하여 기존 LoRA보다 더 효율적인 적응을 가능하게 합니다.