{
  const containers = Array.from(document.getElementsByClassName("container-follow-mouse"));

  // Atur container dan anakan langsungnya jadi Position:Absolut
  containers.forEach((container) => {
    container.style.position = "absolute";
    Array.from(container.children).forEach((child) => {
      child.style.position = "absolute";
    })
  });

  let lastMousex = 0;
  let lastMousey = 0;

  // console.log(children);

  document.addEventListener("mousemove", function (mouse) {
    lastMousex = mouse.x;
    lastMousey = mouse.y;
    // console.log(lastMousex); console.log(lastMousey);
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
      containers.forEach((container) => {

        const children = Array.from(container.children);

        let childBefore; // Elemen anak terakhir yang sudah terpakai akan disimpan sementara disini

        // Ambil informasi kecepatan yang ada di elemen induk
        let defmotionSpd = (container.getAttribute('data-flwmouse-defspeed') !== null) ?
          container.getAttribute('data-flwmouse-defspeed') : 0;
        let motionSpd = (container.getAttribute('data-flwmouse-speed') !== null) ?
          container.getAttribute('data-flwmouse-speed') : 0;

        for (let i = children.length; i > 0; i--) {
          let child = Array.from(children)[i - 1];

          // // Mengambil kecepatan dari data yang disimpan di atribut
          // const motionSpd = child

          // Menentukan arah dan kecepatan gerak
          let childBeforeDefined = (childBefore !== undefined);
          let referencex = (childBeforeDefined) ? getOffset(childBefore, 0) : lastMousex;
          let referencey = (childBeforeDefined) ? getOffset(childBefore, 1) : lastMousey;
          let speed = (childBeforeDefined) ? motionSpd : defmotionSpd;

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
    });

    // Jalankan function ini lagi di frame berikutnya
    requestAnimationFrame(EachFrameLoop);
  }
}