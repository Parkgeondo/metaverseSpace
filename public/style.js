let box2 = document.querySelector("#box2");
let npc = document.querySelector("#npc");
let float = document.querySelector(".float");
let compass = document.querySelector("#compass");
let logo3D = document.querySelector("#logo3D");
let image = document.querySelector("#image");
let image2 = document.querySelector("#image2");
let ent = false;
let mainimg = document.querySelector("#image3");
let btn1 = document.querySelector("#btn1");
let btn2 = document.querySelector("#btn2");
let map = document.querySelector("#map");
let cha = document.querySelector(".cha");
let miniMap = document.querySelector(".miniMap");

let intersection;
let clickPoint;

AFRAME.registerComponent("cursor-listener", {
  init: function () {
    this.el.addEventListener("raycaster-intersected", (evt) => {
      this.raycaster = evt.detail.el;

      this.el.addEventListener("click", (evt) => {
        clickPoint = $(
          `<a-box color="tomato" opacity="0.1" depth="0.4" height="0.4" width="0.4" position="${intersection.point.x} ${intersection.point.y} ${intersection.point.z}"></a-box>`
        );
        $("#positionMap").append(clickPoint);
      });
    });

    this.el.addEventListener("raycaster-intersected-cleared", (evt) => {
      this.raycaster = null;
    });
  },
  tick: function () {
    if (!this.raycaster) {
      return;
    }
    intersection = this.raycaster.components.raycaster.getIntersection(this.el);
    if (!intersection) {
      return;
    }
  },
});


function FPP() {
  let cmloc = camera.object3D.position;

  cmloc.x = 0;
  cmloc.y = 2;
  cmloc.z = 0;

  mainimg.setAttribute("opacity", 1);
  btn1.setAttribute("opacity", 1);
  btn2.setAttribute("opacity", 1);
}
function TPP() {
  let cmloc = camera.object3D.position;
  btn1.setAttribute("opacity", 0);
  btn2.setAttribute("opacity", 0);
  mainimg.setAttribute("opacity", 0);
  cmloc.x = 0;
  cmloc.y = 2;
  cmloc.z = 8;
}

//캐릭터의 위치를 저장하는 함수를 담는 인터벌 함수
let positionInterval;

//전체 캐릭터의 위치를 담는 배열
let position = [];
let rotation = [];

//임시로 캐릭터의 위치를 받는 함수 나중에 배열에 하나씩 저장
let locationarray;
let rotationarray;

function positionTracking() {
  positionInterval = setInterval(function () {
    locationarray = rig.getAttribute("position");
    rotationarray = rig.getAttribute("rotation");
    rotationarray = [rotationarray.x, rotationarray.y, rotationarray.z];

    position.push(...locationarray);
    rotation.push(...rotationarray);


  }, 500);
}

//트레킹을 시작하거나 끝낼때 누르는 버튼
let start = document.querySelector(".start");
let end = document.querySelector(".end");

start.addEventListener("click", () => {
  positionTracking();

  alert("위치를 추척하겠습니다.");
});

end.addEventListener("click", () => {
  clearInterval(positionInterval);
  XYZarray();
});

let R = 0;
let intervalId = null;

function startCounting() {
  intervalId = setInterval(function () {
    R++;
  }, 1000);
}

function stopCounting() {
  clearInterval(intervalId);
  R = 0;
}

// // distance가 10 이하일 때 counting 시작
// if (d <= 10) {
//   startCounting();
// }else{
//   stopCounting()
// }

//위치값을 받아온 배열들을 XYZ의 객체로 저장
let locX = [];
let locY = [];
let locZ = [];
let rotX = [];
let rotY = [];
let rotZ = [];
let radius = 0.5;

function XYZarray() {
  //위치
  for (let i = 0; i < position.length; i++) {
    switch (i % 3) {
      case 0:
        locX.push(position[i]);
        break;
      case 1:
        locY.push(position[i]);
        break;
      case 2:
        locZ.push(position[i]);
        break;
    }
  }
  // 각도
  for (let i = 0; i < rotation.length; i++) {
    switch (i % 3) {
      case 0:
        rotX.push(rotation[i]);
        break;
      case 1:
        rotY.push(rotation[i]);
        break;
      case 2:
        rotZ.push(rotation[i]);
        break;
    }
  }

  let locationdata = [];
  let rotationdata = [];

  let radius = 0.5;
  for (let i = 0; i < parseInt(position.length / 3); i++) {
    let locdata;
    if (locX[i] !== undefined) {
      locdata = {
        X: `${locX[i]}`,
        Y: `${locY[i]}`,
        Z: `${locZ[i]}`,
      };

      locationdata.push(locdata);
    }

    if (i != 0) {
      const a = new THREE.Vector3(
        locationdata[i - 1].X,
        locationdata[i - 1].Y,
        locationdata[i - 1].Z
      );
      const b = new THREE.Vector3(
        locationdata[i].X,
        locationdata[i].Y,
        locationdata[i].Z
      );
      const d = a.distanceTo(b).toFixed(1);

      if (d < 0.5) {
        radius = radius + 0.25;
        if (radius > 5.0) {
          radius = 5;
        }
      } else {
        radius = 0.5;
      }
    }

    let route;
    let route2;
    if (i != 0) {
      route = $(
        `<a-entity line="start: ${locationdata[i - 1].X} ${
          locationdata[i - 1].Y
        } ${locationdata[i - 1].Z}; end: ${locationdata[i].X} ${
          locationdata[i].Y
        } ${locationdata[i].Z}; color: red"></a-entity>`
      );
      // route2 = $(`<a-box color="tomato" depth="0.4" height="0.4" width="0.4" position="${first[i-1].X} ${first[i-1].Y} ${first[i-1].Z}"></a-box>`)
      // route2 = $(`<a-circle src="#platform" position="${first[i-1].X} ${first[i-1].Y} ${first[i-1].Z} radius="40" rotation="-90 0 0"></a-circle>`)
      route2 = $(
        `<a-circle position="${locationdata[i - 1].X} ${
          locationdata[i - 1].Y
        } ${
          locationdata[i - 1].Z
        }" radius="${radius}" rotation="-90 0 0" material="color: red; transparent: true; opacity: 0.5" ></a-circle>`
      );
    }

    $("#positionMap").append(route, route2);
  }

  // 각도 계산 어레이로 넣기
  for (let i = 0; i < parseInt(rotation.length / 3); i++) {
    let rotdata;
    if (rotX[i] !== undefined) {
      rotdata = {
        X: `${rotX[i]}`,
        Y: `${rotY[i]}`,
        Z: `${rotZ[i]}`,
      };
    }

    rotationdata.push(rotdata);
  }


  let data = JSON.stringify({ locationdata, rotationdata });
  download(data, "data.json", "text/plain");
}


let objs = [];
let obj = {};



let points = 0;
let curve = 0;
var camPosIndex = 0;

const load = [];
let time = Date.now();
let deltaTime = 0;
AFRAME.registerComponent("checkinteraction", {
  tick: function () {
    const newTime = Date.now();
    deltaTime = newTime - time;
  },
  updateSchema: function () {
    this.el.addEventListener("click", function (evt) {
      let clickObject = {
        object: evt.detail.intersection.object.el,
        time: deltaTime,
      };
      load.push(clickObject);
    });
  },
});

function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

function read(event) {
  event.preventDefault();
  let file = document.getElementById("input_file").files[0];


  let fr = new FileReader();

  fr.readAsText(file, "utf-8");

  fr.onload = function (e) {
    json = JSON.parse(e.target.result);
    let radius = 2;
    for (let i = 0; i < json.length; i++) {
      if (i != 0) {
        const a = new THREE.Vector3(
          json[i - 1].X,
          json[i - 1].Y,
          json[i - 1].Z
        );
        const b = new THREE.Vector3(json[i].X, json[i].Y, json[i].Z);
        const d = a.distanceTo(b).toFixed(1);


        if (d < 0.5) {
          radius = radius + 1;
          if (radius > 15.0) {
            radius = 5;
          }
        } else {
          radius = 0.5;
        }
      }

      let line;
      let circle;

      if (i != 0) {
        line = $(
          `<a-entity line="start: ${json[i - 1].X} ${json[i - 1].Y} ${
            json[i - 1].Z
          }; end: ${json[i].X} ${json[i].Y} ${
            json[i].Z
          }; color: red"></a-entity>`
        );
        circle = $(
          `<a-circle position="${json[i - 1].X} ${json[i - 1].Y} ${
            json[i - 1].Z
          }" radius="${radius}" rotation="-90 0 0" material="color: red; transparent: true; opacity: 0.5" ></a-circle>`
        );
      }
      $("#positionMap").append(line, circle);
    }
  };
}

let ReadX = [];
let ReadY = [];
let ReadZ = [];
