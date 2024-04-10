const firebaseConfig = {
  apiKey: "AIzaSyA-He_nduKwzu_yJF9IVYTEA51INsxhAdk",
  authDomain: "metaverseanalysis-2ef87.firebaseapp.com",
  projectId: "metaverseanalysis-2ef87",
  storageBucket: "metaverseanalysis-2ef87.appspot.com",
  messagingSenderId: "195438809768",
  appId: "1:195438809768:web:a057b48737f08b6153689d",
};  

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

// db.collection('post').get().then(function(qs){qs.forEach(function(doc){
//     tempData.push(doc.data())
  // console.log(tempData)
// })})

let totalData = {};
let clientsData = {};

// 시작시간
let startTime = null;
// 끝나는 시간
let endTime = null;


// 공간 탐색 비율 구하기
let space = null;
function spaceQuestTracking(data){
  const xValues = data.positiondata.map(item => item.x);
  const zValues = data.positiondata.map(item => item.z);
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const minZ = Math.min(...zValues);
  const maxZ = Math.max(...zValues);

  const result_1 = (((maxX - minX)*(maxZ - minZ))/19635)*100;
  const result_2 = Math.round(result_1 * 10) / 10
  console.log(minX,maxX,minZ,maxZ,result_2)
  return result_2
}

let counter = 0;

function startTracking() {
intervalId = setInterval(function () {
  console.log(totalData)
  for (let i in clientsData) {
    totalData[i].positiondata.push(clientsData[i].position)
    totalData[i].rotationdata.push(clientsData[i].rotation)
    //시간을 체크할 수 있는 걸로
  }
}, 500);
}

socket.on("server-to-client", function (result) {
  clientsData[result.id] = result;
});


//트레킹을 시작하거나 끝낼때 누르는 버튼
let start_server = document.querySelector(".start_onlyServer");
let end_server = document.querySelector(".end_onlyServer");

start_server.addEventListener("click", () => {
  alert("모든 유저 데이터 측정을 시작합니다.");
  for (let i in clientsData) {
    totalData[i] = {
      id: i,
      positiondata: [],
      rotationdata: [],
      timedata: null,
      spacedata: null,
      eventdata: {
        0:false,
        1:false,
        2:false,
        3:false,
        4:false,
        5:false,
      }
    };
  }
  startTime = new Date();
  startTracking();
});



end_server.addEventListener("click", () => {
  endTime = new Date();
  const time = (endTime - startTime)/1000;
  for (let i in clientsData) {
    totalData[i].timedata = time;
    totalData[i].spacedata = spaceQuestTracking(totalData[i]);
  }
  alert("모든 유저 데이터 측정을 종료합니다.");

  db.collection('post').doc('Test').set(
    totalData
  )
});