---
title: "260604 TIL: git worktree"
date: "2026-06-04T12:00:00.000+09:00"
description: "1 day 1 lesson"
category: "TIL"
---

# 개요
- 하나의 Git 저장소에서 여러 작업 디렉토리를 **동시에** 체크아웃할 수 있게 해주는 기능
- Git 2.5(2015)부터 내장 지원, 플러그인 불필요

# 배경 / 등장 배경
- 기존에는 브랜치를 전환하려면 현재 작업을 stash하거나 임시 커밋을 해야 했음
- 긴급 핫픽스나 코드 리뷰 중 작업 컨텍스트를 잃는 문제를 해결하기 위해 등장
- 브랜치 전환 없이 여러 브랜치를 서로 다른 디렉토리에서 동시에 열어둘 수 있음

# 핵심 개념
- 각 worktree는 고유한 작업 디렉토리와 index(staging area)를 가짐
- 단, `.git` 오브젝트 DB, reflog, 설정은 메인 저장소와 **공유**
- 같은 브랜치를 두 worktree에서 동시에 체크아웃하는 것은 불가

# 예시 / 사용법

```bash
# 새 worktree 생성 (브랜치 자동 생성)
git worktree add ../hotfix hotfix/urgent-bug

# 현재 worktree 목록 확인
git worktree list

# worktree 제거 (브랜치는 유지됨)
git worktree remove ../hotfix

# 정리 (삭제된 디렉토리 참조 제거)
git worktree prune
```

**주요 커맨드 7가지:** `add`, `list`, `lock`, `move`, `remove`, `prune`, `repair`

# 참고
- [Git 공식 문서 - git-worktree](https://git-scm.com/docs/git-worktree)
- [git worktree 사용법 - Dale Seo](https://daleseo.com/git-worktree/)
- [Git Worktree 완벽 가이드](https://jonny-cho.github.io/git/2025-07-02-git-worktree-complete-guide/)
