document.addEventListener("DOMContentLoaded", () => {
  // Fade-in 
  const items = document.querySelectorAll(".item01, .item02");
  items.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    setTimeout(() => {
      item.style.transition = "all 0.6s ease";
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, 200 * index);
  });

  // Hover effect 
  items.forEach(item => {
    item.addEventListener("mouseenter", () => {
      item.querySelector("img").style.transform = "scale(1.1)";
      item.querySelector("img").style.transition = "transform 0.3s ease";
      item.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
    });
    item.addEventListener("mouseleave", () => {
      item.querySelector("img").style.transform = "scale(1)";
      item.style.boxShadow = "none";
    });
  });

  // Hiệu ứng click 
  items.forEach(item => {
    const link = item.querySelector("a");
    link.addEventListener("click", e => {
      e.preventDefault();
      item.style.transition = "all 0.2s";
      item.style.transform = "scale(0.95)";
      setTimeout(() => {
        window.location.href = link.href; // Chuyển trang sau hiệu ứng
      }, 150);
    });
  });
});
