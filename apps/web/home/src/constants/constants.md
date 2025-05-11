# constants

앱 전체에서 사용될 수 있는 Constants를 정의한다. ex) KISA Email, Backend URL

## Background Knowledge

- `.env`: 환경 변수를 설정하는 파일이다. 환경 변수는 앱의 환경에 따라 달라지는 값들을 설정할 수 있게 해준다. (예: 개발 환경, 배포 환경 등)

## File Explanation

### 1. `env.ts`

`.env` 파일에 정의된 환경 변수들을 가져와서 사용할 수 있게 해주는 파일이다. 이 파일 이외의 다른 파일들에서는 **절대 환경 변수를 직접 `process.env`로 사용해서는 안된다.**

### 2. `[constant-related-term].ts`

앱 전체에서 사용될 수 있는 상수들을 정의한다. 이 파일은 `env.ts` 파일과 다르게, **환경 변수가 아닌 일반적인 상수들을 정의한다.**

ex) `email.ts`: KISA Email 주소를 상수로 정의한다.

## Caution

이 폴더에는 **3rd Party Library (/src/lib 폴더)** 에 종속되는 변수를 **절대** 관리해선 안된다.

예를 들어서 `.env` 파일에 `NEXTAUTH_SECRET`은 3rd Party Library인 NextAuth.js에 종속되는 상수이므로, `constants/env.ts` 파일에 정의해서는 안된다. 대신, `/src/lib/next-auth/env.ts` 파일에 정의해야 한다.
