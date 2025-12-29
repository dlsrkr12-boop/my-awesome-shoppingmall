# 📦 인스타그램 앱 배포 가이드

## 🚀 빠른 배포 방법

### 1️⃣ Vercel (가장 추천!)

#### 방법 A: 웹사이트 사용 (가장 쉬움)
1. [vercel.com](https://vercel.com) 방문
2. GitHub으로 로그인
3. "New Project" 클릭
4. GitHub 저장소 선택
5. 자동 배포 완료! 🎉

#### 방법 B: CLI 사용
```bash
# Vercel CLI 설치
npm install -g vercel

# 프로젝트 폴더로 이동
cd d:\cursorstudy\instagram-app

# 로그인
vercel login

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

**결과:** `https://your-project.vercel.app`

---

### 2️⃣ Netlify

#### 방법 A: 웹사이트 사용
1. [netlify.com](https://www.netlify.com) 방문
2. "Add new site" → "Import an existing project"
3. GitHub 저장소 연결
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy!

#### 방법 B: CLI 사용
```bash
# Netlify CLI 설치
npm install -g netlify-cli

# 로그인
netlify login

# 빌드
npm run build

# 배포
netlify deploy --prod --dir=dist
```

---

### 3️⃣ GitHub Pages

#### 단계:
```bash
# 1. gh-pages 패키지 설치 (이미 package.json에 추가됨)
npm install

# 2. GitHub에 코드 푸시
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/instagram-app.git
git push -u origin main

# 3. 배포
npm run deploy
```

**결과:** `https://username.github.io/instagram-app`

**주의:** `package.json`에 homepage 필드 추가 필요:
```json
"homepage": "https://username.github.io/instagram-app"
```

---

## 🛠️ 로컬 빌드 테스트

배포 전에 로컬에서 빌드를 테스트하세요:

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과물 확인
# dist/ 폴더가 생성됩니다
```

빌드된 파일을 로컬에서 확인하려면:
```bash
# serve 패키지 설치
npm install -g serve

# 빌드 결과물 서빙
serve -s dist
```

그리고 `http://localhost:3000` 방문

---

## 📋 배포 전 체크리스트

- [ ] 모든 이미지 경로가 상대 경로인지 확인
- [ ] API 키가 환경 변수로 설정되어 있는지 확인
- [ ] 빌드 에러가 없는지 확인 (`npm run build`)
- [ ] `.gitignore`에 `node_modules/`, `dist/` 추가
- [ ] README.md 작성

---

## 🌐 도메인 연결 (선택사항)

### Vercel
1. Vercel 대시보드 → Settings → Domains
2. 커스텀 도메인 추가
3. DNS 설정 업데이트

### Netlify
1. Site settings → Domain management
2. Add custom domain
3. DNS 설정 업데이트

---

## 🔧 환경 변수 설정

배포 플랫폼에서 환경 변수를 설정하세요:

**Vercel:**
- Settings → Environment Variables

**Netlify:**
- Site settings → Build & deploy → Environment

---

## 📊 배포 후 확인사항

- [ ] 모든 페이지가 정상 작동하는지 확인
- [ ] 이미지가 모두 로드되는지 확인
- [ ] 모바일에서 정상 작동하는지 확인
- [ ] HTTPS가 적용되었는지 확인

---

## 💡 추천 배포 플랫폼 비교

| 플랫폼 | 난이도 | 속도 | 무료 플랜 | 추천도 |
|--------|--------|------|-----------|---------|
| Vercel | ⭐ | ⚡⚡⚡ | 충분함 | ⭐⭐⭐⭐⭐ |
| Netlify | ⭐ | ⚡⚡⚡ | 충분함 | ⭐⭐⭐⭐⭐ |
| GitHub Pages | ⭐⭐ | ⚡⚡ | 무제한 | ⭐⭐⭐⭐ |

**초보자에게는 Vercel을 강력 추천합니다!** 🚀

