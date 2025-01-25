// YANG INI GAK DIPAKAI KARENA LEBIH BERAT (KOMPUTASI)

let animationSpeed = 0.04; // Kecepatan gerak layer terdepan
let animationSpeedOther = 0.3; // Kecepatan gerak layer belakang

const container = document.getElementById("container-follow-mouse");
const children = Array.from(container.children);

let lastMousex = 0;
let lastMousey = 0;

// console.log(children);

document.addEventListener("mousemove", function (mouse) {
  lastMousex = mouse.x;
  lastMousey = mouse.y;
  // console.log(lastMousex);
  // console.log(lastMousey);
});

// Parse Float, return 0 kalau NaN
function ToFloat(param) {
  let toReturn;
  toReturn = parseFloat(param,);
  toReturn = isNaN(toReturn) ? 0 : toReturn;
  return toReturn
}

// Kode yang akan dijalankan setiap frame
requestAnimationFrame(EachFrameLoop);

function EachFrameLoop() {
  requestAnimationFrame(function () {
    let childBefore; // Elemen anak terakhir yang udah kepakai disimpan sementar disini
    for (let i = children.length; i > 0; i--) {
      let child = Array.from(children)[i - 1];

      let posisix = ToFloat(child.style.left);
      let posisiy = ToFloat(child.style.top);

      let childBeforeDefined = (childBefore !== undefined);
      let referencex = (childBeforeDefined) ? ToFloat(childBefore.style.left) : lastMousex ;
      let referencey = (childBeforeDefined) ? ToFloat(childBefore.style.top) : lastMousey;
      let speed = (childBeforeDefined) ? animationSpeedOther : animationSpeed;

      let selisihx = posisix - referencex;
      let selisihy = posisiy - referencey;

      child.style.left = posisix - selisihx * speed + "px";
      child.style.top = posisiy - selisihy * speed + "px";

      childBefore = child;
    }
  });

  requestAnimationFrame(EachFrameLoop);
}
