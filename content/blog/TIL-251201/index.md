---
title: "251201 TIL: Gemini API, asyncio"
date: "2025-12-01T12:00:00.000+09:00"
description: "1 day 1 lesson"
category: "TIL"
---
# 🍌 Nano banana pro
##  문제
- Nano banana pro 모델을 이용해 이미지를 생성하던 중 retry 로직을 추가했음에도 api 호출 결과로 `None`이 반환되는 상황이 반복적으로 나타났다.
- 구현해둔 retry 로직상 `None`이 반환되면 모델 호출 및 생성 과정이 다시 돌아가기 때문에 스테이징 서버 테스트 시 종종 timeout error가 뜨는 경우가 있었고, 이 상태로 운영 서버에 배포된다면 생성 결과에 일관성이 없어서 고객들에게 신뢰를 줄 수 없겠다는 생각이 들었다.

## None에 대한 고찰
- '왜 이렇게 None이 자주 뜨지?' 싶어서 그 이유에 대해 고민해보면서 내가 추측한 내용과 각 내용에 대해 스스로 반문해본 결과는 아래와 같다.

    - 💣 유해한 프롬프트?

        - 한창 로컬 환경에서 Gemini api를 테스트 할 때 이유는 알 수 없지만 간혹 '이 프롬프트는 safety 측면에서 필터링되었다'는 뉘앙스의 결과를 본 적이 있다.

        - 내가 정말 toxic한(또는 toxic하다고 의심받을만한) 내용은 넣은 것도 아니었고 해당 결과는 정말 간혹 가다 1~2번 뜰까 말까 한 것이었기 때문에 프롬프트의 문제는 아니라고 판단했다.

    - 💰 토큰수 초과?

        - 이것 또한 Gemini가 감당할 수 없는 양의 토큰을 입력으로 넣었거나 나올 리가 없어서 원인이 아니라고 생각했다.


## 문제 원인 파악 및 해결
- 그렇다면 대체 어떤 부분이 문제일까 싶어서 다소 단순무식한 디버깅 방법이지만 그만큼 가장 확실하다고 생각하는 'print문 찍어보기' 방법으로 `response.candidates` 를 확인해보았다.

- 놀랍게도! 이미지를 출력하는 게 아니라 텍스트 형식으로 **Gemini의 thinking 과정만 출력되는 경우**가 있었다.

- 나는 답변 결과에 이미지가 포함되어 있을 때만 결과를 반환하게 해둔 상태여서 텍스트만 출력되는 경우에 `None`이 뜨는 거였다.

    - 이런 경우를 방지하기 위해 `types.GenerateContentConfig`에 response_modalities 옵션을 추가해서 답변 형식을 IMAGE로 강제하는 방식을 택했다.

        ```python
        config = types.GenerateContentConfig(
            temperature=temperature,
            response_modalities=["Image"], # 추가한 옵션
        )
        ```

    - 참고(Gemini API official documentation)

        ```python
        response = client.models.generate_content(
            model="gemini-3-pro-image-preview",
            contents=[
                prompt,
                Image.open('person1.png'),
                Image.open('person2.png'),
                Image.open('person3.png'),
                Image.open('person4.png'),
                Image.open('person5.png'),
            ],
            config=types.GenerateContentConfig(
                response_modalities=['TEXT', 'IMAGE'],
                image_config=types.ImageConfig(
                    aspect_ratio=aspect_ratio,
                    image_size=resolution
                ),
            )
        )
        ```

## 느낀 점
- 프롬프트 작성만이 아니라 내가 원하는 기능을 제공하는 옵션을 잘 쓸 줄 아는 것도 대 LLM 시대의 중요한 포인트인 것 같다.

# 💻 Python asyncio
## asyncio.gather
- 동시 요청 중 가장 느린 처리 결과에 따라 전체 시간이 결정된다.