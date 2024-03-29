# life in dot.

![image](https://user-images.githubusercontent.com/59520911/180470953-f4ac03e7-adf8-4bf2-8764-5cd752435e7e.png)

[Life In Dot. - Visualized Life Journal | Create Your 100-year Life Profile](https://www.lifeindot.life/)

<br/>

## 🌏 About life in dot.

라이프 인 닷. 은 100 년의 기록을 점 하나에 넣어두고, 연도별과 날짜별로 쉽게 둘러볼 수 있도록 도와주는 웹 서비스입니다. 또한 줌인과 줌아웃으로 작동하는 UI 를 통해 유저가 삶에 관해 다른 관점을 떠올려볼 수 있도록 표현하고자 했습니다.

칼 세이건이 보이저 1호가 우주에서 찍은 지구의 사진을 보고 저술한 책, _The Pale Blue Dot_ 에서 얘기한 것처럼 저 멀리 우주에서 보면 하나의 푸른 점으로 보이는 지구는 특별해 보이지 않지만, 가까이서 보면 다릅니다. 마찬가지로, 멀리서 보면 특별할 것 없이 점 하나처럼 느껴질 수 있는 삶도 가까이 다가가면 다르게 느껴질 수 있습니다.

비슷하게 라이프 인 닷. 에서 처음 보이는 하나의 점 중앙으로 줌인해서 가까이 다가가면 100년의 삶이 100개의 연도별 점으로 펼쳐집니다. 그리고 각 연도별 점의 중앙으로 한 번 더 줌인해서 들어가면 그 연도에 해당하는 각각 하루의 기록을 가진 날짜별 점들이 펼쳐져 지난날의 기록을 쉽게 둘러볼 수 있습니다.

짧게 느껴질 수도, 길게 느껴질 수도 있는 100년의 삶을 가까이서 멀리서 들여다보세요.

<br/>

## ☕️ Why this project

지난날들을 더 효율적으로 둘러볼 수 있고, 기록이 갖는 본질적인 장점을 표현할 수 있는 서비스를 만들어보고자 시작하게 되었습니다.

무언가 기록하는 것은 기억에 도움을 줄 수 있지만, 기록의 또 다른 본질은 지난 날을 돌아보며 어떤 패턴을 발견할 수 있고, 그로부터 도움을 얻어 현재의 순간에 더 집중할 수 있는 보탬이 되는 데 있다고 생각합니다. 한편, 기록의 방법은 여러가지가 있지만 때때로 단편적으로 나열된 기록들은 아예 다시 보지 않게 되는 등 효율적으로 돌아보기 쉽지 않다고 느껴졌습니다.

그렇게 지난 기록을 돌아보는 행위를 개선하려면 어떤 다른 형태를 가질 수 있을까 생각해보았고, 지난날들을 효율적으로 둘러볼 수 있는 동시에 기록이 갖는 본질적인 장점에 비추어 삶에 관한 다른 관점과 생각을 떠올리게 할 수 있는 서비스를 만들어보고자 마음먹게 되었습니다.

<br/>

## 🌤 Project Schedule

- 3 Weeks ([2022.07.02 – 2022.07.17](https://www.notion.so/299d37e67acb4643b07abadc8c3a8135))
  - Week 1
    - 아이디어 수집과 기획
    - 기술 스택 검증과 정리
    - Figma Mockup 과 작업 플래닝
  - Week 2 – 3
    - 필요한 프런트 UI 와 초기 데이터 생성 로직 구현 (전역상태와 D3.js 활용)
    - 데이터 생성 및 UI 에 데이터 주입 작업 (D3.js 로 표시)
    - 마무리 작업 (리팩토링, 버그 수정, 배포)

<br/>

## 🌲 How it works

- **메인페이지**

  - 로그인 시 생일을 입력하는 form 이 줌 휠로 작동합니다.
  - 생일에 따라 100년에 해당하는 연도별 점들을 만들어 전역 상태로 저장합니다.
  - 로그인 후 처음 시작 점이 나타나는데, 점의 중앙으로 줌인 시 연도별 점들로 접근할 수 있습니다.
    ![Into-year-dots](https://user-images.githubusercontent.com/59520911/181498351-98f49b4e-d330-4fc6-8bfc-bfa84029ba46.gif)

<br/>

- **연도별 점**

  - 100년의 삶을 나타내는 100개의 연도별 점들이 펼쳐집니다.
  - 연도별 점에 마우스 오버 시 해당 연도와 그 해 유저의 나이를 표시합니다.
  - 연도별 점으로 줌인 시 해당 연도의 날짜별 점이 펼쳐지는 페이지로 들어갈 수 있습니다.
    ![Into-day-dots 1](https://user-images.githubusercontent.com/59520911/181513048-70510b44-c6cd-4342-b61e-62ee6ed92d2d.gif)
  - 날짜별 점에서 줌아웃 시 해당 연도별 점의 이전 위치로 돌아갑니다. (날짜별 점으로 들어오기 전 위치와 확대 값 기억)
    ![Into-day-dots 2](https://user-images.githubusercontent.com/59520911/181513225-45424860-617c-4c10-9025-3e8615e1745d.gif)
  - 줌인이나 줌아웃을 연도별 점이 없는 허공으로 계속하게 되면 초기 좌표와 확대 값으로 돌아옵니다.

<br/>

- **날짜별 점**

  - 해당 연도 각각 하루의 기록을 가진 일 년 치 날짜별 점들이 펼쳐집니다.
  - 날짜별 점을 클릭하면 나타나는 사이드바에 텍스트를 입력하면 저널을 자동 저장할 수 있습니다.
    ![Click-day-dots](https://user-images.githubusercontent.com/59520911/181523027-b3a5d8e6-0448-49d0-9e71-3bf4d0c82782.gif)
  - 사이드바의 플레이스홀더를 클릭하면 유튜브 링크를 해당 저널에 저장할 수 있습니다. (추후 자동재생)
  - 날짜별 점들에 그 날짜에 해당하는 유저의 데이터가 주입되고 데이터의 텍스트 길이에 따라 해당 점의 크기가 달라집니다.
    ![Dot-resize](https://user-images.githubusercontent.com/59520911/181523267-58920806-4772-4a85-a911-43dc82150ecd.gif)

<br/>

## 🌱 How to start

### Frontend

1. 프로젝트를 다운 받은 후 프로젝트 디렉토리 내부에서 아래와 같이 명령어 입력

   ```bash
   npm install
   npm start
   ```

2. 환경설정 `.env` file 을 아래와 같이 입력해야 합니다.

   ```javascript
   REACT_APP_SERVER_URL=<YOUR_SERVER_URL>
   REACT_APP_GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>
   ```

### Backend

1. 프로젝트를 다운 받은 후 프로젝트 디렉토리 내부에서 아래와 같이 명령어 입력

   ```bash
   npm install
   npm start
   ```

2. 환경설정 `.env` file 을 아래와 같이 입력해야 합니다.
   ```javascript
   MONGODB_URI=<YOUR_MONGODB_DATABASE_URL>
   JWT_SECRET=<YOUR_JWT_TOKEN_SECRET>
   ```

<br/>

## 🥾 Things that matter

- **D3.js 의 특성과 프로젝트의 구현 방향의 차이**

  - **Data → visualization**

    - D3.js 는 data-driven documents 로 어떤 데이터를 시각화하는 자바스크립트 라이브러리입니다. 데이터가 있으면 그 데이터의 정보를 활용해서 다양한 시각화를 해줄 수 있습니다.

  - **Visualization → data**
    - 반면, 제 프로젝트는 그와 반대로 데이터 없이 제한된 상황에서 우선 시각적으로 100년에 해당하는 날짜 점들로 비어있는 틀을 채우는 것처럼 D3.js 로 그려주고, 그 이후에 유저가 데이터를 생성하는 것에 따라 만들어졌던 날짜 점들에 데이터를 주입하는 방향이었습니다.
    - 이렇게 본질적인 방향이 다른 것이 작업 진행을 매끄럽지 못하게 했던 이유가 된 듯합니다. 예를 들면 줌인과 줌아웃으로 이루어지는 UI 흐름을 어떻게 구현할 수 있을지 정확하게 정해지지 않은 채 원하는 틀의 UI 뼈대를 그릴 수 있도록 데이터를 준비하는 로직을 먼저 구현해야 했습니다.
    - 그렇기 때문에, 이후에 유저가 생성하는 데이터를 이미 있는 틀에 주입하는 작업을 진행할 때 이미 만들어진 틀에 데이터를 맞추기 위해 유틸함수를 다시 수정하고 맞춰야 했습니다.

<br/>

- **상상했던 UI 와 최대한 비슷하게 구현하기 위한 고민**

  - 머릿속에 있던 UI 를 줌인과 줌아웃으로 어떻게 구현할 수 있을지 고민되었습니다. D3.js 와 SVG _(Scalable Vector Graphics)_ 를 활용하면 가능하다는 것은 알면서도 머릿속에 상상한 모습을 줌인과 줌아웃만으로 어떻게 표현할 수 있을지 참 많이 헤맨 듯합니다.
  - 예를 들면 연도별, 날짜별 데이터를 가진 점들이 미리 모두 그려져 있던지, 아니면 알맞은 타이밍에 계산되어 D3.js 로 그려져야 하는데 줌인과 줌아웃 간에 필요한 데이터는 어떻게 준비할 수 있을지, 또는 줌인 확대 값이 브라우저에서 어디까지 늘어날 수 있는지, 만약 줌인 확대 값이 늘어나는 데 한계가 있다면 어떤 방식으로 줌인 줌아웃 UI 와 비슷하지만 다른 방법으로 대체할 수 있을지 등 여러 고민이 되었습니다. 결국 미리 불필요한 데이터 연산을 줄이면서 줌인 UI 를 최대한 매끄럽게 보일 수 있도록 연도별 점에서 날짜별 점으로 넘어갈 때 보여줘야 할 데이터를 준비하면서 다른 페이지로 전환하는 방식으로 구현했습니다.

    <img width="600" alt="ui-image" src="https://user-images.githubusercontent.com/59520911/181607792-017a250e-07ac-49b0-8976-e9922b9792ee.png">

<br/>

- **순수함수 적용해보기**
  - 데이터 관련 로직에 필요한 유틸 함수를 순수함수로 작성해보고자 노력했습니다. 주안점으로 함수가 필요로 하는 모든 값은 외부에서 받는 요소 없이 모두 인자로 받는 것을 지키려고 했습니다. 조금이나마 함수의 재사용성을 높이고자 작업을 처음 해볼 때는 예상한 시간보다 더 오래 걸렸고, 주객이 전도되는 것은 아닌지 우려되었습니다. 하지만 정말 도움이 되는 것을 느낀 것은 오히려 작업 후반부였습니다. 예를 들면 프로젝트 마무리 작업을 할 때 예상치 못한 버그를 발견했는데, 유저가 태어난 해는 태어난 날의 위치부터 날짜별 점들이 위치되어야 하는데 일반 연도와 같이 디폴트 위치부터 점들이 표시되는 문제였습니다.
  - 작업 후반부라 처음 발견했을 때 당황했지만 점들의 위치를 잡는 데이터 로직을 담당하는 유틸 함수를 순수함수로 만들었기 때문에 다른 부분들은 전혀 건드릴 필요 없이 그 로직을 담당하는 함수만 수정해서 정말 생각보다 아주 수월하게 해결할 수 있었습니다. 더 잘 짜인 구조와 규모 있는 프로젝트에서는 작업이 진행될수록 재사용성이 높은 함수나 컴포넌트가 정말 더 큰 도움이 되겠다고 느낄 수 있었습니다.

<br/>

## 🪵 Stack

### Frontend

- ES6+
- React
- D3.js
- React Query (Sever state)
- Recoil (Client state)
- Styled-components
- Jest

### Backend

- Node.js
- Express
- MongoDB – Atlas
- Mongoose
- Mocha, Chai

<br/>

## 🍦 In the end

### Takeaway?

프로젝트를 하면서 크게 느낀 점은 문제해결의 가장 중요한 점으로 문제가 무엇인지 알고 정의를 내릴 수 있어야 그에 맞는 해결책을 찾거나 구상할 수 있다는 것과 문제가 무엇인지 정의할 수 있으려면 크게만 보이는 문제를 잘 쪼개서 작은 문제로 잘 나눠야 한다는 것입니다. 어찌 보면 평소에 많이 듣는 당연한 말이지만 처음에 참 막막하게 느껴지던 프로젝트를 진행하면서 다시금 그 말의 무게감이 어느 정도인지 다시 생각해보게 되었습니다.

돌이켜보면 프로젝트를 진행하면서 처음부터 끝까지 참 알차게 어려운 산 넘어 산 같다는 느낌을 많이 받았습니다. 머릿속에 생각하던 형태와 작동방식 자체를 어떻게 구현할 수 있을지 세세하게 그림이 그려지지 않아서 잘 짜인 기획을 하는 것부터 쉽지 않았고, 기술적으로 가능하다는 것은 알아도 내가 원하는 최종적인 UI 와 모습으로 어떻게 구현을 할 수 있을지, 유저의 플로우에 따라 데이터는 어떻게 준비되어야 하는지, 그리고 기술 구현까지 어떻게 이어질 수 있을지 시작이 참 어려웠습니다.

그런 와중에 이번 프로젝트를 하는 이유와 이로부터 배워야 할 점을 생각해보고 정의를 내리는 것이 마음을 다잡는 데 도움이 됐는데, 어떤 문제가 있고 그 문제해결을 시도해보면서 주어진 문제를 해결하는 태도와 방법을 배워갈 수 있다면 내가 원하는 만큼 프로젝트를 완벽하게 해낼 수 없어도 돌아봤을 때 유의미한 프로젝트가 될 수 있지 않을까 하고 마음을 다잡았습니다.

결과적으로 시간 소요는 많이 되는데 해결하지 못하는 문제를 붙들고 그만해야 하나, 이제 놓아줘야 하나 싶었던 기능이나 버그들도 배움을 얻자는 마음으로 끝까지 해결하려고 한 번 두 번 더 해보면서 해결했을 때는 뿌듯함을 느끼고 교훈을 얻을 수 있었습니다. 물론 부족함도 참 많이 느꼈지만 그래도 이제 처음부터 끝까지 한번 산을 올라가 봤으니 다음번 산에 올라갈 때는 그나마 이전의 경험을 바탕으로 좀 더 효율적으로 잘 올라가 볼 수 있지 않을까 생각하게 된 프로젝트가 되었습니다.

<br/>

## 🎄 개발자 소개

<a href="https://github.com/taewanseoul">
  <img src="https://user-images.githubusercontent.com/59520911/180472266-ad6b12ba-0028-4153-b918-93759d1d43c0.png" alt="임태완 프로필" width="200px" height="200px" />
</a>

- Taewan Lim 임태완
- taewan.seoul@gmail.com
