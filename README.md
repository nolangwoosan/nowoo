# Mapleland

메이플랜드를 위한.

## 요구 사항

- Node.js 18.17.0 이상

## 환경 설정

### .env.local 파일 생성

```
NEXT_PUBLIC_SUPABASE_URL=https://<your_supabase_url>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
```

### 스키마 기반 타입스크립트 파일 자동 생성 ([Generating TypeScript Types](https://supabase.com/docs/guides/api/rest/generating-types))

1. npx supabase login
2. npx supabase link (tarotbunny 선택 > DB 비밀번호 입력)
3. npx supabase gen types typescript --linked --schema maple_land > app/\_types/database.types.ts

## 실행 방법

```sh
pnpm install
pnpm dev
```
