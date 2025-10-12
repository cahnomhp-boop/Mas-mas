// DATA PENJUALAN - Kamu bisa ganti data ini kapan saja
const gameItems = {
    roblox: [
        { name: "80 Robux", price: "Rp 15.000", icon: "💎" },
        { name: "400 Robux", price: "Rp 75.000", icon: "✨" },
        { name: "800 Robux", price: "Rp 149.000", icon: "👑" },
        { name: "Premium Pass (Bulanan)", price: "Rp 99.000", icon: "⭐" }
    ],
    freefire: [
        { name: "100 Diamond", price: "Rp 18.000", icon: "🔥" },
        { name: "500 Diamond", price: "Rp 88.000", icon: "💥" },
        { name: "Weekly Pass", price: "Rp 30.000", icon: "📅" },
        { name: "Elite Pass", price: "Rp 150.000", icon: "🎖️" }
    ],
    mobilelegend: [
        { name: "50 Diamond", price: "Rp 15.000", icon: "⚔️" },
        { name: "250 Diamond", price: "Rp 75.000", icon: "🛡️" },
        { name: "Twilight Pass", price: "Rp 99.000", icon: "🔮" },
        { name: "Starlight Member", price: "Rp 149.000", icon: "🌟" }
    ]
};

const gameButtons = document.querySelectorAll('.game-btn');
const itemListSection = document.getElementById('item-list-section');
const selectedGameName = document.getElementById('selected-game-name');
const itemList = document.getElementById('item-list');

// Fungsi untuk menampilkan daftar item
function displayItems(gameId) {
    const items = gameItems[gameId];
    itemList.innerHTML = ''; // Kosongkan daftar item sebelumnya

    // Iterasi melalui setiap item dalam game yang dipilih
    items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('item-card');

        itemCard.innerHTML = `
            <span style="font-size: 3em;">${item.icon}</span>
            <h3>${item.name}</h3>
            <p class="price">${item.price}</p>
            <button onclick="alert('Anda membeli ${item.name}!')">Beli Sekarang</button>
        `;

        itemList.appendChild(itemCard);
    });
    
    // Tampilkan bagian daftar item
    selectedGameName.textContent = gameId.toUpperCase().replace('LEGEND', ' Legends'); // Contoh format nama
    itemListSection.style.display = 'block';
}

// Tambahkan event listener ke setiap tombol game
gameButtons.forEach(button => {
    button.addEventListener('click', function() {
        const gameId = this.getAttribute('data-game');
        
        // Hapus kelas 'active' dari semua tombol
        gameButtons.forEach(btn => btn.classList.remove('active'));
        
        // Tambahkan kelas 'active' ke tombol yang baru diklik (untuk styling)
        this.classList.add('active');
        
        // Tampilkan item untuk game yang dipilih
        displayItems(gameId);
    });
});
