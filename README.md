# Instagram Clone - React App

리액트로 만든 인스타그램 스타일 앱입니다.

## ✨ 주요 기능

### 🔐 인증 시스템 (Prisma DB 연동 완료!)
- **회원가입**: API로 DB에 저장 (bcrypt 암호화)
- **로그인**: JWT 토큰 인증
- **로그아웃**: 토큰 제거
- **세션 유지**: JWT 토큰 기반 인증

### 📱 소셜 기능 (API 연동 완료!)
- 게시물 피드 (DB에서 불러오기)
- 좋아요 기능 (실시간 DB 저장)
- 댓글 작성 (API로 저장)
- 팔로우/언팔로우
- 프로필 조회/수정

## 🚀 백엔드 API

백엔드 서버가 **http://localhost:5000**에서 실행 중이어야 합니다.

```bash
# 백엔드 실행
cd ../instagram-backend
npm run dev
```

## 🎯 테스트 방법

1. 백엔드 서버 실행 (포트 5000)
2. 프론트엔드 실행 (포트 3000)
3. 회원가입으로 새 계정 생성
4. DB에 실제로 저장됩니다!

## 📋 사전 준비

이 프로젝트를 실행하기 전에 다음 파일들이 필요합니다:

### 이미지 파일 구조
```
instagram-app/
  └── public/
      └── img/
          ├── img01.jpg
          ├── img02.jpg
          ├── img03.jpg
          ├── img04.jpg
          ├── img05.jpg
          ├── img06.jpg
          ├── img07.jpg
          ├── img08.jpg
          ├── img09.jpg
          ├── img10.jpg
          ├── man.png
          └── woman.png
```

**중요**: `public/img/` 폴더를 만들고 위의 이미지 파일들을 복사해주세요!

## 🚀 설치 및 실행

1. 의존성 설치:
```bash
npm install
```

2. 개발 서버 실행:
```bash
npm start
```

3. 브라우저에서 `http://localhost:3000` 자동 실행

## 📦 빌드

프로덕션 빌드:
```bash
npm run build
```

## ✨ 주요 기능

- 📸 스토리 섹션
- 📱 피드 (10개의 포스트)
- ❤️ 좋아요 기능
- 💬 댓글 기능
- 🔖 북마크
- 👥 추천 계정
- 📱 반응형 디자인

## 🛠️ 기술 스택

- React 18
- Webpack 5
- Babel
- CSS3
- Font Awesome

