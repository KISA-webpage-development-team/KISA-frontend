# types

앱 전체에서 사용된 타입들을 정의한다.

## Background Knowledge

- **TypeScript**: [참고 링크](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html).

## File Explanation

### `[entity].ts`

각 Entity에 대한 타입들을 정의한다. 파일을 보면 하나의 Entity에 여러 타입들이 정의되어있다. 이는 백엔드와의 소통과 관련되어 있다.

예를 들어, user를 생성할때 email, name, major를 백엔드에 POST로 넘겨주면 된다고 하자.
하지만 user를 업데이트할때에는 major만 백엔드에 PUT으로 넘겨줘야 한다. (email과 name은 수정할 수 없다: 비즈니스 로직)
이때 POST용 user와 PUT용 user는 다른 타입으로 정의된다 (예: `CreateUserBody`, `UpdateUserBody`).

(예: `user.ts`, `post.ts`, `comment.ts`)

## Caution

`components.ts`라는 파일이 있는데, 이는 무시해도 좋다.

이 폴더에는 **3rd party library의 타입 정의**를 하지 않는다. (예: axios의 타입 정의는 `src/lib/axios/types.ts`에 정의한다.)
