document.addEventListener('DOMContentLoaded', () => {

    // --- PENGATURAN DASAR ---
    const WHATSAPP_NUMBER = '6289529737500'; // Ganti dengan nomor WhatsApp Anda

    // --- LOGIKA SIDEBAR ---
    const sidebar = document.getElementById('sidebar');
    const openBtn = document.getElementById('open-sidebar-btn');
    const closeBtn = document.getElementById('close-sidebar-btn');
    const overlay = document.getElementById('sidebar-overlay');
    const mainContent = document.getElementById('main-content');

    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('active');
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    }

    openBtn.addEventListener('click', openSidebar);
    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);
    
    // --- LOGIKA TOMBOL BELI VIA WHATSAPP ---
    const buyButtons = document.querySelectorAll('.buy-button');

    buyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Temukan 'product-card' terdekat dari tombol yang diklik
            const card = event.target.closest('.product-card');

            // Ambil judul produk dari dalam card
            const productTitle = card.querySelector('.product-title').innerText;
            
            // Ambil pilihan dari dropdown di dalam card
            const productSelect = card.querySelector('.product-select');
            const selectedOption = productSelect.options[productSelect.selectedIndex].text;

            // Buat template pesan WhatsApp
            const message = `Halo Danzz Store,

Saya tertarik untuk membeli produk berikut:
- *Produk:* ${productTitle}
- *Pilihan:* ${selectedOption}

Mohon informasinya untuk langkah selanjutnya. Terima kasih.`;

            // Encode pesan agar sesuai format URL
            const encodedMessage = encodeURIComponent(message);
            
            // Buat URL lengkap ke WhatsApp
            const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
            
            // Buka URL di tab baru
            window.open(whatsappURL, '_blank');
        });
    });
    
    // Tambahkan animasi fade-in pada elemen saat di-scroll
    const animatedElements = document.querySelectorAll('section, .product-card, .info-content');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeIn 1s ease-out forwards`;
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0'; // Sembunyikan elemen awalnya
        observer.observe(el);
    });
});