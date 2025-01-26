function TransformEdit(element, name, value) {
    // Mendapatkan nilai transformasi saat ini
    let transform = element.style.transform;

    // Memecah nilai transformasi menjadi array berdasarkan spasi
    let transformArray = transform.split(' '); // [translateX(calc(-50%] [-] [11px))]

    // Mengecek apakah transformasi dengan nama yang sama sudah ada dalam array
    let found = false;
    for (let i = 0; i < transformArray.length; i++) {
        let parts = transformArray[i].split('(');
        if (parts[0] === name) {
            // Jika nama transformasi sudah ada, perbarui nilainya
            transformArray[i] = name + '(' + value + ')';
            found = true;
            break;
        }
    }

    // Jika transformasi dengan nama yang sama belum ada, tambahkan ke array
    if (found === false) {
        transformArray.push(name + '(' + value + ')');
    }

    // Menggabungkan kembali array transformasi menjadi string dan menetapkannya ke elemen
    element.style.transform = transformArray.join(' ');
}

function TransformGet(element, name, defaultValue) {
    // Mendapatkan nilai transformasi saat ini
    let transform = element.style.transform;

    // Memecah nilai transformasi menjadi array berdasarkan spasi
    let transformArray = transform.split(' ');

    // Mencari transformasi dengan nama yang diberikan
    for (let i = 0; i < transformArray.length; i++) {
        let parts = transformArray[i].split('(');
        if (parts[0] === name) {
            // Jika parts.length lebih dari 2, gabungkan bagian setelah indeks ke-1 dengan join
            if (parts.length > 1) {
                // Menggabungkan semua bagian setelah tanda kurung pertama dan menghapus tanda kurung penutup
                return parts.slice(1).join('(').slice(0, -1);
            }
            // Jika tidak, cukup ambil bagian setelah tanda kurung pertama
            return parts[1].slice(0, -1);  // Menghapus tanda tutup kurung ')'
        }
    }

    // Jika tidak ditemukan, kembalikan null atau nilai default
    return defaultValue;
}


