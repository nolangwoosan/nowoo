<image
src='https://vcsbnusyecxmogxxeoww.supabase.co/storage/v1/object/sign/images/nowoo_logo-removebg-preview.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbm93b29fbG9nby1yZW1vdmViZy1wcmV2aWV3LnBuZyIsImlhdCI6MTcwNjE2NzY4NiwiZXhwIjoxODYzODQ3Njg2fQ.sV0rkA8CL0sm_g6e72XtKozx21GL6TufQVVzCfOF9zA&t=2024-01-25T07%3A28%3A06.494Z'
width='240'
height='70'
/>

# NOWOO

**메이플랜드 아이템 검색 사이트**

<br />

| kind        |                       |                          |                     |
| ----------- | --------------------- | ------------------------ | ------------------- |
| **app**     | Next.js (framework)   | Tailwind CSS (css)       | NextAuth.js (auth)  |
|             | Prisma (orm)          | React Hook Form (form)   | Valibot (validator) |
| **tools**   | TypeScript (language) | Biome (linter, fmt)      | Prettier (linter)   |
|             | ESLint (linter)       | lint-staged (pre-commit) |                     |
| **testing** | Vitest (test runner)  | Playwright (e2e testing) |                     |
| **others**  | workflows (ci)        | .vscode (editor)         |                     |

<br />

## 요구 사항

- Node.js 18.17.0 이상

## 환경 설정

### 1. .env.local 파일 생성

```
DATABASE_URL=DATABASE_URL=mysql://mysql:mysql@localhost:5432/mysql
```

## 실행 방법

```sh
$ pnpm install
$ pnpm dev
# for development
$ pnpm start:dev
# for production
$ pnpm start:prod
```
