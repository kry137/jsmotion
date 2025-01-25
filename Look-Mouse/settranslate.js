function SetTranslateStyle(element, name, value) {
    // Mendapatkan nilai transformasi saat ini
    let transform = element.style.transform;

    // Memecah nilai transformasi menjadi array berdasarkan spasi
    let transformArray = transform.split(' ');

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
    if (!found) {
        transformArray.push(name + '(' + value + ')');
    }

    // Menggabungkan kembali array transformasi menjadi string dan menetapkannya ke elemen
    element.style.transform = transformArray.join(' ');
}
