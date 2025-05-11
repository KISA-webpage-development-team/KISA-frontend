// infoPageData: /info/detail page들에 들어가는 각종 data들이 JSON 형태로 저장됩니다.

// ** JSON structure **
// id: 이미지 id 및 div 태그 id
// title: 디테일 섹션의 제목
// desc: html 태그 형식의 디테일 섹션 설명

// [CAMPUS] ----------------------------------------------
const campusCentralData = [
  {
    id: "michigan_union",
    title: "Michigan Union",
    desc: (
      <p>
        (1) 학교 공식 행사 및 동아리 활동들을 진행하는 장소이며 Career Fair 가
        자주 열립니다. 공부할 공간도 많아 학생들이 자주 찾습니다. 혼자서 조용히
        공부하는 것보다 조별 미팅을 많이 합니다.
        <br />
        <br />
        (2) 지하: Panda Express 및 Subway 등 식당가 및 편의 시설들이 위치하고
        있습니다.
        <br />
        <br />
        (3) 1층: 조용히 공부할 수 있는 Quiet Room이 있으며 Sweet Waters 카페와
        라운지가 있습니다. 카페 앞에 있는 벽에서는 종종 학교 스포츠 경기를
        생중계합니다.
        <br />
        <br />
        (4) 4층: 센트럴 캠퍼스 내 유일무이한 안마기 4대가 Student Wellness
        Center에 있습니다.
      </p>
    ),
  },
  {
    id: "michigan_league",
    title: "Michigan League",
    desc: (
      <p>
        (1) 공적인 문서 처리를 할 때 많이 방문합니다.
        <br />
        <br />
        (2) 동아리나 클럽 소개하는 자리인 Student Festival 할 때 Michigan League
        ballroom에서 진행됩니다.
        <br />
        <br />
        (3) 미시간 리그 3층에는 미시간 인이 위치하고 있습니다. 주변의
        숙박시설보다 가격이 조금 나갑니다.
      </p>
    ),
  },
  {
    id: "shapiro_library",
    title: "Shapiro Library (UgLi)",
    desc: (
      <p>
        (1) 지하 1층~지상 4층으로 구성된 도서관입니다. 위에 서술한 것과 같이
        샤피로 또는 어글리로 불리며 한국 학생들이 가장 많이 가는 도서관입니다.
        <br />
        <br />
        (2) 지하 1층: 공대 학생들이 주로 사용하는 CAEN 컴퓨터가 있으며 Computer
        Science 전공 오피스 아워가 다분하게 열리는 곳입니다. 지상층보다 실내
        온도가 낮아 방문 시 겉옷이 필요할 수 있습니다. <br />
        <br />
        (3) 지상 1층: Circulation Desk 및 음식과 음료를 구매할 수 있는 카페가
        있습니다. Desk 뒤쪽 룸에는 트레이닝 후 녹음을 할 수 있는 Winberg Room 이
        있으며 도서관 웹사이트를 통해 녹음실을 예약할 수 있습니다. Design
        Lab에서는 일부 과목의 Discussion이나 오피스 아워가 열립니다. <br />
        <br />
        (4) 지상 2층: 여러 스터디룸 등이 있으며 웹사이트에서 각 방을 예약할 수
        있습니다. 모든 방 예약은 1주일 전에 오픈되며, 인당 하루에 4시간까지 예약
        가능합니다. 소설 책들도 찾을 수 있습니다. <br />
        <br />
        (5) 지상 3층: 가장 최근에 리모델링을 하여 인테리어가 잘 되어있고 다양한
        종류의 책상 및 공부 환경들이 조성되어 있어서 항상 사람들로 북적입니다.
        공부하기 좋지만 자리 잡기 어렵고 자주 소란스럽습니다. <br />
        <br />
        (6) 지상 4층: 과학 책들이 많이 있고 조용하게 공부하기 좋은 층입니다. *
        책을 미리 예약하여 픽업하고 싶다면 umich library 웹사이트에서 원하는
        책을 검색한 후에 “Get This” 를 클릭하여 로그인하고 픽업 장소를 정하면
        해당 도서관 Circulation Desk 에서 원하는 책을 3일 내에 받아볼 수
        있습니다. 책이 픽업 장소에 도착하면 학교 이메일로 메일이 발송됩니다.
        해당 기능은 Umich 모든 도서관에서 사용할 수 있습니다.
      </p>
    ),
  },
  {
    id: "hatcher_library",
    title: "Hatcher Library (Graduate Library)",
    desc: (
      <p>
        (1) 이름에서 알 수 있듯이 대학원생들을 위한 도서관입니다. 하지만
        학부생들이 출입해도 무관합니다.
        <br />
        <br />
        (2) 다양한 공부 환경이 조성되어 있고 조용한 공부 환경을 원하시는
        분들에게는 Shapiro 보다 좋은 선택일 수 있습니다.
        <br />
        <br />
        (3) Hatcher South 와 Hatcher North 로 나누어져 있으며 건물은 이어져
        있으면서도 층 이름이 달라서 구조가 헷갈릴 수 있습니다. 책을 찾거나
        원하는 스터디 룸을 찾으실 때는 Circulation Desk 에 방문하신 후
        문의하시면 됩니다.
        <br />
        <br />
        (4) 지상 2층: 조용하고 천장 높은 스터디 룸이 있습니다. 북스캐너 도
        있기에 필요할 때 용이하게 사용할 수 있습니다. Hatcher Library 2층과
        Shapiro Library 3층은 Connector 을 통해 연결되어 있어 추운 날씨에
        이동하기 편하며 자리가 없을 때에도 편리하게 이동 가능합니다.
        <br />
        <br />
        (5) 지상 3층~6층: 한국 독서실과 비슷한 개인 스터디룸이 있으며 개인
        스터디룸 사용 시 사전에 예약하여 Circulation Desk 에서 열쇠를 받고
        사용할 수 있습니다.
      </p>
    ),
  },
  {
    id: "mason_angell_hall",
    title: "Mason Hall (MH) /\nAngell Hall (AH)",
    desc: (
      <p>
        (1) 캠퍼스 내에서 단연코 가장 다양한 전공의 강의들이 진행되는
        빌딩입니다. Angell Hall Auditorium에서는 강의 및 시험들이 자주 열리고
        Mason Hall 에서는 20 - 30명 규모의 학생들이 수강하는 과목의 강의들이
        진행됩니다.
        <br />
        <br />
        (2) Mason Hall 1층에는 엄청난 규모의 컴퓨터 랩인 Fishbowl 이 있으며
        컴퓨터 및 다양한 용도의 프린터들이 있습니다.
      </p>
    ),
  },
  {
    id: "ross_school_of_business",
    title: "Ross School of Business",
    desc: (
      <p>
        (1) 학교에서 가장 좋고 새로운 시설을 갖춘 빌딩인 경영학과 빌딩입니다.
        대부분의 경영학 수업들이 여기서 진행되고 교수와 학생들 간의 소통을
        중요시하기 때문에 강의실의 형태가 보통의 강의실과는 다릅니다. 교실 화면
        스크린도 매우 크기 때문에 슬라이드를 보기에 매우 편합니다.
        <br />
        <br />
        (2) 경영대이기 때문에 경영 동아리 학생들이 종종 정장을 입고 돌아다니는
        모습을 볼 수 있는데 Ross에서만 진행하는 Career Fair가 별도로 있습니다.
        만약, 컨설팅이나 IB 등 유명한 대기업들에 관심이 있으시다면 가보는 것을
        추천합니다. (웹사이트에 일정은 별도로 안내됩니다.)
        <br />
        <br />
        (3) 스터디룸 예약은 Ross 학생들만 할 수 있습니다.
        <br />
        <br />
        (4) 학교 캠퍼스 건물 중 유일하게 스타벅스가 있습니다.
      </p>
    ),
  },
  {
    id: "kinesiology_building",
    title: "School of Kinesiology Building\n(SKB)",
    desc: (
      <p>
        다소 중후한 겉모습과는 달리 내부는 현대적으로 디자인되어 있습니다.
        중앙이 뚫려 있고 모든 층에서 Atrium을 볼 수 있게 하여 개방감이 있는
        곳에서 공부를 하고 싶으시다면 한 번쯤은 가보셔도 좋습니다. 더불어 공부할
        곳도 많습니다.
      </p>
    ),
  },
  {
    id: "cctc",
    title: "Central Campus Transit Center\n(CCTC)",
    desc: (
      <p>
        (1) 캠퍼스를 가로지르는 다수의 지역 버스와 학교 버스가 정차하며 캠퍼스
        내의 가장 큰 버스 정류장입니다.
        <br />
        <br />
        (2) Northwood 및 Bursley Baits 버스 모두 North Campus 로 향해가지만
        Bursley Baits 는 Chemistry Building 앞쪽에 있는 정거장에서 탑승해야 하며
        Northwood 는 Bursley Baits 의 맞은편 정류장에서 탑승해야 합니다. 각 버스
        모두 North Campus 의 Pierpoint 까지 약 10~15분 정도 소요됩니다.
        <br />
        <br />
        (3) M bus 라는 애플리케이션을 다운 받으면 모든 버스의 동선, 루트, 및
        실시간 위치와 시간까지 확인 가능합니다.
      </p>
    ),
  },
  {
    id: "chemistry_building",
    title: "Chemistry Building\n(CHEM)",
    desc: (
      <p>
        (1) CCTC 바로 옆에 위치한 화학과 빌딩은 건물 3개를 붙여놓은 엄청나게 큰
        건물로 각자 건물의 층고가 다릅니다.
        <br />
        <br />
        (2) CHEM 1800: 건물에서 가장 큰 강의실이며 건물이 자체가 크고 캠퍼스
        중앙에 있다보니 경제학과 디스커션 등 다른 전공 수업들도 종종 열리기
        합니다.
        <br />
        <br />
        (3) Atrium: 만약 CHEM 빌딩 교실이 A로 시작한다면 지하에 있는 Atrium에
        수업이 있습니다. Atrium에는 실험 강의들이 진행되는 랩들이 모여있습니다.
        지하의 한쪽은 600대 랩이고 다른 한쪽은 700대 랩입니다.
        <br />
        <br />
        (4) 지상 1층: 1층 중앙에 위치한 Science Learning Center (SLC)에서 주로
        자연 과학 계열 오피스 아워가 많이 열립니다.
        <br />
        <br />
        (5) 지상 3,4층: 강의실보단 주로 리서치랩들과 교수님 오피스가 있습니다.
      </p>
    ),
  },
  {
    id: "randall_laboratory",
    title: "Randall Laboratory\n(RAND)",
    desc: (
      <p>
        (1) Physics 교수님들의 오피스와 Physics Help Room이 있습니다.
        <br />
        <br />
        (2) 해당 건물 뒤쪽으로 “Homer A. Neal Laboratory” 가 붙어있는데,
        이곳에선 CoE 학생들이라면 필수로 들어야 하는 Physics 141 과 Physics 241
        실험 수업들이 진행됩니다.
        <br />
        <br />
        (3) 지하에는 실험실들이 많이 위치해있는데, 복도가 어둡고 으스스합니다.
        또, 거의 모든 방문 앞에 붙어있는 빨간색 “DANGER” 경고 문구들은 으스스한
        분위기를 한층 더 고조시켜줍니다.
        <br />
        <br />
        (4) 중앙 엘리베이터가 매우 큽니다.
        <br />
        <br />
        (5) Randall Laboratory 와 West Hall 을 연결해 주는 계단이 있는데, 양쪽
        면이 유리로 되어있어서 마치 온실에 들어와있는 듯한 따뜻한 분위기를
        느끼게 해줍니다.
      </p>
    ),
  },
  {
    id: "cccb",
    title: "Central Campus Classroom Building\n(CCCB)",
    desc: (
      <p>
        (1) 2022년 지어진 새 건물로, 다양한 형태의 강의실이 존재하며 대부분이 큰
        강의실입니다.
        <br />
        <br />
        (2) 내부가 대체로 조용한 편이기 때문에 도서관이 아닌 새로운 곳에서
        공부를 해보고 싶다면 방문할 만한 장소입니다.
        <br />
        <br />
        (3) 특정 과목의 수업보다는 다양한 수업들이 진행되며, Stats 250, Phil
        183, Cogsci 200 등의 수업이 진행됩니다.
        <br />
        <br />
        (4) 그 외에도 큰 강당이 존재하여 학기 초 오리엔테이션이 진행되기도
        합니다.
      </p>
    ),
  },
  {
    id: "east_hall",
    title: "East Hall\n(EH)",
    desc: (
      <p>
        (1) 수학과 빌딩으로 대학교에서 오래된 빌딩 중 하나입니다. 수재라고 부를
        수 있는 수학과 학생들의 건물이기에 쉽게 쓰고 지울 수 있는 화이트보드
        따위 쓰지 않는다는 마인드로 모든 곳에 화이트 보드와 마카 대신 칠판과
        분필이 있습니다.
        <br />
        <br />
        (2) 일요일 아침에 무료로 베이글을 나누어 줍니다. 일요일 아침부터 열심히
        공부하는 모범생 느낌을 받고 싶다면 베이글 추천합니다.
      </p>
    ),
  },
  {
    id: "lorch_hall",
    title: "Lorch Hall\n(LORCH)",
    desc: (
      <p>
        (1) 경제학과 빌딩이지만 빌딩 규모가 작기에 모든 경제학과 학생을 수용하기
        어렵습니다.
        <br />
        <br />
        (2) ECON 인트로 수업들은 이 빌딩에서 진행되고 시험들은 Lorch 140에서
        진행되는 경우가 많습니다. 참고로 높은 레벨 수업들은 대부분 다른
        빌딩들에서 진행됩니다.
        <br />
        <br />
        (3) 경제학과 부서가 위치해 있고, 교수님들의 오피스아워가 종종 열립니다.
      </p>
    ),
  },
  {
    id: "bell_tower",
    title: "Bell Tower\n(BMT)",
    desc: (
      <p>
        (1) 캠퍼스 중앙에 위치한 상징적인 건축물입니다. 종을 치는 건물임에도
        불구하고 건물 내 수업을 진행하는 교실이 있습니다.
        <br />
        <br />
        (2) 보통 동일한 종소리가 나지만 특수한 경우, 하울의 움직이는 성 OST나
        유명한 클래식 음악이 학생들에 의해 연주되는 경우도 있습니다.
        <br />
        <br />
        (3) 실제로도 올라갈 수 있어 관심이 있으시면 한 번 올라가보시는 것도
        추천드립니다.
      </p>
    ),
  },
  {
    id: "west_hall",
    title: "West Hall\n(WH)",
    desc: (
      <p>
        (1) 인류학과와 물리학과 등의 전공이 주 학과인 빌딩이며 샤피로 도서관
        근처에 있습니다. 이 빌딩의 Arch 밑으로 통로가 있는데 Diag, South
        University 및 East University를 연결합니다.
        <br />
        <br />
        (2) 처음 방문한다면 빌딩 입구를 찾기 어려울 수 있습니다. 더불어 원하는
        방에 따라서 다른 입구로 출입합니다. 사전에 방을 찾아보고 방문하는 것을
        추천드립니다.
        <br />
        <br />
        (3) Randall Laboratory와 지상 통로로 연결되어 있습니다.
      </p>
    ),
  },
  {
    id: "weiser_hall",
    title: "Weiser Hall\n(WEIS)",
    desc: (
      <p>
        (1) 미시간 대학교 중앙 캠퍼스 중심부에 있습니다. 이 건물은 문학, 과학,
        국제학 등 다양한 ​​전공이 있습니다.
        <br />
        <br />
        (2) 2017년에 리모델링해서 쾌적하고 공부하기 좋습니다.
        <br />
        <br />
        (3) 1층에는 혼자 공부하거나 그룹으로 공부하고 싶은 분들을 위한 스터디
        공간이 마련되어 있습니다. 그러나 지나가는 행인들로 인해 약간
        부산스럽거나 시끄러울 수 있습니다.
      </p>
    ),
  },
  {
    id: "north_university_building",
    title: "North University Building\n(NUB)",
    desc: (
      <p>
        (1) 캠퍼스 중앙에 있으며 빌딩 외관이 고대 그리스식 형식으로 지어져
        예쁘고 신기합니다.
        <br />
        <br />
        (2) 근처에 CCTC 쪽으로 출입할 수 있는 문이 있어 버스를 이용할 때 매우
        편리합니다.
        <br />
        <br />
        (3) 다양한 Natural Science 부서들이 이 빌딩에 있으며 특히 관련 과목
        디스커션 섹션들이 진행됩니다. 교양을 LSA - NS (Natural Science)로 듣게
        되신다면 한 번쯤은 방문하게 됩니다.
      </p>
    ),
  },
];
const campusNorthData = [
  {
    id: "pierpont_commons",
    title: "Pierpont Commons",
    desc: (
      <p>
        (1) 주로 엔지니어링에 관련된 행사가 열리는 장소이며, 대표적으로
        Engineering Career Fair 가 매 학기 열립니다. 기타 행사들도 대부분
        엔지니어링에 관련되어 있어서 공과대학 학생들이 자주 방문합니다.
        <br />
        <br />
        (2) Panda Express, Hibachi San과 같은 식당, 그리고 Blue Market이나 Tech
        Shop 같은 편의 시설들이 있습니다. 노스 캠퍼스의 음식점과 상점은 이곳에
        모두 밀집되어 있습니다.
        <br />
        <br />
        (3) Duderstadt Center에서 Pierpont까지 실내 통로로 이동이 가능하여
        Duderstadt Center를 이용하는 학생들이 편하게 오갈 수 있습니다.
      </p>
    ),
  },
  {
    id: "stamps_auditorium",
    title: "STAMPS auditorium\n(STAMPS)",
    desc: (
      <p>
        (1) 노스 캠퍼스에 있는 유일한 대규모 강당이며, 종종 U-M School of Music,
        Theater & Dance에서 개최하는 공연 및 다양한 세미나들이 진행됩니다.
        <br />
        <br />
        (2) 평일 오전에서 이른 오후 사이에는 100 - 200명이 듣는 대규모 공대
        수업(ENGR 101)들이 진행되기도 합니다. 또한 많은 신입생을 수용해야 하는
        Introductory 수업들도 이곳을 많이 이용합니다.
      </p>
    ),
  },
  {
    id: "chrysler_center",
    title: "Chrysler Center (CHRYS)",
    desc: (
      <p>
        (1) 성공적인 학교생활에 필요한 정보를 담당하는 기관인 Engineering Career
        Resource Center (ECRC) 혹은 Engineering Advising Center (EAC) 등
        공과대학 학생들을 위한 행정기관들이 존재하는 건물입니다.
        <br />
        <br /> (2) 다양한 공과 수업 또한 이곳에서 진행되며, 학기 초에 Academic
        Advisor와 대면으로 미팅을 잡을 시 방문하게 될 건물입니다.
      </p>
    ),
  },
  {
    id: "duderstadt_library",
    title: "Duderstadt Center / Library",
    desc: (
      <p>
        (1) 노스 캠퍼스에 있는 지상 3층, 지하 1층으로 이루어진 최대 규모의
        도서관이며, 노스 캠퍼스에서 공부를 하는 학생들이 자주 방문하게 되는
        건물입니다.
        <br />
        <br />
        (2) 지하 1층: 가끔 이벤트가 진행되는 층이며, 그 외에는 자주 방문하지
        않게 되는 층 입니다. 몇몇 수업의 오피스 아워가 이곳에서 진행되기도
        합니다.
        <br />
        <br />
        (3) 1층: 카페와 건물 중심 근처에 그룹 스터디를 위한 공간이 존재합니다.
        하지만 공부할 수 있는 공간이 2층과 3층에 비해 적으며, 특히 카페 근처는
        학생들의 이동이 다분하고 조용하지 않아 만남의 장소로 이용되는 경우가
        많습니다.
        <br />
        <br />
        (4) 2층, 3층: 대부분의 노스 캠퍼스 학생이 공부를 하기 위해 방문합니다.
        2층과 3층에 따로 그룹 스터디를 위한 공간을 제외하면 조용한 분위기가
        형성되어 있습니다. 많은 학생이 컴퓨터를 이용하는 만큼, 컴퓨터와 노트북을
        연결할 수 있는 모니터(CAEN computer)가 제공됩니다.
        <br />
        <br />
        (5) Study Spaces 웹사이트에서 다인용 테이블을 예약할 수 있습니다.
      </p>
    ),
  },
  {
    id: "dow_engineering_building",
    title: "Dow Engineering Building\n(DOW)",
    desc: (
      <p>
        (1) 제법 많은 엔지니어링 수업이 진행되는 건물입니다. 바로 옆에 BBB
        건물과 실내 통로로 연결되어 있으며, 사실상 붙어있는 한 건물로
        취급합니다.
        <br />
        <br />
        (2) 교실 밖에 있는 벤치 외에는 머물거나 공부할 수 있는 공간이
        한정적이라, 대부분 수업을 위한 용도 외에는 방문할 일이 거의 없습니다.
      </p>
    ),
  },
  {
    id: "bob_and_betty_beyster_building",
    title: "Bob and Betty Beyster Building\n(BBB)",
    desc: (
      <p>
        (1) DOW 빌딩과 연결되어 있으며, 1층에서 오피스 아워가 다분하게
        이루어집니다.
        <br />
        <br />
        (2) 1층에는 따로 조용하게 공부할 수 있는 공간이 마련되어 있으며, 그 외
        공용 공간에 있는 벤치나 테이블은 주로 꽉 차 있습니다.
        <br />
        <br />
        (3) 1층 외 고층들은 주로 오피스나 미팅룸으로 구성되어 있어, 교수님과
        면담 혹은 오피스 아워를 위해 방문하게 됩니다.
      </p>
    ),
  },
  {
    id: "george_g_brown_laboratories",
    title: "George G. Brown Laboratories\n(GGBL)",
    desc: (
      <p>
        (1) 간혹 수업이 존재하지만, 거의 학생들의 이동이 없는 건물입니다. 그런
        만큼 공용 공간에서도 조용히 시간을 보낼 수 있는 숨겨진 공부 장소입니다.
        <br />
        <br />
        (2) 전공에 따라 간혹 지도 교수님들의 오피스가 위치할 수 있습니다. 건물
        내부 구조가 복잡하고 생소할 수 있어서 방문 계획이 있다면 시간을 넉넉하게
        잡는 것을 추천합니다.
      </p>
    ),
  },
  {
    id: "electrical_engineering_and_computer_science_building",
    title: "Electrical Engineering and Computer Science Building\n(EECS)",
    desc: (
      <p>
        (1) 많은 전기공학과 컴퓨터 관련 수업이 진행되는 건물입니다.
        <br />
        <br />
        (2) 1층에는 미팅이나 공부를 위한 다인용 테이블이 구비되어 있지만 개수가
        많지 않아 이용하기 어려워 오랫동안 공부하기보다는 주로 수업 전 대기 하기
        위해 사용합니다.
        <br />
        <br />
        (3) 1층 외에 층에는 오피스 아워가 존재하며, ECE (Electrical and Computer
        Engineering) Advising Office 또한 존재합니다. Walk-in advising도
        가능하기 때문에 ECE 전공 학생은 종종 방문합니다.
      </p>
    ),
  },
  {
    id: "ford_motor_company_robotics_building",
    title: "Ford Motor Company Robotics Building\n(FMCRB)",
    desc: (
      <p>
        (1) Robotics 관련 수업이나 프로젝트 팀을 위하여 자주 방문하게 되는
        건물입니다. 노스 캠퍼스의 다른 건물들이 밀집되어 있는 위치와 다소 떨어져
        있어 방문해야 한다면 동선을 점검하는 걸 추천합니다.
        <br />
        <br />
        (2) 근처에 버스 정류장 또한 존재하기 때문에 위치에 따라 다양한 버스로
        통학이 가능합니다.
        <br />
        <br />
        (3) 각 층에 공부할 수 있는 공간이 많고 일층에 카페도 있어서 새로운
        곳에서 공부해보고 싶을 때 가보면 좋을 것 같습니다.
      </p>
    ),
  },
  {
    id: "industrial_and_operations_engineering_building",
    title: "Industrial and Operations Engineering Building\n(IOE)",
    desc: (
      <p>
        (1) Lurie Engineering 바로 옆에 있으며 계단을 따라 내려가 보면 아름다운
        Lurie Fountain 도 볼 수 있습니다. Duderstadt 도서관과 가까워 공강이 있을
        때 가기 편리합니다. <br />
        <br />
        (2) 강의실이 많은 1층과 랩 수업들이 많은 지하로 나누어져 있습니다. IOE
        수업들이 이 건물에서 진행되며 건물 규모가 크지 않아 교실을 찾기
        용이합니다. <br />
        <br />
        (3) IOE building 일부분이 F24동안 공사중 이어서 현재 많은 IOE 오피스
        아워들이 (e.g. 310, 316, 366) ERB에서 진행되고 있습니다. <br />
        <br />
        (4) NERS Department 과 연결되어 있어 해당 출구로 나가면 센트럴로 가는
        버스들을 (Northwood, Commuter South, Diag-to-Diag, etc) Cooley Lab
        Outbound stop에서 탑승할 수 있습니다. 그 전 정류장에서 사람들이 많이
        타지 않기 때문에 앉아서 편하게 갈 수 있습니다
      </p>
    ),
  },
  {
    id: "earl_v_moore_building",
    title: "Earl V. Moore Building, School of Music\n(SM)",
    desc: (
      <p>
        (1) Pierpont Commons 건너편에 있으며 음대생들의 주 빌딩입니다. 빌딩에
        들어가면 라운지 느낌의 공간이 있으며 휴식 및 간식을 즐길 수 있는 공간이
        있습니다.
        <br />
        <br />
        (2) 건물이 꽤 크기에 강의실이 지하에 있으면 찾기가 어려울 수 있습니다.
        하지만 각 방마다 세팅이 잘되어 있어 악기를 연주하기에 적합합니다.
      </p>
    ),
  },
];
// -------------------------------------------------------

// [HOUSING] ----------------------------------------------
// TODO
const housingOnCampusData = [
  {
    id: "south_quad",
    title: "South Quad",
    desc: (
      <p>
        (1) 위치: 센트럴 캠퍼스 남쪽 법대 도서관 옆에 위치하고 있습니다.
        <br />
        <br />
        (2) 편의 시설: 1층에는 총 8개의 스터디룸과 지하와 9층에 스터디 라운지가
        있으나 항상 사람이 있어 자리를 찾기가 어렵습니다. 또한 1충에 학교 식당이
        위치하고 있어 편리하게 이용할 수 있습니다.
        <br />
        <br />
        (3) 기타: 총 9층으로 센트럴에서 가장 크고 대표적인 기숙사라고 할 수
        있으며, 많은 학생들이 거주하고 특히 운동선수들이 많이 살고 있습니다.
      </p>
    ),
  },
  {
    id: "west_quad",
    title: "West Quad",
    desc: (
      <p>
        (1) 위치: South Quad와 같이 붙어 있고 학교 식당을 공유하고 있습니다.
        <br />
        <br />
        (2) 편의 시설: Michigan Union과 실내로 연결되어 있어 공부할 장소나
        카페에 바로 이동할 수 있습니다. Michigan Union에는 공부할 수 있는 공간
        또한 상당히 존재하기 때문에 가까운 곳에서 공부가 가능하다는 장점이
        있습니다.
        <br />
        <br />
        (3) 기타: 다른 기숙사와 비교했을 때 방들이 크고 넓으며, 냉난방 시스템
        또한 잘 구비되어 있어 대체로 가장 좋다고 평가되는 기숙사 중 하나입니다.
        또한 많은 학생이 자주 들리게 되는 샤피로 도서관과도 도보 10분 거리에
        있어 굉장히 편리합니다.
      </p>
    ),
  },
  {
    id: "north_quad",
    title: "North Quad",
    desc: (
      <p>
        (1) 위치: 센트럴 캠퍼스 북쪽에 위치하며 Bell Tower 바로 옆에 있습니다.
        <br />
        <br />
        (2) 편의 시설: Rackham 빌딩 옆의 버스 정류장, CVS, Target 그리고 각종
        식당들이 가깝습니다.1층에 다이닝홀이 있어 편리하나 주말에는 오후
        2시까지만 열어 다른 곳으로 가야 하는 불편한 점이 있습니다. 또한 세탁실이
        3층에만 있어서 빨래를 하려면 엘레베이터로 이동해야하는 불편함이
        있습니다.
        <br />
        <br />
        (3) 기타: 신입생들이 별로 없어서 조용합니다. 지하에는 많은 교실들과
        라운지가 있어서 공부에 집중하기 좋은 환경입니다.
      </p>
    ),
  },
  {
    id: "east_quad",
    title: "East Quad",
    desc: (
      <p>
        (1) 위치: CCTC와 가장 가깝게 위치한 기숙사이며 Ross Building 바로 앞에
        있습니다.
        <br />
        <br />
        (2) 편의 시설: 1층에는 카페가 있으며 1층과 지하 모두 교실 및 악기
        연습실이 갖춰져 있습니다. 더불어 지하에는 탁구대와 당구대가 있습니다.
        1층에 위치한 다이닝홀은 규모가 작으나 만족스러운 퀄리티를 자랑합니다.
        그러나, 해당 다이닝홀이 샤피로 도서관에서 가장 가깝기에 중요 시간대에는
        학생들로 혼잡스럽습니다.
        <br />
        <br />
        (3) 기타: 주로 고학년 혹은 Residential College 학생들이 배정 받습니다.
      </p>
    ),
  },
  {
    id: "mosher_jordan",
    title: "Mosher-Jordan (MOJO)",
    desc: (
      <p>
        (1) 위치: 힐 중간에 위치한 기숙사입니다. 다른 기숙사들보다 센트럴
        캠퍼스로 가기까지 5~10분 정도 더 소요됩니다.
        <br />
        <br />
        (2) 편의 시설: 2층에는 큰 라운지가 있으며, 다른 기숙사에 비해 조금 더
        조용한 편입니다. 1층 세탁실 옆에는 비교적 작은 라운지가 있습니다.
        다이닝홀은 두 개의 층으로 이루어져 있고 메뉴가 다양합니다. 다른 기숙사에
        비해 맛있는 학식으로 소문나있습니다. 또, 1층에 위치한 카페는 평일 밤
        12시까지 운영하여 늦은 시간 간식을 사 먹기 좋습니다.
        <br />
        <br />
        (3) 기타: WISE RP 커뮤니티와 MRADS 신입생들이 주로 거주합니다.
      </p>
    ),
  },
  {
    id: "alice_lloyd",
    title: "Alice Lloyd",
    desc: (
      <p>
        (1) 위치: Mosher-Jordan과 같이 힐 위쪽에 위치한 기숙사입니다.
        <br />
        <br />
        (2) 편의 시설: 1층과 2층에는 스터디룸과 라운지가 다양하게 있고, 지하에는
        댄스 스튜디오, 악기 연습실 등이 있습니다. Mosher-Jordan 학교 식당이 바로
        옆에 있기 때문에, 해당 기숙사 건물 내에 다이닝홀이 없음에도 크게 불편한
        점은 없습니다.
        <br />
        <br />
        (3) 기타: 비교적 신식 건물이기에 매우 깨끗하고 깔끔합니다. 대부분의
        학생들이 Lloyd Scholars of Arts and Writing에 소속되어 있습니다.
      </p>
    ),
  },
  {
    id: "couzens",
    title: "Couzens",
    desc: (
      <p>
        (1) 위치: 커즌스는 힐 가장 위쪽에 위치해 있는 기숙사입니다.
        <br />
        <br />
        (2) 편의 시설: 각 층마다 간단한 설거지와 공부를 할 수 있는 라운지들이
        있고 1층과 2층에는 공부를 할 수 있는 작은 스터디룸들과 음악실, 메인
        라운지, 공용 주방, 그리고 당구대와 탁구대가 있는 게임룸이 있습니다.
        다이닝홀이 기숙사 내부에 없기 때문에 Mosher-Jordan 학교 식당을 이용해야
        합니다. 힐에 있는 다른 기숙사들에 비해 조금 먼 편이지만, 도보 3분이기에
        큰 불편함은 없습니다.
        <br />
        <br />
        (3) 기타: 바로 앞에는 노스 캠퍼스로 가는 Commuter North 와 노스
        캠퍼스에서 돌아오는 Northwood 버스가 정거하기 때문에 다른 센트럴
        기숙사보다 노스 캠퍼스로의 이동이 비교적 편리합니다.
      </p>
    ),
  },
  {
    id: "stockwell",
    title: "Stockwell",
    desc: (
      <p>
        (1) 위치: 힐 가장 아래쪽에 위치해 있는 기숙사입니다.
        <br />
        <br />
        (2) 편의 시설: 내부에 다이닝홀이 없는 관계로 Mosher-Jordan 학교 식당을
        이용해야 하지만, 바로 옆 건물이기에 크게 불편함은 없습니다. 1층에는
        세탁실, 음악실, 게임실, 공용 주방이 있습니다. 2층에 도서관처럼 생긴 공부
        할 수 있는 큰 공용공간이 있습니다.
        <br />
        <br />
        (3) 기타: 여자들과 남자들이 사는 곳이 따로 나누어져 있으며 기숙사
        왼쪽으로는 2025년 오픈 예정인 CCRB 운동 센터가 현재 공사 중이고, 그
        뒤로는 모든 주요 노선이 지나가는 버스 정류장 CCTC에서 가까운 편이기에
        이동이 편리합니다.
      </p>
    ),
  },
  {
    id: "markley",
    title: "Markley",
    desc: (
      <p>
        (1) 위치: 마클리는 힐 가장 후면에 위치해있는 기숙사 입니다. CCTC 까지
        도보 10분, 샤피로 도서관까지 도보 15분으로 센트럴 캠퍼스 CCTC에서 다소
        멀리 떨어져 있습니다.
        <br />
        <br />
        (2) 편의 시설: 2층에는 세탁실, 3층엔 탁구대와 당구대가 있는 큰 라운지가
        있으며, 큰 TV로 미식축구 경기를 같이 보는 이벤트 등이 열립니다. 4층엔
        Community Center와 공부를 할 수 있는 넓은 스터디 룸이 있습니다. 또한, 각
        층마다 소파가 있는 라운지가 있습니다. 건물 3층에 다이닝홀이 있습니다.
        비교적 크기가 작아 음식 종류가 적지만, 직접 피자를 만들어 먹을 수도
        있고, 과일류가 맛있는 편입니다. 외부 학생들이 잘 오지 않기에 한적합니다.
        <br />
        <br />
        (3) 기타: 노스 캠퍼스로 가는 Commuter North 와 센트럴로 가는 Commuter
        South 가 모두 기숙사 바로 앞을 지나가기에 주중에는 이동에 큰 불편함이
        없습니다. 그러나 두 버스 노선들이 운행하지 않는 주말에는 다소 먼 거리를
        걸어야만 합니다.
      </p>
    ),
  },
  {
    id: "oxford",
    title: "Oxford",
    desc: (
      <p>
        (1) 위치: 옥스퍼드는 캠퍼스 동쪽 멀리에 있습니다. 센트럴 캠퍼스 주요
        위치 밖, 주거 지역에 있어 사실상 고립되어 있습니다. 센트럴 캠퍼스로는
        Oxford Shuttle을 이용하면 빠르게 이동할 수 있습니다.
        <br />
        <br />
        (2) 편의 시설: 각 건물마다 3층으로 이루어져 있고 1층은 라운지, 2층은
        남자 기숙사, 3층은 여자 기숙사로 이루어져 있습니다. 방들이 큰편에 속해서
        생활하기는 편합니다. 세탁기와 건조기는 지하에 있습니다. Twigs라는 매우
        작은 다이닝홀이 위치해 있는데, 음식 종류도 한정적이고 다른 학교식당에
        비해 맛이 있는 편은 아닙니다.
      </p>
    ),
  },
  {
    id: "bursley",
    title: "Bursley",
    desc: (
      <p>
        (1) 위치: 노스 캠퍼스에 있는 두 개의 기숙사 중 하나이며, 노스 캠퍼스
        주요 건물들까지 걸어서 약 10분 정도가 소요됩니다.
        <br />
        <br />
        (2) 편의 시설: 각종 라운지와 음악 연습실 등이 있고, 바로 길 건너에
        위치한 NCRB에선 헬스장, 수영장, 사우나와 테니스, 농구, 배구, 등을 즐길
        수 있는 시설이 잘 갖춰져 있습니다. 노스 캠퍼스의 유일한 다이닝홀이
        있으며, 음식 종류도 다양하고 자리도 매우 많기에 이용이 편리합니다.
        <br />
        <br />
        (3) 기타: 기숙사 바로 앞에 버스 정류장이 있어서 Bursley-Baits 버스를
        타면 센트럴 캠퍼스까지 약 15분 정도 걸립니다. 평일에는 5분 간격으로
        버스가 오지만 배차 간격이 긴 편인 주말에는 20분 넘게 버스가 오지 않을
        때도 있어서 특히 추운 겨울에는 버스 시간을 잘 보고 버스 정류장으로
        나가야 합니다.
      </p>
    ),
  },
  {
    id: "baits",
    title: "Baits",
    desc: (
      <p>
        (1) 위치: 노스 캠퍼스에서 가장 멀리 떨어져 있는 기숙사이며, 다른 노스
        캠퍼스 주요 건물들과는 걸어서 약 15분 정도 소요됩니다.
        <br />
        <br />
        (2) 편의 시설: 각 건물마다 다른 편의시설 (영화관, 탁구장, 주방 등)이
        있습니다. 또한, 각 건물마다 세탁실이 따로 존재합니다. 그렇기 때문에 다른
        기숙사에 비하여 세탁실이 여유 있는 편입니다. 주말 저녁을 제외하면 대부분
        원할 때 세탁실 이용이 가능합니다. 기숙사 내 다이닝 홀이 없기에 Bursely
        다이닝 홀을 이용해야 합니다. 걸어서 가야 하기 때문에 식사 시간을 조금
        여유 있게 잡아야 하며 특히 겨울철 아침에는 이동이 조금 불편할 수
        있습니다.
        <br />
        <br />
        (3) 기타: 노스 캠퍼스 주요 건물들과는 걷기에 거리가 애매해서
        Baits/Bursley 각 기숙사 앞에 있는 버스 정류장에서 Bursley Baits 버스를
        타고 통학합니다. 센트럴 캠퍼스에 있는 건물을 기숙사에서 바로 가기
        위해서는 Bursely Baits 버스를 필수로 타야 합니다. 싱글룸을 배정 받을 수
        있는 기숙사이기에 룸메이트와 지내는 생활이 익숙하지 않을 시 보다 편한
        기숙사 생활이 가능할 수 있습니다. 하지만 싱글룸은 확정적으로 배정받을 수
        없고 방이 작은 편에 속합니다.
      </p>
    ),
  },
];
const housingOffCampusData = [
  {
    id: "tower_plaza",
    title: "Tower Plaza",
    desc: (
      <p>
        (1) 위치: 도보로 Michigan Union / Mason Hall에서 3분, Diag로부터 5분,
        Shapiro Library로부터 7분, CCTC로부터 10분 정도 소요됩니다.
        <br />
        <br />
        (2) 편의 시설: 1층에는 아파트 출입 및 택배/우편 관리를 담당하는 데스크가
        있으며, 지하 1층에는 세탁실이 있습니다. 주민을 위한 별도의 헬스장 및
        스터디룸은 없습니다. 엘리베이터는 3대가 있습니다. 주변 음식점으로는
        Asian Legend, Tomukun Noodle Bar / Korean BBQ, New York Pizza Depot,
        Hopcat, The Seoul, Slurping Turtle, Pita Kabob, Chipotle, Totoro 등이
        있으며, 주변 카페로는 Starbucks, Comet Coffee, Jasmine Tea, Ding Tea,
        Share Tea 등이 있습니다. 그 외에도 Target, CVS, Walgreens, 7-11, Fedex
        등이 도보 5분 거리 이내에 있어 생활 방면으로 편리합니다.
        <br />
        <br />
        (3)가격: 구조/층수/리모델링/일조권/가구 등에 따라 가격 차이가 있습니다.
        구축 건물의 특성상 유닛에 따른 노후도 차이가 있기 때문에 계약 이전에
        Room Tour 하시는 것을 추천합니다. 유틸리티 중 수도세는 주로 렌트비에
        포함되어 있으며 전기는 DTE ENERGY를 통해 별도로 신청 및 납부하게 됩니다.
        와이파이 또한 별도 설치가 필요합니다.
        <br />
        <br />
        (4) 방/건물 소개: 1965년에 완공된 앤아버 최고층 건물으로 총 26층, A~L
        유닛으로 구성되어 있습니다. 대부분의 호수가 Studio 또는 1 Bedroom입니다.
        State Street 상권 및 센트럴 캠퍼스로부터 가깝습니다.
        <br />
        <br />
        (5)기타: Load/Unload 등의 목적으로 건물 뒤편 주차장을 30분 동안 임시로
        사용할 수 있으며, 정기 주차는 Maynard Parking Structure를 이용할 수
        있습니다.
        <br />
        <br />
        (6) 입주 전년도 12월부터 매물이 올라오기 때문에 관심이 있으신 분들은
        사전에 준비하는 것을 추천합니다. 계약 시 보증금으로 한 달 치 렌트비를
        지불하게 됩니다. 아파트 웹사이트를 통해 유닛 구조 및 계약 가능한 매물을
        확인하실 수 있습니다. <br />
        <br />
        https://www.towerplaza.com/
        <br />
        https://towerplaza.net/
      </p>
    ),
  },
  {
    id: "landmark",
    title: "Landmark",
    desc: (
      <p>
        (1) 위치: South University에 있으며 University Towers 맞은편에 위치한
        아파트입니다. Diag과는 도보 약 6분 거리, CCTC 정류장과는 약 5분 거리,
        Shapiro 도서관과는 약 4분 거리라서 위치가 정말 좋은 편입니다. <br />
        <br />
        (2) 편의 시설: 건물 2층에 헬스장이 있습니다. 다만 운동 기구가 다양하지
        않기 때문에 헬스를 다양한 운동 종목을 루틴으로 삼는 리프터분들께는 다소
        부적합 할 수 있습니다. 주변에 맛있는 식당들이 많아서 끼니를 채우기
        편합니다. 대표적으로는 Rich JC, Kang’s, No Thai 가 있습니다. <br />
        <br />
        (3) 가격: 유틸리티는 미포함이기에 사이트에서 안내하는 월세보다
        실질적으로 더 납부하게 됩니다.
        <br />
        <br />
        (4) 방/건물 소개: 구조는 4 Bed 2 Bathrooms 구조가 가장 흔하고
        일반적입니다. 하지만 원하시면 스튜디오에서 6 bedroom까지 다양한 구조들이
        있습니다. 가격 차이가 물론 있겠지만, 다양한 선택지가 있어서, 선호하시는
        구조 선택이 가능합니다. 주방과 거실이 넓고 쓰기 좋지만, 반대로 침실이
        다소 작다는 단점이 있습니다.
      </p>
    ),
  },
  {
    id: "university_tower",
    title: "University Tower (UT)",
    desc: (
      <p>
        (1) 위치: 센트럴에 있어 학교 건물과 가깝고 주위에 식당 및 편의 시설이
        많이 있어 지리적으로 이점이 있습니다. Diag과는 도보 약 6분 거리, CCTC
        정류장과는 약 5분 거리, Shapiro 도서관과는 약 4분 거리입니다. <br />
        <br />
        (2) 편의 시설: 근처 음식점으로는 Kang’s restaurant, Noori Chicken, Rich
        J.C, No Thai, Sadako, Subway, One bowl, Pancheros, Joe’s Pizza 등이
        있으며, 근처 카페로는 Starbucks, Quickly boba, Sweeting, M-36 Coffee
        Roasters 등이 있습니다. 그 외에도 7-11, Pinball Pete, 그리고 USPS와
        Amazon Center이 도보 5분 거리 이내에 있어서 편리합니다. <br />
        <br />
        (3) 가격: 유틸리티 중 수도세는 렌트비에 포함되어 있지만 전기세는 별도로
        DTE Energy를 통해 확인 후 납부해야 합니다. <br />
        <br />
        (4) 방/건물 소개: 1965년에 지어진 고층 아파트 중 하나입니다. 아파트
        구조는 다음과 같습니다. 아파트의 1층에는 따로 관리를 담당하는 데스크와
        택배실 및 커피 머신이 있으며, 그 외 편의시설로 수영장, 피트니스 센터,
        세탁실, 그리고 작은 공부 공간 및 휴게 공간이 있습니다. 2층은 luxury
        floor plan, 그 외 3층부터 19층까지는 베이직한 tower floor plan으로
        이루어져 있으며, 베이직 플랜의 경우 스튜디오 형식부터 2, 3, 4인실까지
        다양한 유닛의 옵션이 포함되어 있습니다. 아파트 웹사이트를 통해 구체적인
        유닛 구조와 가격대를 확인해볼 수 있으며, virtual tour 옵션을 통해 유닛
        내부를 체험해 볼 수 있습니다. <br />
        <br />
        (5) 기타: 아파트 자체에서 거주민들을 대상으로 이벤트를 종종 개최합니다.
        브런치나 피자를 제공하기도 하며, 할로윈 기간에는 펌킨 페인팅 이벤트를
        열어 우승자에게 상품권을 제공하기도 합니다. https://u-towers.com/
      </p>
    ),
  },
  {
    id: "saga_ann_arbor",
    title: "Saga Ann Arbor",
    desc: (
      <p>
        (1) 위치: 아파트에서의 거리는 Diag까지 도보 12분, Pierpont까지 버스로
        20분입니다. 아파트 앞의 정류장에서 The Ride를 타 Courtyard 앞에서 내려
        걸어가거나 Power Center 앞 정류장에서 M Bus를 타 Pierpont 앞에서 내릴 수
        있습니다. 또한 Target까지 도보 5분, Kerrytown까지 도보 9분이라서
        장보기가 대체적으로 편합니다.
        <br />
        <br />
        (2) 편의 시설: 아파트 어메니티, 특히 스터디 라운지가 잘 구성되어 있으며
        Stray Hen을 비롯한 다양한 식당들이 근처에 있습니다.
        <br />
        <br />
        (3) 가격: 가스비, 전기세, 수도세 모두 유틸리티에 포함되어 있습니다.
        Campus 내의 High rise 중 비교적 조금이나마 저렴한 가격이라 할 수
        있습니다.
      </p>
    ),
  },
  {
    id: "hub",
    title: "HUB",
    desc: (
      <p>
        (1) 위치: Diag까지 도보로 10분 정도 걸리며 도보로 5분 거리 이내에
        7-eleven, target, cvs, walgreen 등 많은 편의 시설이 있습니다.
        <br />
        <br />
        (2) 편의 시설: 아파트 내에 헬스장, 사우나, 핫텁, 루프탑, study center
        등이 있고 그 중 헬스장과 study center는 24시간 열려 있으며 프린터를
        무료로 이용할 수 있습니다. 각 층마다 분리수거와 쓰레기를 버릴 수 있는
        장소가 마련되어 있고 각 집마다 세탁기가 있습니다.
        <br />
        <br />
        (3) 가격: 렌트에 가스비, 전기세, 수도세 등이 포함되어 있지 않아 추가
        비용이 들고 전기세는 DTE를 통해서 매월 $50 정도 들며 water, gas, sewer
        등의 비용은 빌딩 전체에서 분할해서 비용을 청구하기 때문에 매월 $40 정도
        내야 합니다.
        <br />
        <br />
        (4) 방/건물 소개: Studio부터 4 bed 구조까지 다양하게 있는 고층 아파트로
        Huron St.에 위치하고 있고 다른 주거 옵션보다 렌트가 비싼 편에 속합니다.
      </p>
    ),
  },
  {
    id: "zwest",
    title: "ZWest",
    desc: (
      <p>
        (1) 위치: Tower Plaza 바로 건너편으로 도보로 Michigan Union / Mason
        Hall에서 3분, Diag로부터 5분, Shapiro Library로부터 7분, CCTC로부터 12분
        정도 소요됩니다.
        <br />
        <br />
        (2) 편의 시설: 건물 1층에 헬스장이 있습니다. 작긴 하지만 다양한 운동
        기구가 있어서 웬만한 운동 루틴은 다 할 수 있습니다. 세탁기와 건조기가 방
        안에 구비되어 있어서 빨래를 하러 집 밖으로 이동할 필요가 없습니다.
        리모델링 되어있는 집들은 바닥이 카펫이 아니라서 청소하기도 편리합니다.
        주변 음식점으로는 Asian Legend, Tomukun Noodle Bar / Korean BBQ, New
        York Pizza Depot, Hopcat, The Seoul, Slurping Turtle, Pita Kabob,
        Chipotle, Totoro 등이 있으며, 주변 카페로는 Starbucks, Comet Coffee,
        Jasmine Tea, Ding Tea, Share Tea 등이 있습니다. 그 외에도 Target, CVS,
        Walgreens, 7-11, Fedex 등이 도보 5분 거리 이내에 있어 생활 방면으로
        편리합니다.
        <br />
        <br />
        (3) 가격: 유틸리티는 미포함이기에 사이트에서 안내하는 월세보다
        실질적으로 더 납부하게 됩니다.
        <br />
        <br />
        (4) 방/건물 소개: 구조는 1, 2, 4 bed으로 이루어져 있습니다. 주방과
        거실은 넓은 편이지만 방이 상대적으로 작아서 룸메이트와 방을 나눠서
        쓰기에는 조금 좁다고 느껴질 수 있습니다. State Street 상권 및 센트럴
        캠퍼스로부터 가깝습니다.
      </p>
    ),
  },
];
// -------------------------------------------------------

// [TRAVEL] ----------------------------------------------
const travelAnnArborData = [
  {
    id: "university_of_michigan",
    title: "University of Michigan",
    desc: (
      <p>
        (1) 앤아버가 캠퍼스 도시인 만큼 미시간 대학교 구석구석을 여행해 보는
        것도 좋은 추억이 될 수 있습니다.
      </p>
    ),
  },
  {
    id: "nichols_arboretum",
    title: "Nichols Arboretum",
    desc: (
      <p>
        (1) Central Campus에 위치하며 산책하기 좋은 정원입니다.
        <br />
        <br />
        (2) Botanical Garden에서는 온실에서 열대식물 및 건조지역 식물들을 볼 수
        있고, 허브 정원, 산책로 등을 이용할 수 있습니다.
      </p>
    ),
  },
  {
    id: "michigan_stadium",
    title: "Michigan Stadium",
    desc: (
      <p>
        (1) 공식적으로 무려 107,601명을 수용할 수 있는 미식축구 경기장이자 “The
        Big House” 라고도 불립니다. 세계에서 두번째로 많은 인원의 관중들을
        수용할 수 있는 구장이기도 합니다.
        <br />
        <br />
        (2) 가을학기 때 친구들과 홈경기를 보러 가면 학교 학생들의 열광적인
        분위기를 느낄 수 있습니다.
        <br />
        <br />
        (3) 겨울학기 졸업식은 미시간 스타디움에서 진행합니다.
      </p>
    ),
  },
  {
    id: "university_of_michigan_museum_of_natural_history",
    title: "University of Michigan Museum of Natural History",
    desc: (
      <p>
        (1) Biology 빌딩 안에 위치한 자연사 박물관입니다.
        <br />
        <br />
        (2) 교내 가장 큰 버스 정류장인 CCTC 바로 옆에 있어 접근성이 좋고 건물도
        눈에 띄어 쉽게 찾을 수 있습니다.
        <br />
        <br />
        (3) 입장료는 무료이고 아이들이 즐길 수 있는 여러가지 활동들이 있습니다.
      </p>
    ),
  },
];
const travelDetroitData = [
  {
    id: "comercia_park",
    title: "Comercia Park",
    desc: (
      <p>
        (1) 메이저리그 구단 디트로이트 타이거스의 홈구장입니다. 주로 야외석이
        많아서 날씨 확인 후 방문하는 것을 추천합니다.
        <br />
        <br />
        (2) 야구를 좋아하시는 분이라면 눈앞에서 메이저리그를 경험할 수 있기에
        방문을 추천합니다.
      </p>
    ),
  },
  {
    id: "greek_town",
    title: "Greek Town",
    desc: (
      <p>
        (1) 다운타운 안에 위치한 그릭 타운에서는 그리스에서 접할 수 있는 것보다
        더 맛있는 그리스식 지중해 식사를 저렴한 가격에 할 수 있습니다.
        <br />
        <br />
        (2) 디트로이트에서 가장 오래된 카지노인 할리우드 카지노 (Hollywood
        Casino at Greektown)도 있습니다.
        <br />
        <br />
        (3) 유명한 레스토랑으로는 The New Parthenon, The Golden Fleece, Cyprus
        Taverna, Pegasus Taverna, Pizza Papalis, Fishbone’s Rhythm Kitchen Cafe
        등이 있습니다.
      </p>
    ),
  },
];
const travelNearbyData = [
  {
    id: "holland",
    title: "Holland",
    desc: (
      <p>
        (1) 1840년대의 캐나다에서 살던 네덜란드인들이 이주 후 정착한 마을입니다.
        <br />
        <br />
        (2) 네덜란드 전통의 건축물, 음식 및 축제 등이 잘 보존되어 있고
        세계적으로 유명한 연례 봄 축제인 튤립 타임 (Tulip Time)에서는 네덜란드
        전통문화 공연, 풍차, 시가행진 등을 즐길 수 있습니다.
        <br />
        <br />
        (3) 축제 기간인 5월에 방문하면 5백만 송이가 넘는 튤립의 물결을 볼 수
        있습니다.
        <br />
        <br />
        (4) 겨울에 볼 만한 것들로는 크리스마스 상록수와 네덜란드 성 니콜라스인
        신터클라스 (Sinterklaas)가 있습니다.
        <br />
        <br />
        (5) 미시간호 주변에서 카약, 제트스키, 카이트 서핑 등과 같은 활동들을
        즐기실 수 있습니다.
      </p>
    ),
  },
  {
    id: "frankenmuth",
    title: "Frankenmuth",
    desc: (
      <p>
        (1) 독일 마을로 일 년 내내 크리스마스 장식용품을 팔고 독일 전통 의상,
        요리, 주택 등을 구경할 수 있습니다.
        <br />
        <br />
        (2) 매월 5월 셋째 주에 세계 맥주 축제가 열려서 이에 맞추어 1박 2일로
        방문하면 맛있는 맥주를 많이 마실 수 있습니다.
        <br />
        <br />
        (3) 크리스마스 시즌에 여행 가면 스탬프 이벤트, 무료 소시지 맛보기, 무료
        핫초코 나눔 등의 행사가 있고 상품도 받을 수 있습니다. 연말 분위기를
        느끼고 싶다면 Frankenmuth 방문을 추천드립니다.
        <br />
        <br />
        (4) 중심가에 음악이 나오는 크리스마스트리가 있고 부근에 규모가 정말 큰
        크리스마스 장식용품 상점이 있습니다.
        <br />
        <br />
        (5) 앤아버 캠퍼스에서 자동차로 1시간 20분 소요됩니다.
      </p>
    ),
  },
  {
    id: "traverse_city",
    title: "Traverse City",
    desc: (
      <p>
        (1) 오대호 중 하나인 미시간 호수 앞에 위치한 도시이며 맑은 물과 깨끗한
        모래로 여름휴가와 가을의 단풍이 유명합니다. 특히 여름철에 물놀이하러
        가기 매우 좋습니다.
        <br />
        <br />
        (2) 미시간의 명물인 체리의 주 생산지역입니다. 7월 초에는 체리 페스티벌이
        열리기도 합니다.
        <br />
        <br />
        (3) 미시간의 주요 관광 명소 중 하나인 Sleeping Bears Sand Dune이
        있습니다.
        <br />
        <br />
        (4) 앤아버 캠퍼스에서 자동차로 약 3시간 50분 정도 소요됩니다.
      </p>
    ),
  },
  {
    id: "mackinac_island",
    title: "Mackinac Island",
    desc: (
      <p>
        (1) 오대호 중 하나인 휴런 호에 위치해있는 섬입니다. 미시간주의 Upper
        Peninsula와 Lower Peninsula를 연결하는 지역에 있습니다.
        <br />
        <br />
        (2) 미시간주 주민들에게는 마치 제주도와 같은 대표 휴양 섬입니다.
        <br />
        <br />
        (3) 자동차 출입이 금지되어 있어 Mackinaw City에서 배를 타고 가야 합니다
        (15~20분 소요). 섬 내부에서는 마차 또는 자전거로 여행을 합니다.
        <br />
        <br />
        (4) 앤아버 캠퍼스에서 자동차로 4시간 소요됩니다. 눈이 많이 오는 겨울에
        가면 길이 미끄러워 여름 혹은 가을에 방문하는 것을 추천합니다.
      </p>
    ),
  },
  {
    id: "cedar_point",
    title: "Cedar Point",
    desc: (
      <p>
        (1) 앤아버 캠퍼스에서 자동차로 2시간 반 거리에 있는 오하이오 주에 위치한
        놀이동산입니다.
        <br />
        <br />
        (2) 종일 자유이용권은 약 $100 정도 되며 음식도 Pass를 구매하여 즐기면
        보다 저렴한 가격에 즐길 수 있습니다. 음식의 퀄리티는 무난합니다.
        <br />
        <br />
        (3) 한국의 놀이공원들과는 비교도 안 되는 스케일의 다양한 롤러코스터와
        스릴 넘치는 놀이 기구로 유명합니다. 이 중, 약 95미터 상공에서 150 km/h
        의 속도로 하강하는 Millennium Force 롤러코스터가 제일 유명합니다.
        <br />
        <br />
        (4) 개강 전날(8월 29일)에 방문하였을 때 사람이 많이 없어 놀이기구마다 약
        30분 정도 대기하고 탑승했습니다. 아침에 앤아버에서 출발하고 폐장 후에
        귀가하였는데, 하루 동안 7개의 놀이기구를 탑승했습니다.
      </p>
    ),
  },
  {
    id: "chicago",
    title: "Chicago",
    desc: (
      <p>
        (1) 비교적 앤아버에 가까운 대도시로서 미국 제 3의 도시인 시카고가
        있습니다.
        <br />
        <br />
        (2) 시카고의 대표적인 관광지로는 Magnificent Mile이 있는데 환상적인
        1마일이라는 별명에 걸맞는 화려한 거리입니다. 쇼핑 및 웅장한 빌딩숲
        사이에 걸어다니기 좋습니다.
        <br />
        <br />
        (3) 시카고 다운타운과는 거리가 조금 있지만 위 쪽으로 조금 올라가면
        한인상가가 밀집해 있는 지역이 있습니다. 한인식료품점도 많아서 앤아버보다
        훨씬 싼 가격에 한국물건들을 살 수 있습니다.
        <br />
        <br />
        (4) 시카고에는 애들러 천문대, 시카고 미술관, 브룩필드 동물원, 필드
        자연사 박물관과 같은 다양한 볼거리가 있습니다. 각 박물관마다 무료로
        입장하는 날이 있어 미리 알아보고 가면 저렴한 관광을 할 수 있습니다.
      </p>
    ),
  },
  {
    id: "canada",
    title: "Canada",
    desc: (
      <p>
        (1) 앤아버에서 근교에는 전국적으로 유명한 관광지인 나이아가라 폭포가
        있습니다.
        <br />
        <br />
        (2) 나이아가라 폭포는 미국과 캐나다 두 나라에서 볼 수 있는데 캐나다
        쪽에서는 폭포를 정면으로 한눈에 쉽게 볼 수 있고 미국 쪽은 폭포의 측면을
        볼 수 있습니다. 캐나다에 넘어가서 보는 풍경이 웅장해 주로 국경을 넘어가
        캐나다 음식인 Poutine을 먹고 폭포를 본 후 넘어오는 루트가 유명합니다.
        <br />
        <br />
        (3) 만약 가시는 경우 International Center에서 I-20나 DS-2019 form에
        사인을 받아야 합니다.
      </p>
    ),
  },
];

// -------------------------------------------------------

// [SPORTS] ----------------------------------------------
const sportsFacilityData = [
  {
    id: "central_campus_recreation_building",
    title: "Central Campus Recreation Building (CCRB)",
    desc: (
      <p>
        (1) 현재는 공사 중이어서 센트럴에 사시는 분들은 Palmer Field Temporary
        Field를 이용할 수 있습니다.
        <br />
        <br />
        (2) 2025년 봄에 완공 예정입니다.
      </p>
    ),
  },
  {
    id: "north_campus_recreation_building",
    title: "North Campus Recreation Building (NCRB)",
    desc: (
      <p>
        (1) 웨이트 시설, 농구장, 배드민턴 코트 및 수영장이 있으며 규모가 크기에
        다양한 운동을 하기 용이합니다. 1층에는 헬스장 및 수영장이 있으며,
        2층에는 다수의 러닝머신들이 위치하고 있습니다. 배드민턴은 코트가 많지
        않고 선착순 제도로 운용하고 있기에 시간을 잘 알고 가셔야 합니다.
        <br />
        <br />
        (2) Bursley-Baits 버스 탑승 후 Courtyard 에서 하차하면 뒤쪽으로 보이는
        건물입니다.
      </p>
    ),
  },
  {
    id: "intramural_sports_building",
    title: "Intramural Sports Building (IM)",
    desc: (
      <p>
        (1) Central Campus 남쪽에 있으며 Commuter South 를 탑승하면 도착할 수
        있습니다.
        <br />
        <br />
        (2) Mcard 혹은 Recreational Sports Member Card를 보여줘야 입장이
        가능합니다. 농구 코트, 탁구대, 배구 등등 다양한 운동 시설들을 예약 없이
        쓸 수 있습니다. 학기 초반에는 사람들이 많이 와서 기다려야 하는 경우가
        많고, 점심 시간과 5시쯤에도 사람들이 붐빕니다.
      </p>
    ),
  },
];
const sportsMiscSportsData = [
  {
    id: "soccer",
    title: "축구",
    desc: (
      <p>
        (1) 현재 앤아버에는 한국인 중심으로 운영되는 축구 클럽들이 다수
        존재합니다. 여름에는 학교 내에 있는 Mitchell Field에서 주로 연습하며,
        눈이 많이 내리는 겨울의 경우 근교에서 있는 실내 축구장을 대관하여 연습을
        진행합니다.
        <br />
        <br />
        (2) 학부 축구팀인 UMK (Futbol Club at the University of Michigan
        Koreans) 는 한인 축구 동아리이며 선수들은 근처 대학교들과 함께
        축구경기를 참여하게 됩니다.
      </p>
    ),
  },
  {
    id: "basketball",
    title: "농구",
    desc: (
      <p>
        (1) 학교 내에는 CCRB, NCRB, IM 내에 있는 실내 코트를 이용할 수 있고 그
        외에도 주위 학교 및 주거 단지에 위치한 실외 코트를 이용할 수 있습니다.
        <br />
        <br />
        (2) 따로 한인 농구 동아리는 존재하지 않지만 농구를 좋아하는 한인들이
        많아 사람을 모아 코트를 잡고 경기를 진행할 수도 있습니다.
      </p>
    ),
  },
  {
    id: "tennis",
    title: "테니스",
    desc: (
      <p>
        (1) 실내 테니스를 즐기기 위해서는 학교 시설인 Varsity Tennis Center에
        멤버십을 가지고 있어야 하는데, 학생은 할인가격에 등록이 가능합니다. 주로
        Varsity Tennis Center 등 실내 테니스 경기장에서 경기를 진행하기 때문에
        한 해 동안 쉬지 않고 꾸준히 운영되고 있습니다. <br />
        <br />
        (2) 멤버십을 가지고 있는 사람과 같이 갈 경우 게스트 자격으로 $10을
        지불하고 플레이 가능하며 이와 별개로 코트비용는 별도로 있습니다.
        멤버쉽이 없는 경우 타 테니스장과 비교해서 저렴한 가격에 테니스를 즐기실
        수 있습니다. <br />
        <br />
        (3) 키사에서 운영하고 있는 테니스 소그룹(Swings)이 있으니 실력에
        상관없이 누구나 테니스를 치고 싶으신 분이 있다면 연락 주시면
        감사하겠습니다. (인스타그램) 저희 소그룹은 날씨가 좋은 가을에는 앤아버에
        있는 공원 테니스 코트에서 진행하고, 겨울에는 Varsity Tennis Center에서
        진행합니다.
      </p>
    ),
  },
  {
    id: "golf",
    title: "골프",
    desc: (
      <p>
        (1) 앤아버에서 야외 라운딩을 할 경우 한국보다 매우 저렴하게 골프를 즐길
        수 있습니다. 그러나 추운 날씨 탓에 골프장들은 대개 겨울을 제외한 4월부터
        11월까지 운영됩니다. 학교 골프장의 경우 미국대학 골프코스 3위에 오를
        정도로 평가가 좋습니다.
        <br />
        <br />
        (2) Driving Range는 계절 상관없이 운영되며 Indoor Golf Course도 있으나
        One Bay 기준 시간당 $40~60로 저렴하진 않은 편입니다.
        <br />
        <br />
        (3) 키사에서 운영하고 있는 골프 소그룹(공굴러가요)이 있으니 구력
        상관없이 골프에 관심 있으신 분은 연락 주시면 감사하겠습니다.
        <br />
        <br />
        <b>University of Michigan Golf Course</b>
        &nbsp;&nbsp; https://umgolfcourse.umich.edu/ <br />
        웹사이트를 통해 티타임 예약이 가능합니다. 일반적으로 티타임 1주일 전부터
        예약 가능하나 시즌 패스 소유자의 경우 14 day advanced booking window가
        제공됩니다. 그린피와 카트비가 별도로 부과되며 추가 금액 지불 시 클럽
        렌탈도 가능합니다. 자세한 사항은 웹사이트 참고 부탁드립니다.
        <br />
        <br />
        [Driving Range]
        <br />
        <b>Miles of Golf</b>
        <br />
        9am-12pm: $10 for a small bucket of 55 balls, $12 for a medium bucket of
        75 balls, and $14 for a large of 100 balls. <br />
        12-6pm: $12 for a small bucket of 55 balls, $14 for a medium bucket of
        75 balls, and $16 for a large of 100 balls. (*All range ball purchases
        include the use of Toptracer Range*)
        <br />
        <br />
        [Indoor Golf]
        <br />
        <b>Ann Arbor Indoor Golf:</b> $30-40/h
        <br /> <b>X-Golf Ann Arbor:</b> $40-60/h
      </p>
    ),
  },
  {
    id: "ski",
    title: "스키",
    desc: (
      <p>
        미시간에 오면서 스키를 기대하며 오는 분들도 있겠지만, 이곳은 산이 거의
        없기 때문에, 근처에서 수준급의 스키장을 기대하기는 어렵습니다. 하지만
        가족들과 함께 시간을 보내기에는 괜찮은 아기자기한 스키장들이 가까이
        있고, 거리가 좀 멀지만 Upper peninsula와 Northern lower peninsula에는
        괜찮은 스키장들이 있습니다.
        <br />
        <br />
        대표적인 근교 스키장으로는 Mt.Brighton (30분), Alpine (50분), Mt. Holly
        (1시간), Mt. Boyne (4시간) 등이 있습니다. (센트럴 캠퍼스 기준)
      </p>
    ),
  },
];
// -------------------------------------------------------

// [RESTAURANTS] ----------------------------------------------
const restaurantsKoreanMarketData = [
  {
    id: "orange_market",
    title: "Orange Market",
    desc: (
      <p>
        센트럴 캠퍼스 바로 위에 위치한 한인마트이며 23/65번 버스를 타고 가면
        편리합니다. 자취생들을 위한 식재료가 많이 있습니다. 한인 사장님이 손수
        만드신 맛있는 반찬도 구매 가능합니다.
      </p>
    ),
  },
];
const restaurantsKoreanData = [
  {
    id: "tomukun_bbq",
    title: "Tomukun BBQ",
    desc: (
      <p>
        다양한 메뉴로 구성되어 있으며, 고기, 면류, 등등 선택지가 많아서
        좋습니다. 점심 특선메뉴는 적당한 가격에 배불리 먹을 수 있으며 또한
        공기밥이 무한리필입니다.
      </p>
    ),
  },
  {
    id: "tomukun_noodle_bar",
    title: "Tomukun Noodle Bar",
    desc: (
      <p>
        대표 메뉴로는 쌀국수가 있으며 단일 메뉴 음식점과 다를 바 없을 정도로 타
        메뉴의 성공률이 낮은 편입니다. 하지만 쌀국수를 시키신다면 한국
        쌀국수집의 맛을 볼 수 있습니다.
      </p>
    ),
  },
  {
    id: "seoul_garden",
    title: "Seoul Garden",
    desc: (
      <p>
        센트럴 캠퍼스와 거리는 조금 있지만 맛있으며 고기를 구워 먹을 때 자주
        방문하는 식당입니다.
      </p>
    ),
  },
  {
    id: "the_seoul",
    title: "The Seoul",
    desc: (
      <p>
        센트럴 캠퍼스와 거리는 조금 있지만 맛있으며 고기를 구워 먹을 때 자주
        방문하는 식당입니다.
      </p>
    ),
  },
  {
    id: "hola_seoul",
    title: "Hola Seoul",
    desc: (
      <p>
        규모가 작은 식당이라 앉을 자리는 많이 없지만 가격도 높지 않고 팝콘치킨,
        벤토박스, 컵밥 등이 인기 메뉴입니다.
      </p>
    ),
  },
  {
    id: "mama_satto",
    title: "Mama Satto",
    desc: (
      <p>
        양이 다른 한식당보다 많습니다. 돈까스 시키면 얼굴만한 돈까스 두 덩이가
        나옵니다. 일식 위주(초밥, 롤, 우동, 라멘 등)로 판매합니다.
      </p>
    ),
  },
  {
    id: "rich_jc",
    title: "Rich JC",
    desc: <p>찌개류가 맛있으며 특별한 메뉴는 떡꼬치가 있습니다.</p>,
  },
  {
    id: "kangs_restaurant",
    title: "Kang's Restaurant",
    desc: <p>양도 꽤 많은편이며 가격도 나쁘지 않습니다.</p>,
  },
  {
    id: "noori_chicken",
    title: "Noori Chicken",
    desc: (
      <p>
        한국식 치킨을 팔고 소스도 종류가 많아서 취향대로 골라 먹을 수 있습니다.
        특히 런치 메뉴들이 있는데 가격도 합리적이고 양도 괜찮습니다.
      </p>
    ),
  },
];
const restaurantsAsianData = [
  {
    id: "no_thai",
    title: "No Thai!",
    desc: (
      <p>
        앤아버 한정 가성비 최고인 태국 음식점입니다. 노스 캠퍼스, 캐리 타운,
        센트럴 캠퍼스에 각각 분점이 있어 접근성도 좋습니다.
      </p>
    ),
  },
  {
    id: "kanbu",
    title: "Kanbu",
    desc: (
      <p>
        깐부에서만 파는 스시 브리토가 맛있습니다. 브리토 특성 상 많이 내용물이
        흘러 나올 수 밖에 없어서 관심 있는 이성과 단둘이 하는 식사라면 스시
        브리토는 지양하는 편이 좋습니다.
      </p>
    ),
  },
  {
    id: "evergreen",
    title: "Evergreen",
    desc: (
      <p>다운 타운에 위치한 중국 음식점으로 맛있는 마라 치킨이 있습니다.</p>
    ),
  },
  {
    id: "asian_legend",
    title: "Asian Legend",
    desc: (
      <p>
        가성비가 좋은 중국 음식점입니다. Diag 근처에 위치해 접근성도 좋습니다.
      </p>
    ),
  },
  {
    id: "slurping_turtle",
    title: "Slurping Turtle",
    desc: (
      <p>
        일본식 라멘이 주력 메뉴입니다. 웨이팅이 길어 바쁜 시간 대에 가면 1시간은
        기본으로 기다려야 합니다.
      </p>
    ),
  },
];
const restaurantsHamburgerPizzaData = [
  {
    id: "joes_pizza",
    title: "Joe's Pizza",
    desc: (
      <p>
        뉴욕의 명물 피자로 스파이더맨이 배달하던 피자입니다. 한 조각에 4-5불로
        가격이 조금 나가긴 하지만 가끔 먹고 싶은 생각이 드는 피자입니다.
      </p>
    ),
  },
  {
    id: "nypd",
    title: "NYPD",
    desc: <p>평일 5pm 전에 Snackpass 로 주문하면 25% 됩니다.</p>,
  },
  {
    id: "frita_batidos",
    title: "Frita Batidos",
    desc: (
      <p>
        다운타운에 위치한 쿠바 스타일 햄버거 및 스트리트 푸드를 드셔 보실 수
        있습니다. 감자튀김과 계란 후라이가 들어간 햄버거 (Frita)가 과연 얼마나
        맛있을지 의문을 품을 수 있지만 육즙을 품은 고기 패티와 환상의 조합을
        자랑합니다. 쿠바 전통 밀크 셰이크 (Batidos) 도 추천합니다!
      </p>
    ),
  },
  {
    id: "hop_cat",
    title: "Hop Cat",
    desc: (
      <p>
        햄버거 맛집으로 한 입에 다 들어가지 않는 사이즈의 버거들이 있습니다.
        또한 양념이 많이 된 감자튀김도 매력적입니다.
      </p>
    ),
  },
];
const restaurantsDessertsData = [
  {
    id: "blank_slate",
    title: "Blank Slate",
    desc: (
      <p>
        대표적인 아이스크림 맛집으로 캐리타운에 위치하고 있습니다. 다양하고
        한국인들에게 생소한 메뉴들이 많아 사전조사 없이 가면 맛을 고르는데
        상당한 시간이 걸립니다.
      </p>
    ),
  },
  {
    id: "milk_and_froth",
    title: "Milk and Froth",
    desc: (
      <p>
        Blank Slate 못지 않게 맛있는 아이스크림 집입니다. 메뉴가 한정적이지만
        맛이 중독성이 있어 한번가면 되돌아 올 수 없습니다. 흑임자 그리고
        얼그레이 맛 아이스크림도 있습니다.
      </p>
    ),
  },
  {
    id: "comet_coffee",
    title: "Comet Coffee",
    desc: (
      <p>
        Nichels Arcade에 위치한 커피 맛집입니다. 다양한 메뉴를 즐길 순 없지만
        날씨가 좋을 때 Arcade에 비치된 의자에 앉아 커피를 마시며 낭만을 즐길 수
        있습니다.
      </p>
    ),
  },
  {
    id: "sweeting",
    title: "Sweeting",
    desc: (
      <p>
        버블티, 마라탕 등 중국 디저트들을 파는 가게입니다. 캠퍼스 내 마라 요리를
        파는 가게 중 한국의 마라탕과 가장 비슷한 맛을 느낄 수 있는 곳입니다.
      </p>
    ),
  },
];
const restaurantsFineDiningData = [
  {
    id: "aventura",
    title: "Aventura",
    desc: (
      <p>
        고급 스페인 레스토랑으로 분위기가 좋으며, 다양한 종류의 타파스와
        빠에야를 메인으로 합니다. 가격대는 높지만 중요한 약속이 있을 때 방문하기
        좋은 식당입니다. 디저트류에 포함되는 츄러스가 정말 맛있습니다.
      </p>
    ),
  },
  {
    id: "mani_osteria_bar",
    title: "Mani Osteria Bar",
    desc: (
      <p>
        이탈리안 음식점으로 다양하고 색다른 피자 & 파스타를 맛볼 수 있습니다.
      </p>
    ),
  },
  {
    id: "savas",
    title: "Sava's",
    desc: (
      <p>
        가장 번화가인 State St. 삼거리에 위치하고 있으며 고급진 분위기에서
        다양한 나라의 음식을 맛볼 수 있습니다. 다만 가성비면에서는 조금 떨어지긴
        합니다.
      </p>
    ),
  },
  {
    id: "pacific_rim_by_kana",
    title: "Pacific Rim by Kana",
    desc: (
      <p>
        본래 한국 음식점이었지만 현재는 현대식 Pan-Asian 음식을 제공하는
        음식점입니다.
      </p>
    ),
  },
];
const restaurantsOthersData = [
  {
    id: "zingermans_delicatessen",
    title: "Zingerman's Delicatessen",
    desc: (
      <p>
        샌드위치 및 델리 집이며 산처럼 쌓인 햄 샌드위치가 주력 메뉴입니다.
        미국식 음식을 드셔보고 싶다면 한 번 정도는 가볼 만한 곳입니다.
      </p>
    ),
  },
  {
    id: "culantro",
    title: "Culantro",
    desc: <p>페루 음식점입니다.</p>,
  },
];
// -------------------------------------------------------

export {
  campusCentralData,
  campusNorthData,
  housingOnCampusData,
  housingOffCampusData,
  travelAnnArborData,
  travelDetroitData,
  travelNearbyData,
  sportsFacilityData,
  sportsMiscSportsData,
  restaurantsKoreanMarketData,
  restaurantsKoreanData,
  restaurantsAsianData,
  restaurantsHamburgerPizzaData,
  restaurantsDessertsData,
  restaurantsFineDiningData,
  restaurantsOthersData,
};
