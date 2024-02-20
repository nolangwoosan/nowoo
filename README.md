<image 
src='https://vcsbnusyecxmogxxeoww.supabase.co/storage/v1/object/sign/images/nowoo_logo-removebg-preview.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbm93b29fbG9nby1yZW1vdmViZy1wcmV2aWV3LnBuZyIsImlhdCI6MTcwNjE2NzY4NiwiZXhwIjoxODYzODQ3Njg2fQ.sV0rkA8CL0sm_g6e72XtKozx21GL6TufQVVzCfOF9zA&t=2024-01-25T07%3A28%3A06.494Z'
width='240'
height='70'
/>

# NOWOO

메이플랜드 아이템 검색 사이트

## 요구 사항

- Node.js 18.17.0 이상

## 환경 설정

### 1. .env.local 파일 생성

```
NEXT_PUBLIC_SUPABASE_URL=https://<your_supabase_url>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
```

### 2. 스키마 기반 타입스크립트 파일 자동 생성 ([Generating TypeScript Types](https://supabase.com/docs/guides/api/rest/generating-types))

- app/\_types/supabase.ts 파일이 이미 존재할 경우, 생략해도 됩니다.

1. npx supabase login
2. npx supabase link (tarotbunny 선택 > DB 비밀번호 입력)
3. pnpm update-types

## 실행 방법

```sh
$ pnpm install
$ pnpm dev
```

```zsh
# Install Prisma
$ pnpm install prisma

# Initialize Prisma (will generate prisma folder and etc)
$ npx prisma init

# Migrate to DB
$ npx prisma db push

# Pull by DB
$ npx prisma db pull

# Help
$ npx prisma --help
```