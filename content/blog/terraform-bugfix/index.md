---
title: "[Terraform] terraform plan timeout/system kill"
date: "2025-07-10T12:00:00.000+09:00"
description: "Mac OS에서 terraform plan 실행 시 timeout 또는 system kill 에러가 뜨는 문제 해결"
category: "Bugfix"
---
# 문제 
- `terraform plan` 실행 시 hashicorp/aws를 처리하는 과정에서 timeout 에러 또는 system kill 에러 발생

# 시도 #1
- terraform 삭제 후 재설치
    
    - 이 과정에서 xcode 업데이트가 필요하다고 해서 진행
        
- 배포를 위해 사용 중이던 main.tf 파일에서 아래 부분 중 backend를 주석 처리하고 `terraform plan` 실행하면 동작
    
    - 해당 버킷을 AWS 콘솔에서 수동으로 만들어준 상태긴 했는데 제대로 접근할 수 없었던 것으로 추정
            
        ```json
        terraform {
            # backend "s3" {
            #   bucket = "bucket-name" 
            #   key    = "key-name" # 버킷 내에서 상태 파일이 저장될 경로와 이름
            #   region = "ap-northeast-2" # S3 버킷이 위치한 AWS 리전
            # }
        
            required_providers {
                aws = {
                    source = "hashicorp/aws"
                }
                docker = {
                    source = "kreuzwerker/docker"
                }
            }
        ```

- 위 과정 진행 후 해결됐다고 생각했는데 특정 명령어 실행할 경우 멈추는 상황 똑같이 발생

# 시도 #2
- `export TF_LOG=INFO` → `export TF_LOG=DEBUG`로 변경 후 로그 확인
    ```bash
    assertion failed [arm_interval().contains(address)]: code fragment does not contain the given arm address
    ```
    
    - `uname -m`으로 운영체제 확인 → arm64
    
    - `terraform version`을 입력했을 때 Terraform v~ in **~_arm64**로 떠야 함
        
        - 내 상황: terraform  version 입력했을 때 **~_amd64** 확인
        
# 원인
- 계속 운영체제에 안 맞는 terraform을 다운받고 있었음

- M-시리즈에서 Intel용 프로그램 실행하려고 rossetta 2를 올리고, 이 위에서 Intel용 terraform이 다시 intel용 aws 플러그인을 올리는 상황
    
    - 여기서 메모리 문제 생겨서 system killed
        
# 해결
- `which brew`로 os에 맞는 brew가 설치됐는지 확인
            
    - M 시리즈: /opt/homebrew/bin/brew
    
    - Intel: /usr/local/bin/brew
    
- homebrew 경로부터 잘못됐다면 아래 명령어를 통해 os에 맞는 homebrew 재설치
    
    ```bash
    # 비밀번호 묻는 창이 나오면 mac 로그인 비밀번호 입력
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```
    
    - 제대로 실행됐다면 Next steps: 하고 명령어 알려주는데 그 순서대로 입력
    
- 작업하는 터미널로 들어와서 `brew install terraform`

- 위 단계까지 진행하고 `terraform apply` 진행했을 때 **Error acquiring the state lock resource temporarily unavailable** 문구 출력됨

- `ps aux | grep terraform` 으로 ‘terraform’이 들어간 프로세스의 상세 목록만 출력
    
    - 뭐가 많이 뜨면 **amd 기반** terraform-provider-aws 프로세스가 cpu를 많이 차지하고 있다는 의미
    
    - `pkill -9 -f terraform`으로 프로세스 다 내리기

        - `pkill -f terraform` 명령어도 해봤는데 이건 효과 없었음

# 참고
## aux
- `ps` 명령어에 사용하는 옵션으로 어떤 정보를 어떻게 보여줄지 결정

    - `a`: 시스템을 포함한 모든 사용자의 프로세스를 보여주는 옵션
    
    - `u`: 특정 사용자(지정하지 않을 경우 현재 사용자)의 프로세스 정보를 출력하는 옵션

    - `x`: 시스템 백그라운드에서 돌아가는 데몬, 비정상적으로 종료된 좀비 프로세스 등 터미널에 연결되지 않은 프로세스까지 보여주는 옵션