document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.getElementById("scrollToVideo");
  const videoSection = document.getElementById("video-romantis");
  const pages = document.querySelectorAll(".page");
  let currentPage = 0;

  const flipSound = new Audio("audio/flip.mp3");

    // === TAMBAHAN TOMBOL DARK MODE DI POJOK KANAN ATAS ===
  const toggleButton = document.createElement("button");
  toggleButton.id = "toggleDarkMode";
  toggleButton.textContent = "☀️"; // default terang
  document.body.appendChild(toggleButton);

  toggleButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    toggleButton.textContent = document.body.classList.contains("dark-mode") ? "🌙" : "☀️";
  });


  // Fungsi animasi mengetik
  function typeText(element, text, speed = 100, callback) {
    element.textContent = '';
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        element.textContent += text[index];
        index++;
      } else {
        clearInterval(interval);
        if (callback) callback();
      }
    }, speed);
  }

  const loveTexts = [
    "jadi kekasihku saja",
    "katakan cinta💖",
    "hati ini meminta",
    "kau lebih dari teman berbagi",
    "jadi kekasih ku saja",
    "cinta katakan cinta💖",
    "hati ini meminta",
    "kau lebih dari teman berbagi 💖"
    
    
  ];

  // Fungsi untuk buka halaman ke indeks tertentu dengan looping dan reset teks halaman lain
  function openPage(index) {
    if (index >= pages.length) {
      index = 0; // Loop balik ke halaman pertama
    } else if (index < 0) {
      index = pages.length - 1; // Kalau perlu support ke belakang juga
    }

    // Balikkan halaman dan reset teks semua halaman dulu
    pages.forEach((page, i) => {
      if (i < index) {
        page.classList.add("flipped");
      } else {
        page.classList.remove("flipped");
      }

      // Reset teks semua halaman (hapus teks sementara)
      const loveTextElem = page.querySelector(".love-text");
      if (loveTextElem) loveTextElem.textContent = '';
    });

    currentPage = index;

    // Animasi teks mengetik di halaman yang aktif
    const loveTextElem = pages[index].querySelector(".love-text");
    if (loveTextElem) {
      typeText(loveTextElem, loveTexts[index], 80);
    }
  }

  // Pas load pertama langsung buka halaman pertama dengan animasi teks
  openPage(0);

  // Tombol scroll ke video
  scrollBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    videoSection.scrollIntoView({ behavior: "smooth" });
  });

  // Klik body (kecuali tombol) untuk flip maju/balik halaman dengan looping
  document.body.addEventListener("click", function (e) {
    if (scrollBtn.contains(e.target)) return; // jangan proses klik tombol
    if (toggleButton.contains(e.target)) return; // jangan proses klik tombol dark mode

    if (e.shiftKey) {
      // Kalau tekan shift + klik: balik halaman
      openPage(currentPage - 1);
      flipSound.currentTime = 0;
      flipSound.play();
    } else {
      // Klik biasa: maju halaman dengan looping
      openPage(currentPage + 1);
      flipSound.currentTime = 0;
      flipSound.play();
    }
  });

  // Intersection Observer untuk animasi video
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  observer.observe(videoSection);
});
