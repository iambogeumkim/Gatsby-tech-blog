---
title: "250904 TIL: SSH"
date: "2025-09-04T12:00:00.000+09:00"
description: "1 day 1 lesson"
category: "TIL"
---
# SSH
```
client_loop: send disconnect: Broken pipe
```

## Problem
- Flask 서버를 EC2로 배포하고 나서 주기적으로 발생

- SSH 접속 시 일정 시간 동안 아무런 입력이 없을 경우 소켓을 닫기 때문에 연결이 자동으로 끊기게 됨

## How to fix
- SSH 접속 후 `vi ~/.ssh/config`로 config 파일 열고 아래 내용 추가
```
Host * 
ServerAliveInterval 120
TCPKeepAlive no
```

나는 기존에 작성해둔 정보들이 있어서 ServerAliveInterval, TCPKeepAlive만 추가했고 내일 출근해서 제대로 동작되는지 확인해봐야겠다.

**🤔 확인 결과**

일단 터미널에서는 SSH 연결이 끊기지 않는 것 같은데 이번엔 `ERR_CONNECTION_REFUSED`가 뜨면서 접속이 되지 않는다.