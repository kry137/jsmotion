// IMPORTANT!! SCRIPT MEMBUTUHKAN BANTUAN DARI SCRIPT "transformedit.js"
{
  const elements = Array.from(document.getElementsByClassName('rotate-mouse'));

  document.addEventListener('mousemove', (event) => {
    elements.forEach(element => {
      // Dapatkan posisi tengah elemen
      const rect = element.getBoundingClientRect();
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;

      // Hitung sudut rotasi
      const angle = Math.atan2(event.clientY - elementCenterY, event.clientX - elementCenterX);

      // Ubah sudut dari radian ke derajat
      const angleDegrees = angle * (180 / Math.PI);

      // Terapkan referensi rotasi kedalam atribut elemen
      element.setAttribute('data-rotateto', angleDegrees);
    });
  });

  // Kode yang akan dijalankan setiap frame
  requestAnimationFrame(MoveForward);

  function MoveForward() {
    requestAnimationFrame(function () {
      elements.forEach((element) => {
        // Mengubah rotasi berdasarkan  referensi rotasi yang disimpan dalam atribut
        if (element.hasAttribute('data-rotateto')) {
          // Mendapatkan data yang diperlukan
          let rotateTo = parseFloat(element.getAttribute('data-rotateto'));
          let currentRotation = parseFloat(TransformGet(element, "rotate", 0));
          const maxRotation = parseFloat(element.getAttribute('data-maxrotation'));

          // Normalisasi sudut agar berada di antara 0 dan 360
          rotateTo = rotateTo % 360;
          currentRotation = currentRotation % 360;

          // Hitung selisih sudut
          let delta = rotateTo - currentRotation;
          // console.log(delta);

          // Tentukan arah rotasi terbaik
          if (isNaN(maxRotation) == false) {
            if (delta > 180) {
              delta -= 360; // Berlawanan arah jarum jam
            } else if (delta < -180) {
              delta += 360; // Searah jarum jam
            }
          }

          // Buat agar perubahan rotasi tidak melebihi nilai maksimal
          if (delta > maxRotation) delta = maxRotation;
          else if (delta < -maxRotation) delta = -maxRotation;

          // console.log(delta + 'deg');

          // Rotasikan elemen
          TransformEdit(element, 'rotate', currentRotation + delta + 'deg');
          // transform: translate(-50%, -50%) rotate(0deg);
        }
      });
    });
    // Jalankan function ini lagi di frame berikutnya
    requestAnimationFrame(MoveForward);
  }
}