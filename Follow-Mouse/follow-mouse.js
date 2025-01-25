let animationSpeed = 0.04; // Kecepatan gerak layer terdepan
let animationSpeedOther = 0.5; // Kecepatan gerak layer belakang

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
function getOffset(element, direc) {
  let data = (direc == 0) ?
  element.getAttribute('data-offset-x') : 
  element.getAttribute('data-offset-y');
  return (data !== null) ? data : 0;
}

// Kode yang akan dijalankan setiap frame
requestAnimationFrame(EachFrameLoop);

function EachFrameLoop() {
  requestAnimationFrame(function () {
    let childBefore; // Elemen anak terakhir yang udah kepakai disimpan sementara disini
    for (let i = children.length; i > 0; i--) {
      let child = Array.from(children)[i - 1];

      // Menentukan arah dan kecepatan gerak
      let childBeforeDefined = (childBefore !== undefined);
      let referencex = (childBeforeDefined) ? getOffset(childBefore, 0) : lastMousex;
      let referencey = (childBeforeDefined) ? getOffset(childBefore, 1) : lastMousey;
      let speed = (childBeforeDefined) ? animationSpeedOther : animationSpeed;
      
      // Dapatkan selisih antara posisi elemen dengan mouse
      let posisix = getOffset(child, 0);
      let posisiy = getOffset(child, 1);
      let selisihx = posisix - referencex;
      let selisihy = posisiy - referencey;

      let posx = posisix - selisihx * speed;
      let posy = posisiy - selisihy * speed;

      // Gerakkan
      child.style.transform = `translate(calc(-50% + ${posx + "px"}), calc(-50% + ${posy + "px"}))`;

      // Reparasi dan persiapan berikutnya
      child.setAttribute('data-offset-x', posx);
      child.setAttribute('data-offset-y', posy);
      childBefore = child;
    }
  });

  requestAnimationFrame(EachFrameLoop);
}
