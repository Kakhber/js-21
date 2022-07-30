const socket = new WebSocket("ws://ucha.ge:8083");
let isSocketConnected = false;
socket.addEventListener("open", function (event) {
  isSocketConnected = true;
});
socket.onmessage = function (data) {
  console.log(data);
};
let tdTable = document.querySelectorAll("td");
socket.addEventListener("message", function (event) {
  let colodId = JSON.parse(event.data);
  tdTable[colodId.id].style.backgroundColor = colodId.color;
});
const color = [
    "aqua",
    "brown",
    "blueviolet",
    "goldenrod",
    "indigo",
    "red",
    "tomato;",
    "yellow",
    "maroon",
    "chartreuse",
];
let getRandomColor = function () {
  let randomNum = Math.random() * 9;
  let backRandomNum = Math.floor(randomNum);
  return color[backRandomNum];
};

for (let index = 0; index < tdTable.length; index++) {
  const element = tdTable[index];
  const myColor = getRandomColor();

  element.addEventListener("click", () => {
    element.style.backgroundColor = myColor;
    let objcetToSend = {
      id: index,
      color: myColor,
    };
    if (isSocketConnected) {
      socket.send(JSON.stringify(objcetToSend));
    } else {
      console.log("error");
    }
  });
}