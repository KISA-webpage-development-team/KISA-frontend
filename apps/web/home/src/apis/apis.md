# apis

모든 **백엔드와의 "직접적인" 통신**에 대한 코드들을 관리한다. 이 폴더 외에 다른 곳에서 API 호출을 해선 안된다.

## Background Knowledge

- **Entity**: 비즈니스 로직을 구성하는 데이터의 단위다. 쉽게 생각하면, 앱에서 사용되는 대표적인 클래스들이다. (예: User, Post, Comment 등)
- **Axios**: HTTP 클라이언트 라이브러리이다. 백엔드와 통신할 수 있는 손쉬운 함수들과 기능들을 제공한다. [참고 링크](https://velog.io/@ahnboks/Ajax-Axios-%EA%B7%B8%EB%A6%AC%EA%B3%A0-fetch%EC%9D%98-%EC%82%AC%EC%9A%A9%EB%B2%95-%EB%B0%8F-%EC%B0%A8%EC%9D%B4%EC%A0%90)
- **SWR**: 데이터 Fetching (가져오기)를 쉽게 해주는 라이브러리이다. Axios만으로도 데이터 Fetching은 가능하지만, SWR을 이용하면 데이터 캐싱, 데이터의 실시간 유지 등이 가능하다. **KISA-Web에선 SWR의 추가적인 기능들을 사용하지 않고 있다. axios와 다를게 없는 코드이다.** 확장성을 위해 추가해놓은 코드이니 크게 신경쓰지 않아도 좋다. [참고 링크](https://swr.vercel.app/)

## Subfolder Naming

폴더의 이름은 API Endpoint의 첫 번째 경로 요소(= Entity의 이름)와 일치해야 한다.

(예: /api/v1/users -> /src/apis/users)

## File Explanation

각 Entity 폴더마다 다음과 같은 최대 세 가지 파일들이 존재한다.

### 1. `queries.ts`

해당 Entity에 대한 GET API 호출 함수들을 정의한다. 이때 axios를 이용한다.

### 2. `swrHooks.ts`

해당 Entity에 대한 GET API 호출 함수들을 정의한다. 이때 SWR을 이용한다. 일반적인 async function이 아닌 use어쩌고라는 React Custom Hook으로 정의되어있다. 사용 방법은 self-explanatory하다.

### 3. `mutations.ts`

해당 Entity에 대한 POST, PUT, DELETE API 호출 함수들을 정의한다. 이때 axios를 이용한다.
