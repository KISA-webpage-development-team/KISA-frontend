# lib

앱에서 사용되는 3rd Party Library에 대한 코드를 관리한다.

반드시 **외부 라이브러리와 직접적으로 관련된 코드는 이곳에서만 관리한다.** 다른 라이브러리를 쓰고 싶을 때 쉽게 교체할 수 있도록 하기 위함이다.

## Background Knowledge

- **axios**: HTTP 통신을 위한 라이브러리
- **jsonwebtoken**: JWT 토큰을 생성하고 검증하는 라이브러리, 사용자 인증에 사용
- **next-auth**: 사용자 인증을 위한 라이브러리, Next.js에서 사용
- **react-cookie**: 브라우저 쿠키를 쉽게 다루기 위한 라이브러리
- **swr**: 데이터 Fetching을 위한 라이브러리, Next.js에서 사용

참고 링크들은 추후 추가될 예정이다.

## Subfolder Naming

### `[library-name]`

외부 라이브러리의 이름을 폴더 이름으로 사용한다.

## File Explanation

[libary-name] 폴더 아래의 파일들에 대한 네이밍 컨벤션은 따로 정해져 있지 않다. 파일의 역할에 따라 적절한 이름을 사용한다.

ex) next-auth 라이브러리 관련 type: "/src/lib/next-auth/types.ts"
