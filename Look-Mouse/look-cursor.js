// PREPARASI PERTAMA KALI
Array.from(document.querySelectorAll('.look-mouse > *')).forEach(element => {
    // Mengatur background (gambar) elemen
    if (element.hasAttribute('data-bgpic')) element.style.backgroundImage = `url(${element.getAttribute('data-bgpic')})`;
    else if (element.hasAttribute('data-bgcolor')) element.style.backgroundColor = element.getAttribute('data-bgcolor');

    // Mengatur ukuran elemen
    if (element.hasAttribute('data-size')) {
        let value = element.getAttribute('data-size').split(' ');
        if (value.length == 2) {
            if (value[0] != '~') element.style.width = value[0];
            if (value[1] != '~') element.style.height = value[1];
        }
    }

    // Mengatur nilai background-size
    if (element.hasAttribute('data-bgsize')) {
        element.style.backgroundSize = element.getAttribute('data-bgsize');
    }

    // Mengatur skala elemen
    if (element.hasAttribute('data-scale')) {
        TransformEdit(element, 'scale', element.getAttribute('data-scale'));
    }

    // Mengatur posisi default elemen
    {
        const rect = element.getBoundingClientRect();
        let transformx = rect.left;
        let transformy = rect.top;

        if (element.hasAttribute('data-defaultposition') == false) {
            element.setAttribute('data-defaultposition', `${transformx} ${transformy}`);
        }
        else {
            let pos = element.getAttribute('data-defaultposition').split(' ');
            if (pos.length == 2) {
                if (pos[0] != '~') TransformEdit(element, "translateX", pos[0]);
                if (pos[1] != '~') TransformEdit(element, "translateY", pos[1]);
            }
        }
    }
});



// Simpan ukuran screen sebagai referensi, bahkan jika berubah
let screenSize = { width: window.innerWidth, height: window.innerHeight };
window.addEventListener('resize', () => {
    requestAnimationFrame(() => {
        screenSize = { width: window.innerWidth, height: window.innerHeight };
    });
});

// Gerakkan elemen jika mouse gerak
window.addEventListener('mousemove', function (event) {
    requestAnimationFrame(function () {
        document.querySelectorAll('.look-mouse > *').forEach(element => {
            if (element.hasAttribute('data-followrate')) {
                // Dapatkan posisi mouse (dalam pixel)
                let mousex = event.clientX;
                let mousey = event.clientY;

                // Dapatkan posisi default elemen
                let rect = element.getBoundingClientRect();
                let defaultPosition = element.getAttribute('data-defaultposition').split(' ');
                let defaultx = parseFloat(defaultPosition[0]) + rect.width / 2;
                let defaulty = parseFloat(defaultPosition[1]) + rect.height / 2;

                // Dapatkan followrate elemen
                let speed = parseFloat(element.getAttribute('data-followrate'));

                // Dapatkan koordinat baru untuk elemen
                let newLeft = (mousex - defaultx) * 100 / window.innerWidth * speed;
                let newTop = (mousey - defaulty) * 100 / window.innerHeight * speed;

                // Aplikasikan nilai max pada elemen
                if (element.hasAttribute('data-followmax')) {
                    let maxValue = element.getAttribute('data-followmax');
                    const distance = Math.sqrt(newLeft ** 2 + newTop ** 2); // Pitagoras
                    if (distance > maxValue) {
                        const scale = maxValue / distance; // Rasio, nilai akan kurang dari 1 jika jarak melebihi batas
                        newLeft *= scale; // Sesuaikan newLeft
                        newTop *= scale;  // Sesuaikan newTop
                    }
                }

                TransformEdit(element, "translateX", newLeft + "px");
                TransformEdit(element, "translateY", newTop + "px");
            }
        });
    });
});
