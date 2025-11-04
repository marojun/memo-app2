# Vercel 배포 가이드

## 📋 배포 전 준비사항

### 1단계: Git 저장소 설정

현재 프로젝트는 Git 저장소가 초기화되어 있습니다. 다음 단계를 진행하세요:

```bash
# 1. 변경사항 스테이징
git add .

# 2. 커밋
git commit -m "메모 앱 초기 버전"

# 3. GitHub 저장소 생성 및 연결
# GitHub에서 새 저장소를 생성한 후:
git remote add origin https://github.com/사용자명/저장소명.git
git branch -M main
git push -u origin main
```

---

## 🚀 Vercel 배포 방법

### 방법 1: Vercel 웹 대시보드 사용 (추천)

#### 1. Vercel 계정 생성
- https://vercel.com 접속
- "Sign Up" 클릭
- GitHub, GitLab, Bitbucket 중 하나로 로그인 (GitHub 추천)

#### 2. 프로젝트 Import
1. Vercel 대시보드에서 "Add New..." → "Project" 클릭
2. GitHub 저장소 선택 (또는 GitLab/Bitbucket)
3. 프로젝트 저장소 선택

#### 3. 프로젝트 설정
Vercel이 자동으로 CRA 프로젝트를 감지하므로 다음 설정만 확인:

- **Framework Preset**: Create React App (자동 감지)
- **Root Directory**: `./` (기본값)
- **Build Command**: `npm run build` (기본값)
- **Output Directory**: `build` (기본값)
- **Install Command**: `npm install` (기본값)

#### 4. 환경 변수 설정 (필요시)
- 환경 변수가 있다면 "Environment Variables" 섹션에서 추가

#### 5. 배포
- "Deploy" 버튼 클릭
- 배포가 완료되면 자동으로 URL이 생성됩니다!
  - 예: `https://vibe06-xxxxx.vercel.app`

---

### 방법 2: Vercel CLI 사용

#### 1. Vercel CLI 설치
```bash
npm install -g vercel
```

#### 2. 로그인
```bash
vercel login
```

#### 3. 배포
```bash
# 프로젝트 디렉토리에서
vercel

# 프로덕션 배포
vercel --prod
```

---

## ⚙️ 추가 설정 (선택사항)

### vercel.json 설정 파일 생성

SPA 라우팅을 위한 설정이 필요할 수 있습니다. 필요시 다음 파일을 생성하세요:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 🔄 자동 배포 설정

GitHub와 연동하면:
- ✅ **자동 배포**: `main` 브랜치에 push할 때마다 자동 배포
- ✅ **프리뷰 배포**: Pull Request 생성 시 프리뷰 URL 생성
- ✅ **프로덕션 배포**: `main` 브랜치에 머지 시 자동 배포

---

## 📝 주의사항

1. **localStorage**: Vercel 배포 후에도 localStorage는 정상 작동합니다
2. **환경 변수**: 민감한 정보는 환경 변수로 관리하세요
3. **도메인**: 커스텀 도메인을 연결할 수 있습니다
4. **빌드 시간**: 첫 배포는 약 1-2분 소요됩니다

---

## 🎉 배포 완료 후

배포가 완료되면:
- 자동으로 생성된 URL로 접속하여 앱 확인
- Vercel 대시보드에서 배포 로그 확인
- 커스텀 도메인 연결 (선택사항)

---

## 문제 해결

### 빌드 오류가 발생하는 경우
1. `package.json`의 `build` 스크립트 확인
2. 로컬에서 `npm run build` 실행하여 테스트
3. Vercel 로그에서 오류 메시지 확인

### 404 오류가 발생하는 경우
- `vercel.json` 파일을 추가하여 SPA 라우팅 설정

---

## 📚 참고 자료

- Vercel 공식 문서: https://vercel.com/docs
- Create React App 배포: https://create-react-app.dev/docs/deployment/#vercel

