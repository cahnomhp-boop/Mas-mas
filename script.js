// Dapatkan elemen-elemen DOM yang dibutuhkan
const inputTugas = document.getElementById('inputTugas');
const daftarTugas = document.getElementById('daftarTugas');

// Fungsi untuk menambahkan tugas baru
function tambahTugas() {
    const teksTugas = inputTugas.value.trim();

    // Periksa apakah input tidak kosong
    if (teksTugas === "") {
        alert("Mohon masukkan tugas terlebih dahulu!");
        return;
    }

    // Buat elemen <li> baru
    const itemTugas = document.createElement('li');
    itemTugas.innerHTML = `
        <span>${teksTugas}</span>
        <div class="tombol-aksi">
            <button class="tombol-selesai" onclick="tandaiSelesai(this)">Selesai</button>
            <button class="tombol-hapus" onclick="hapusTugas(this)">Hapus</button>
        </div>
    `;

    // Tambahkan item tugas ke dalam daftar <ul>
    daftarTugas.appendChild(itemTugas);

    // Kosongkan input setelah tugas ditambahkan
    inputTugas.value = '';
}

// Fungsi untuk menandai tugas sebagai selesai
function tandaiSelesai(tombol) {
    // Dapatkan elemen <li> induk dari tombol
    const itemTugas = tombol.closest('li');
    
    // Toggle class 'selesai'
    itemTugas.classList.toggle('selesai');

    // Ubah teks tombol "Selesai"
    if (itemTugas.classList.contains('selesai')) {
        tombol.textContent = "Batal";
        tombol.style.backgroundColor = '#ffc107'; // Warna kuning
    } else {
        tombol.textContent = "Selesai";
        tombol.style.backgroundColor = '#007bff'; // Warna biru
    }
}

// Fungsi untuk menghapus tugas
function hapusTugas(tombol) {
    // Dapatkan elemen <li> induk dari tombol dan hapus
    const itemTugas = tombol.closest('li');
    itemTugas.remove();
}

// Memungkinkan penambahan tugas dengan tombol 'Enter'
inputTugas.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        tambahTugas();
    }
});
