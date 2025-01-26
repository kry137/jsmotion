{
  const containers = Array.from(document.getElementsByClassName("container-follow-mouse"));

  // Pengaturan awal
  containers.forEach((container) => {
    // Ubah posisi parent menjadi absolute
    container.style.position = "absolute";
    Array.from(container.children).forEach((child) => {
      // Ubah posisi Anakan menjadi absolute
      child.style.position = "absolute";
      // Simpan posisi awal setiap anak
      const rect = child.getBoundingClientRect();
      child.setAttribute('data-flw-defposx', rect.x + window.scrollX)
      child.setAttribute('data-flw-defposy', rect.y + window.scrollY)
    })
  });

  // Nilai default untuk posisi mouse
  let lastMousex = 0;
  let lastMousey = 0;

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
        
        // Apakah harus mengikuti mouse atau element lain
        const isFollowOtherElement = container.hasAttribute('data-flwelement');
        const theOtherElement = isFollowOtherElement && document.getElementById(container.getAttribute('data-flwelement'));
        
        // Perintah untuk setiap elemen anak
        for (let i = children.length; i > 0; i--) {
          let child = Array.from(children)[i - 1];

          // Menentukan arah dan kecepatan gerak
          let childBeforeDefined = (childBefore !== undefined);
          let speed = (childBeforeDefined) ? motionSpd : defmotionSpd;
          let referencex, referencey;
          if (childBeforeDefined) {
            referencex = getOffset(childBefore, 0);
            referencey = getOffset(childBefore, 1);
          }
          else if (isFollowOtherElement){
            const targetRect = theOtherElement.getBoundingClientRect();
            referencex = targetRect.x + targetRect.width/2;
            referencey = targetRect.y + targetRect.height/2;
          }
          else{
            referencex = lastMousex;
            referencey = lastMousey;
          }
          
          // Atur agar referensi sesuai dengan posisi awal elemen
          if (!childBeforeDefined) referencex -=  parseFloat(child.getAttribute('data-flw-defposx'));
          if (!childBeforeDefined) referencey -=  parseFloat(child.getAttribute('data-flw-defposy'));

          // Dapatkan selisih antara posisi elemen dengan mouse
          let posisix = getOffset(child, 0);
          let posisiy = getOffset(child, 1);
          let selisihx = posisix - referencex;
          let selisihy = posisiy - referencey;

          let posx = (posisix - selisihx * speed);
          let posy = (posisiy - selisihy * speed);

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