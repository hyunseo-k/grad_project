import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Test.css';
import { set } from 'react-hook-form';

const results = {
  'ISTJ': {
    title: '경제학 문제 풀이가 한창인 경제관',
    info: '책임감이 강하며, 현실적이다. 매사에 철저하고 보수적이다.',
    info2: '매사에 철저한 당신, 오늘도 밀리지 않고 경제학 과제를 하기 위해 경제관으로 향하는데 조용한 경제관에는 계산 문제를 푸는 계산기 소리만 타다닥타다닥..',
  },
  'ISFJ': {
    title: '나만 안 밟으려 노력하는 것 같은 600주년 기념관 앞 교표',
    info: '차분하고 헌신적이며, 인내심이 강하다. 타인의 감정변화에 주의를 기울인다.',
    info2: '600주년 기념관 앞을 지나다 교표를 발견한 당신! “교표를 밟지 마세요”를 보고도 아무렇지 않게 지나는 사람들도 있지만 호기심보다 인내심이 강한 당신은 항상 차분히 돌아가는 길을 택하네요!',
  },
  'INFJ': {
    title: 'English only zone이지만 한국말이 자꾸 들리는 국제관 지하 2층',
    info: '높은 통찰력으로 사람들에게 영감을 준다. 공동체의 이익을 중요시한다.',
    info2: '친구를 만나러 국제관 지하 2층에 온 당신, English only zone이라고 여기저기 적혀 있지만 아무리 생각해도 이 답답한 규칙은 모두에게 도움이 안 돼! 그러지 말고 이제부터 Korean also okay zone으로 하는 건 어때?',
  },  
  'INTJ': {
    title: '매번 출구를 찾아 헤매다 다른 곳으로 나오는 벤젠고리관',
    info: '의지가 강하고, 독립적이다. 분석력이 뛰어나다.',
    info2: '분석력이 뛰어난 당신! 생명공학관으로 들어가 기초학문관, 제2과학관을 거쳐 제1과학관으로 나오는 벤젠고리관 미로에 꾸준히 도전하지만 항상 험난할 뿐..',
  },
  'ISTP' : {
    title: '뭘 만드는지는 모르지만 뭐가 항상 만들어지는 산학관 러닝팩토리',
    info: '과묵하고 분석적이며, 적응력이 강하다.',
    info2: '아이디어가 샘솟는 사람들이 모인 러닝팩토리에선 지금도 3D 프린터가 무언가를 찍어내고 있답니다. 어 저기 3D 프린터 옆 당신은 오늘도 묵묵히 설계도를 확인하고 있네요!',
  },
  'ISFP' : {
    title: '정신없이 졸업 작품을 정리하는 수선관 로비',
    info: '온화하고 겸손하다. 삶의 여유를 만끽한다.',
    info2: '여유로운 삶을 살고 싶은 당신, 하지만 예술의 길은 멀고도 험해서 그 자체만으로도 벅찬데 자꾸만 수선관 로비에 정리되지 않은 졸작들까지 나를 붙잡는다…',
  },
  'INFP' : {
    title: '야경 감성에 젖어 시간 가는 줄 모르는 법학관 옥상',
    info: '성실하고 이해심 많으며, 개방적이다. 잘 표현하지 않으나, 내적 신념이 강하다.',
    info2: '오늘 하루도 고생했다! 법학관 옥상에서 예쁜 야경을 보다보니 하루의 피로가 위로받는 느낌.. 나는 나를 믿어 오늘 하루도 고생했고, 내일도 화이팅이야!!',
  },
  'INTP' : {
    title: '축제 날도 연구하다 멀리서 싸이 공연을 내려다 보는 N센터 4층 발코니',
    info: '지적 호기심이 높으며, 잠재력과 가능성을 중요시한다.',
    info2: '오늘도 연구실에서 야근 중인데 저 멀리서 들리는 노래 소리에 나가보니 오늘이 축제날이구나. 싸이가 뒷건물 4층 뛰어! 라길래 나도 모르게 소리 지르며 즐겨 버렸다',
  },
  'ESTP' : {
    title: '남들이 뭐라하든 애인 손잡고 가는 씨씨동산',
    info: '느긋하고, 관용적이며, 타협을 잘한다. 현실적 문제 해결에 능숙하다.',
    info2: '뭐 씨씨동산에 가면 헤어진다 어쩐다 말들 많지만 무슨 일 나겠어? 난 지금 내 애인이랑 산책하고 싶은데 우리 둘은 특별하니까 괜찮을거야! 자기야 얼른 산책 가자~~',
  },
  'ESFP': {
    title: '동아리 경연이 뜨겁게 펼쳐지는 복지회관 앞 야외광장',
    info: '호기심이 많으며, 개방적이다. 구체적인 사실을 중시한다.',
    info2: '열심히 준비한 동아리 공연 직전, 당신은 지금 복지회관 앞 야외광장 무대에 등장하기 직전이네요! 많이 떨리지만 얼른 나가서 내 멋진 모습을 보여주고 싶은 당신의 무대가 기대되네요!',
  },
  'ENFP' : {
    title: '파란 하늘에 축제 부스가 열리는 금잔디 광장',
    info: '상상력이 풍부하고, 순발력이 뛰어나다. 일상적인 활동에 지루함을 느낀다.',
    info2: '오늘은 신나는 축제날! 축제 부스가 펼쳐진 금잔디 광장에 가서 여기저기 구경도 하고 새로운 친구도 사귀고 파란 하늘 아래 누워 노랫 소리를 들으니 이런 행복이 없다~',
  },
  'ENTP' : {
    title: '스피치와토론 수업이 한창인 기초학문관 3층',
    info: '박학다식하고, 독창적이다. 끊임없이 새로운 시도를 한다.',
    info2: '오늘은 스피치와토론 수업 최종 토론이 있는 날! 당신은 결연한 마음으로 기초학문관 3층으로 향합니다. 열심히 준비한 자료와 당신의 박학다식함으로 토론에서 좋은 결과가 있으면 좋겠네요!',
  },
  'ESTJ' : {
    title: '아샷추 주문 100개가 척척 진행되는 수선관 별관 레브',
    info: '체계적으로 일하고, 규칙을 준수한다. 사실적 목표 설정에 능하다.',
    info2: '수선관 레브에서 알바를 하게된 당신, 오늘도 아샷추 주문이 쏟아지지만 문제 없다! 나의 일머리와 알바 분들과의 체계적인 협업이 시너지를 낸다면 아샷추 100잔 정도는 거뜬하다!',
  },
  'ESFJ' : {
    title: '시끌벅적 짜막이 한창인 디도 앞 잔디밭',
    info: '사람에 대한 관심이 많다. 친절하다. 동정심이 많다.',
    info2: '오늘은 과 동기들과 디도 앞 잔디밭에서 짜막 하기로 한 날! 대학 시절 로망이었던 짜막을 친한 친구들과 하는 것도 너무 좋고 새로운 친구들 사귀는 것도 너무 좋다~~',
  },
  'ENFJ'  : {
    title: '청랑의 상소문 소리가 들리는 것 같은 명륜당 앞',
    info: '사교적이고, 타인의 의견을 존중한다. 비판을 받으면 예민하게 반응한다.',
    info2: '명륜당 앞을 지나는 당신, 성균관 유생들의 상소문 소리가 들리는 것만 같다. 나도 정의를 찾아 목소리를 내는 사람이 되고 싶은데 올해 고하노라는 내가 간다!! 기다려!!',
  },
  'ENTJ'  : {
    title: '전전 소프트 복전하며 시간표가 전공수업으로 터져 나가는 제2공학관',
    info: '철저한 준비를 하며, 활동적이다. 통솔력이 있으며, 단호하다.',
    info2: '이번 학기는 전전 소프트 복전 첫학기, 전공 수업이 넘쳐나 시간표가 정신 없지만 나에게 문제란 없다. 이럴 줄 알고 수업들을 전부 제2공학관으로 잡아두었지 후후 중간중간 지하 킹고라운지에 가서 자습까지 한다면 완벽하다!',
  },
};

function ProgressBar({ current, total }) {
  const filledWidth = (current / total) * 100;
  return (
    <div style={{ width: '100%', height: '20px', backgroundColor: '#EEF0E5' }}>
      <div style={{ width: `${filledWidth}%`, height: '100%', backgroundColor: '#304D30' }} />
    </div>
  );
}

function Quiz({ question, options, image, onAnswer }) {
  return (
    <div style={{ fontFamily: 'DOSGothic', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{
        color: '#FFF',
        WebkitTextStrokeWidth: 1,
        WebkitTextStrokeColor: 'rgba(255, 255, 255, 0.30)',
        fontSize: '33px',
        fontWeight: 200,
        marginTop: '80px',
      }}>{question}</h2>
      <div style={{
        width: '250px', 
        height: '250px', 
        flexShrink: 0,
        background: `url(${image}) no-repeat center / cover`,
        marginBottom: '40px',
      }} />
      {options.map((option, index) => (
        <button key={index} onClick={() => onAnswer(index)} style={{
          fontFamily: "DOSGothic",
          fontSize: "25px",
          background: "",
          border: '1px solid',
          marginTop: index !== 0 ? '20px' : '0', 
          padding: '20px',
          cursor: 'pointer',
        }}>{option}</button>
      ))}
    </div>
  );
}

function calculateMBTI(answers) {
  let mbti = '';
  const factors = ['I', 'S', 'F', 'P'];
  const otherFactors = ['E', 'N', 'T', 'J'];

  for (let i = 0; i < 4; i++) {
    const start = i * 3;
    const end = start + 3;
    const selectedOptions = answers.slice(start, end);
    // console.log(selectedOptions)
    const count = selectedOptions.filter(answer => answer == 0).length;
    // console.log(count)
    mbti += count > 1 ? factors[i] : otherFactors[i];
  }

  return mbti;
}

function Test2() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [mbti, setMbti] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const questions = [
    {
      question: '기숙사 신청날이 다가왔다',
      options: ['1인실 쓸래', '친구 만들어야지! 2인실 신청하자'],
      image: '/img/0.png',
    },
    {
      question: '알촌 갈래? 룸메이트가 말을 건다.',
      options: ['아니… 방에서 쉴래', '헐 너무 좋아!'],
      image: '/img/1.png',
    },
    {
      question: '룸메이트가 친구를 데려와 크게 웃고 떠든다. 이 때 드는 생각은?',
      options: ['좀 조용히 해줘…', '뭔데뭔데? 나도 같이 놀자!'],
      image: '/img/2.png',
    },
    {
      question: '기숙사 소방훈련 중이다.',
      options: ['졸려… 언제 끝나지', '불이 나면 내가  어떡해야 되지? 소화기를 들고 달려나가서 ~~'],
      image: '/img/3.png',
    },
    {
      question: '기숙사 엘리베이터를 타고 내려가는 중',
      options: ['수업 늦었는데 빨리 내려갔으면 좋겠다 ㅠㅠ', '갑자기 엘레베이터가 멈추면 어떡해야 되지?'],
      image: '/img/4.png',
    },
    {
      question: '힘든 하루를 마치고 온 그대에게 룸메가 “오늘 바빴어?” 라고 묻는다면',
      options: ['오늘 수업도 듣고 알바도 하고 동아리도 하고 밥약도 하고 진짜진짜 바빴어', '오늘 아침부터 진짜 바빠서 너무 힘들고 피곤했어 ㅠㅠ'],
      image: '/img/5.png',
    },
    {
      question: '룸메가 고민상담을 한다.',
      options: ['고민했을 룸메 생각에 맘이 아프다.', '고민을 해결할 방법 생각에 골치가 아프다.'],
      image: '/img/6.png',
    },
    {
      question: '룸메가 택배함에 택배를 가지러 간다고 한다.',
      options: ['같이 가자! 혼자 가면 외로워.', '무슨 택배야?'],
      image: '/img/7.png',
    },
    {
      question: '나 힘들게 알바해서 맥북 샀어',
      options: ['와… 진짜 힘들었겠다…', 'PRO야?'],
      image: '/img/8.png',
    },
    {
      question: '룸메이트가 밤 10시에 갑자기 "산책하러 갈래?"라고 제안한다.',
      options: ['와! 나도 갈래!', '지금 이 시간에? 좀 쉬자.'],
      image: '/img/9.png',
    },
    {
      question: '룸메와의 행궁동 나들이',
      options: ['수원화성 가고, 방화 수류정 가고 ,… ', '오 행궁동! 가깝겠지?'],
      image: '/img/10.png',
    },
    {
      question: '저녁 일곱시에 룸메와 방청소를 하기로 했는데 룸메가 안 온다.',
      options: ['왜 안 오지… 빨리 하고 과제해야 하는데', '오예! 그냥 눕자'],
      image: '/img/11.png',
    },
  ];

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    setCurrentQuestion(currentQuestion + 1);
    if (newAnswers.length === questions.length) {
      const mbti = calculateMBTI(newAnswers);
      setMbti(mbti);
      setResult(results[mbti]);
      setLoading(false);
      console.log(mbti); 
    }
  };

  return (
    <div style={{
      fontFamily: 'DOSGothic',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100vh',
      background: 'linear-gradient(180deg, #589458 1.4%, #304D30 39%, #163020 100%)'
    }}>
      <div style={{
      width: '80%', // Set width of inner div to 80%
      marginLeft: 'auto',
      marginRight: 'auto',
      }}>
        {loading ? <ProgressBar current={currentQuestion} total={questions.length} /> : null}
        {currentQuestion < questions.length ? (
          <Quiz
            question={questions[currentQuestion].question}
            options={questions[currentQuestion].options}
            image={questions[currentQuestion].image}
            onAnswer={handleAnswer}
          />
        ) : result ? ( 
            <div>
              <h1 style={{ color: 'white', fontWeight: 'bold', fontSize: 35, marginBottom: 80, }}>
                {result.title}
              </h1>
              <p style={{color: 'white', fontSize: 25, color: "#B6C4B6"}}>{result.info}</p>
              <p style={{color: 'white',  fontSize: 25, lineHeight: '42px'}}>{result.info2}</p>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button style={{ 
                  fontFamily: 'DOSGothic',
                  fontSize: '23px',
                  fontWeight: 'bold',
                  marginTop: '20px',
                  width: '300px',
                  height: '100%',
                  padding: 10,
                  flexShrink: 0,
                  borderRadius: '12px',
                  background: '#EEF0E5',
                  boxShadow: '#000000 0px 4px 4px',
                  cursor: 'pointer',
                }} onClick={() => navigate('/login')}>나에게 꼭 맞는<br />룸메이트 찾으러 가기</button>
              </div>
            </div>
          ) : (
            <div>Loading...</div> 
        )}
      </div>
    </div>
    
  );
}

export default Test2;