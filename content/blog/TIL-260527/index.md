---
title: "260527 TIL: Ollama"
date: "2026-05-27T12:00:00.000+09:00"
description: "1 day 1 lesson"
category: "TIL"
---

# 개요
- 로컬 컴퓨터에서 LLM(대형 언어 모델)을 손쉽게 다운로드하고 실행할 수 있게 해주는 오픈소스 CLI 도구
- "Docker for AI models" 로 불릴 만큼, 명령어 한 줄로 모델 설치부터 실행까지 처리한다

# 등장 배경
- ChatGPT 같은 클라우드 LLM은 편리하지만 데이터가 외부 서버로 전송되고 토큰당 비용이 발생
- 오픈 웨이트 모델(Llama, Mistral, Gemma 등)이 공개되면서 로컬 실행 수요가 생겼으나, 모델 양자화·GPU 메모리 관리 등 설정이 복잡했음
- Ollama는 이 복잡도를 추상화하여 누구나 쉽게 로컬 LLM을 쓸 수 있도록 2023년 출시됨

# 핵심 개념
- **백엔드**: `llama.cpp` 를 래핑 — CPU/GPU 모두에서 최적화된 추론 엔진
- **파일 포맷**: GGUF (Georgi Gerganov Unified Format) — 가중치, 토크나이저, 하이퍼파라미터를 하나의 바이너리에 담은 로컬 LLM 표준 포맷
- **REST API**: `http://localhost:11434/v1` 로 OpenAI 호환 API를 제공 → 기존 OpenAI SDK 코드를 그대로 로컬 모델에 연결 가능
- **프라이버시**: 모든 데이터가 로컬에만 머무름 — 의료·법무·기업 환경에서 유리
- **비용**: 토큰당 과금 없음, 하드웨어와 전기료가 전부

# 예시 / 사용법

```bash
# 모델 실행 (없으면 자동 다운로드)
ollama run llama3.1

# 백그라운드 서버 실행
ollama serve

# 설치된 모델 목록
ollama list

# OpenAI SDK로 로컬 연결
# base_url="http://localhost:11434/v1", api_key="ollama"
```

# 참고
- [Ollama 사용법: 로컬 LLM 완전 초보 가이드 (apidog)](https://apidog.com/kr/blog/how-to-use-ollama-kr/)
- [The Complete Guide to Ollama (DEV Community)](https://dev.to/ajitkumar/the-complete-guide-to-ollama-run-large-language-models-locally-2mge)
- [Local LLM Guide: Ollama 2026 (claude5.com)](https://claude5.com/news/local-llm-guide-ollama-lm-studio-llama-cpp-in-2026)
