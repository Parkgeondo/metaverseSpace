const fishinfo = [
    {
      name: "에이피알",
      info: "<b>직무국내</b><br>콘텐츠 크리에이터 [필수자격]<br>-학사 졸업 및 졸업예정자<br>-영상 편집 툴 사용 가능하신 분<br>(포토샵,일러스트,에프터 이펙트,프리미어 등)<br>-마케팅 콘텐츠 기획 및 제작에 관심이 있으신 분",
      thumb: "fish0",
    },
    {
      name: "KCC 실리콘",
      info: "<b>생산기술</b><br>실리콘 생산관리 [필수자격]<br>-화학,화학공학,고분자공학 등 화학계열 전공 학사학위 이상 졸업자<br>-TOEIC Speaking 6등급(130점) 이상<br>(OPIc의 경우 IM 이상)또는 TOEIC 830점 이상 유효성적 보유자<br>전학기 평균 학점 3.0 이상자(4.5점 만점 기준)<br>[우대사항]<br>-영어회화 가능자",
      thumb: "fish1",
    },
    {
      name: "현대오토에버",
      info: "<b>생산기술</b><br>차량 전장 SW 개발 [필수자격]<br>-모집분야 관련 직무수행경력 2년 이상 보유한 분<br>-해외여행에 결격사유가 없는 분(남성의 경우 병역필 또는 면제)",
      thumb: "fish2",
    },
    {
      name: "인바디",
      info: "<b>소프트웨어개발</b><br>어플리케이션 개발[필수자격]<br>-학사 이상, 기 졸업자 및 졸업예정자<br>-java, Objective-C, C#, Python 가능",
      thumb: "fish3",
    },
    {
      name: "한국바스프",
      info: "<b>GROW Engineer</b><br>화공 엔지니어[필수자격]<br>4년제 대학 졸업(예정)자<br>(학사/석사/박사)<br>-전공무관<br>-영어 커뮤니케이션 가능자<br>-2023년 1월 입사 가능자",
      thumb: "fish4",
    },
    {
      name: "플래티어",
      info: "<b>ECS 사업 부문</b><br>이커머스 플랫폼 개발 대기업 및 중견기업의 인터넷쇼핑몰 Front-end 및 Back-end 구축 및 개발운영[필수자격]<br>-관련 전공, 관련 교육 수강 이력 보유<br>데이터 베이스에 대한 이해, SQL 프로그래밍 가능자",
      thumb: "fish5",
    }
  ];
  
  function closeModal() {
    $('.modalcontainer').addClass("hidden");
  }
  
  function openModal(index) {
    $('.modalcontainer').removeClass("hidden");
  
    const fishname = document.querySelector(".name");
    const fishdetail = document.querySelector(".fishdetail");
    const fishthumb = document.querySelector(".fishthumb");
  
    fishname.innerHTML = fishinfo[index].name;
  
    fishdetail.innerHTML = fishinfo[index].info;
  
    fishthumb.style.backgroundImage = `url(./image/${fishinfo[index].thumb}.png)`;
  
    const add = document.querySelector(".add");
  
    // let a = index;
  }

  $('.close').click((function(){
    closeModal();
  }));

  console.log('??')

  AFRAME.registerComponent('change', {
    updateSchema: function() {
      this.el.addEventListener('click', function (evt) {
        let num = evt.detail.intersection.object.el.getAttribute('data-index')
        openModal(num);
        
        for (let i in clientsData) {
        let clientId = socket.id;
          if(clientId === i){
            totalData[i].eventdata[num]=true;
          }
        }
      });
    }
  });