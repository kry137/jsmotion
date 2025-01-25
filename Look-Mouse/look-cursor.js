function updateScreenSize() {
    var widthValue = window.innerWidth;
    var heightValue = window.innerHeight;
    return { width: widthValue, height: heightValue }
}

// Nilai referensi untuk ukuran window
var screenSize = updateScreenSize();

// Perbaharui nilai referensi jika ukuran window berubah
window.addEventListener('resize', function () {
    requestAnimationFrame(function () {
        screenSize = updateScreenSize();
    });
});

window.addEventListener('mousemove', function (event) {
    requestAnimationFrame(function () {
        document.querySelector('body').querySelectorAll('#look-mouse > *').forEach(element => {
            if (element.hasAttribute('followrate')) {
                let x = event.clientX;
                let y = event.clientY;
                let defaultPosition = element.getAttribute('defaultposition').split(' ');
                let defaultX = parseFloat(defaultPosition[0]); 
                let defaultY = parseFloat(defaultPosition[1]);
                let speed = parseFloat(element.getAttribute('followrate')); 

                let newLeft = defaultX + (x - screenSize.width / 2) * speed;
                let newTop = defaultY + (y - screenSize.height / 2) * speed;

                element.style.left = newLeft + 'px';
                element.style.top = newTop + 'px';
            }
        });
    });
});
