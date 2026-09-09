document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ELEMENTS
  ========================= */
  const welcomeScreen = document.getElementById("welcomeScreen");
  const mainSite = document.getElementById("mainSite");
  const enterBtn = document.getElementById("enterBtn");

  const balloonContainer = document.getElementById("balloonContainer");
  const heartContainer = document.getElementById("heartContainer");
  const sparkleContainer = document.getElementById("sparkleContainer");

  const mainHearts = document.getElementById("mainHearts");
  const mainSparkles = document.getElementById("mainSparkles");

  const days = document.getElementById("days");
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");

  const wishBtn = document.getElementById("wishBtn");
  const wishMessage = document.getElementById("wishMessage");

  /* =========================
     INITIAL STATE
  ========================= */
  mainSite.style.display = "none";
  mainSite.style.opacity = "0";
  mainSite.style.transition = "opacity 1.2s ease";

  document.body.style.overflow = "hidden";

  /* =========================
     WELCOME BALLOONS
  ========================= */
  function createBalloon() {
    if (!balloonContainer) return;

    const balloon = document.createElement("div");
    balloon.className = "balloon";

    const colors = [
      "#ff6b9d",
      "#ff9ec4",
      "#ffd166",
      "#c77dff",
      "#7bdff2",
      "#95e06c"
    ];

    balloon.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    balloon.style.left = Math.random() * 100 + "%";

    const size = 35 + Math.random() * 35;
    balloon.style.width = size + "px";
    balloon.style.height = size * 1.25 + "px";

    balloon.style.animationDuration =
      7 + Math.random() * 7 + "s";

    balloon.style.animationDelay =
      Math.random() * 3 + "s";

    balloonContainer.appendChild(balloon);

    setTimeout(() => balloon.remove(), 15000);
  }

  for (let i = 0; i < 18; i++) {
    setTimeout(createBalloon, i * 180);
  }

  setInterval(createBalloon, 900);

  /* =========================
     WELCOME HEARTS
  ========================= */
  function createHeart(container, main = false) {
    if (!container) return;

    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.innerHTML = ["❤", "♥", "💗", "💕"][
      Math.floor(Math.random() * 4)
    ];

    heart.style.left = Math.random() * 100 + "%";

    if (main) {
      heart.style.bottom = "-30px";
    } else {
      heart.style.bottom = "-20px";
    }

    heart.style.fontSize =
      12 + Math.random() * 20 + "px";

    heart.style.animationDuration =
      5 + Math.random() * 5 + "s";

    heart.style.animationDelay =
      Math.random() * 2 + "s";

    container.appendChild(heart);

    setTimeout(() => heart.remove(), 12000);
  }

  for (let i = 0; i < 25; i++) {
    setTimeout(() => {
      createHeart(heartContainer);
    }, i * 250);
  }

  setInterval(() => {
    createHeart(heartContainer);
  }, 650);

  /* =========================
     SPARKLES
  ========================= */
  function createSparkle(container) {
    if (!container) return;

    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";

    sparkle.innerHTML =
      Math.random() > 0.5 ? "✦" : "✧";

    sparkle.style.left =
      Math.random() * 100 + "%";

    sparkle.style.top =
      Math.random() * 100 + "%";

    sparkle.style.fontSize =
      8 + Math.random() * 14 + "px";

    sparkle.style.animationDuration =
      1.5 + Math.random() * 2 + "s";

    sparkle.style.animationDelay =
      Math.random() * 2 + "s";

    container.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 5000);
  }

  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      createSparkle(sparkleContainer);
    }, i * 100);
  }

  setInterval(() => {
    createSparkle(sparkleContainer);
  }, 180);

  /* =========================
     ENTER WEBSITE
  ========================= */
  enterBtn?.addEventListener("click", () => {

    // little click effect
    enterBtn.style.transform = "scale(0.92)";

    setTimeout(() => {
      welcomeScreen.classList.add("hide");

      setTimeout(() => {
        mainSite.style.display = "block";

        requestAnimationFrame(() => {
          mainSite.style.opacity = "1";
        });

        document.body.style.overflowX = "hidden";
        document.body.style.overflowY = "auto";

        startMainEffects();
        startBirthdayBurst();

      }, 500);

    }, 180);
  });

  /* =========================
     MAIN PAGE EFFECTS
  ========================= */
  function setupEffectLayer(layer) {
    if (!layer) return;

    layer.style.position = "fixed";
    layer.style.inset = "0";
    layer.style.pointerEvents = "none";
    layer.style.zIndex = "1";
    layer.style.overflow = "hidden";
  }

  setupEffectLayer(mainHearts);
  setupEffectLayer(mainSparkles);

  function startMainEffects() {

    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        createHeart(mainHearts, true);
      }, i * 300);
    }

    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        createSparkle(mainSparkles);
      }, i * 100);
    }

    setInterval(() => {
      createHeart(mainHearts, true);
    }, 900);

    setInterval(() => {
      createSparkle(mainSparkles);
    }, 250);
  }

  /* =========================
     COUNTDOWN
     10 OCTOBER 2026
  ========================= */
  const birthdayDate =
    new Date(2026, 9, 10, 0, 0, 0);

  function updateCountdown() {

    const now = new Date();
    const difference = birthdayDate - now;

    if (difference <= 0) {

      days.textContent = "00";
      hours.textContent = "00";
      minutes.textContent = "00";
      seconds.textContent = "00";

      const title =
        document.querySelector(".countdown-title");

      if (title) {
        title.textContent =
          "Today is your special day! 🎂❤️";
      }

      return;
    }

    const totalSeconds =
      Math.floor(difference / 1000);

    const d =
      Math.floor(totalSeconds / 86400);

    const h =
      Math.floor((totalSeconds % 86400) / 3600);

    const m =
      Math.floor((totalSeconds % 3600) / 60);

    const s =
      totalSeconds % 60;

    days.textContent =
      String(d).padStart(2, "0");

    hours.textContent =
      String(h).padStart(2, "0");

    minutes.textContent =
      String(m).padStart(2, "0");

    seconds.textContent =
      String(s).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* =========================
     PHOTO SLIDER
  ========================= */
  const cards =
    document.querySelectorAll(".photo-card");

  const prevBtn =
    document.querySelector(".slider-btn.prev");

  const nextBtn =
    document.querySelector(".slider-btn.next");

  const dots =
    document.querySelectorAll(".slider-dot");

  let currentSlide = 0;
  let sliderTimer;

  function showSlide(index) {

    if (!cards.length) return;

    if (index >= cards.length) {
      index = 0;
    }

    if (index < 0) {
      index = cards.length - 1;
    }

    currentSlide = index;

    cards.forEach((card, i) => {
      card.classList.toggle(
        "active",
        i === currentSlide
      );
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle(
        "active",
        i === currentSlide
      );
    });
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
    resetSliderTimer();
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
    resetSliderTimer();
  }

  function resetSliderTimer() {
    clearInterval(sliderTimer);

    sliderTimer = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 4500);
  }

  nextBtn?.addEventListener("click", nextSlide);
  prevBtn?.addEventListener("click", prevSlide);

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      resetSliderTimer();
    });
  });

  showSlide(0);
  resetSliderTimer();

  /* =========================
     MOBILE SWIPE
  ========================= */
  const photoSlider =
    document.querySelector(".photo-slider");

  let touchStartX = 0;
  let touchEndX = 0;

  photoSlider?.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  photoSlider?.addEventListener(
    "touchend",
    (e) => {

      touchEndX =
        e.changedTouches[0].screenX;

      const distance =
        touchStartX - touchEndX;

      if (Math.abs(distance) < 50) return;

      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    },
    { passive: true }
  );

  /* =========================
     MAKE A WISH
  ========================= */
  wishBtn?.addEventListener("click", () => {

    if (wishMessage) {
      wishMessage.classList.add("show");
    }

    // Candle flame effect
    document
      .querySelectorAll(".flame")
      .forEach((flame) => {
        flame.style.animation = "none";
        flame.style.opacity = "0";
        flame.style.transform = "scale(0)";
      });

    startConfetti();

    heartBurst();

    wishBtn.innerHTML =
      "Wish Made! ✨❤️";

    wishBtn.style.transform =
      "scale(1.08)";

    setTimeout(() => {
      wishBtn.style.transform =
        "scale(1)";
    }, 250);
  });

  /* =========================
     CONFETTI
  ========================= */
  function startConfetti() {

    const symbols = [
      "❤",
      "♥",
      "✦",
      "✨",
      "🎉",
      "💗"
    ];

    for (let i = 0; i < 80; i++) {

      const confetti =
        document.createElement("span");

      confetti.className = "confetti";

      confetti.innerHTML =
        symbols[
          Math.floor(Math.random() * symbols.length)
        ];

      confetti.style.left =
        Math.random() * 100 + "vw";

      confetti.style.top = "-30px";

      confetti.style.fontSize =
        10 + Math.random() * 18 + "px";

      confetti.style.animationDuration =
        2.5 + Math.random() * 3 + "s";

      confetti.style.animationDelay =
        Math.random() * 0.8 + "s";

      document.body.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 6000);
    }
  }

  /* =========================
     HEART BURST
  ========================= */
  function heartBurst() {

    for (let i = 0; i < 25; i++) {

      const heart =
        document.createElement("div");

      heart.innerHTML =
        ["❤", "💗", "💕", "💖"][
          Math.floor(Math.random() * 4)
        ];

      heart.style.position = "fixed";
      heart.style.left = "50%";
      heart.style.top = "58%";
      heart.style.zIndex = "9999";
      heart.style.pointerEvents = "none";
      heart.style.fontSize =
        14 + Math.random() * 22 + "px";

      const x =
        (Math.random() - 0.5) * 500;

      const y =
        (Math.random() - 0.5) * 400;

      heart.style.transition =
        "all 1.5s cubic-bezier(.2,.8,.2,1)";

      document.body.appendChild(heart);

      requestAnimationFrame(() => {
        heart.style.transform =
          `translate(${x}px, ${y}px) scale(1.4)`;
        heart.style.opacity = "0";
      });

      setTimeout(() => {
        heart.remove();
      }, 1600);
    }
  }

  /* =========================
     BIRTHDAY ENTRY BURST
  ========================= */
  function startBirthdayBurst() {

    setTimeout(() => {

      for (let i = 0; i < 35; i++) {

        const star =
          document.createElement("div");

        star.innerHTML =
          Math.random() > 0.5 ? "✨" : "💖";

        star.style.position = "fixed";
        star.style.left = "50%";
        star.style.top = "35%";
        star.style.zIndex = "9999";
        star.style.pointerEvents = "none";
        star.style.fontSize =
          10 + Math.random() * 20 + "px";

        const x =
          (Math.random() - 0.5) * 600;

        const y =
          (Math.random() - 0.5) * 400;

        star.style.transition =
          "all 1.4s ease-out";

        document.body.appendChild(star);

        requestAnimationFrame(() => {
          star.style.transform =
            `translate(${x}px, ${y}px) rotate(180deg)`;
          star.style.opacity = "0";
        });

        setTimeout(() => {
          star.remove();
        }, 1500);
      }

    }, 700);
  }

});
