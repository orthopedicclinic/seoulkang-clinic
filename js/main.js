// ===== 모바일 메뉴 토글 =====
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

// ===== 히어로 시설 사진 자동 슬라이드 =====
(() => {
  const track = document.getElementById("carouselTrack");
  if (!track) return;
  const slides = [...track.querySelectorAll("img")];
  const caption = document.getElementById("carouselCaption");
  const dotsWrap = document.getElementById("carouselDots");
  let index = 0;
  let timer;

  // 도트 생성
  slides.forEach((img, i) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", i + 1 + "번 사진");
    dot.addEventListener("click", () => {
      goTo(i);
      restart();
    });
    dotsWrap.appendChild(dot);
  });
  const dots = [...dotsWrap.children];

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = "translateX(" + -index * 100 + "%)";
    if (caption) caption.textContent = slides[index].alt;
    dots.forEach((d, di) => d.classList.toggle("active", di === index));
  }
  function next() { goTo(index + 1); }
  function restart() { clearInterval(timer); timer = setInterval(next, 2000); }

  goTo(0);
  restart();

  // 마우스를 올리면 잠시 멈춤
  const carousel = document.getElementById("heroCarousel");
  carousel.addEventListener("mouseenter", () => clearInterval(timer));
  carousel.addEventListener("mouseleave", restart);
})();

// ===== 비급여 진료비용 모달 =====
(() => {
  const modal = document.getElementById("priceModal");
  const openBtn = document.getElementById("openPrice");
  if (!modal || !openBtn) return;

  function open() {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function close() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  openBtn.addEventListener("click", open);
  modal.querySelectorAll("[data-close]").forEach((el) =>
    el.addEventListener("click", close)
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) close();
  });
})();

// ===== 네이버 지도 =====
// 1) 네이버 클라우드 플랫폼(https://www.ncloud.com) > Maps > Application 등록 후
//    발급받은 클라이언트 ID를 아래에 입력하세요.
// 2) ID가 비어 있으면 지도 대신 '네이버 지도에서 보기' 버튼이 표시됩니다.
const NAVER_CLIENT_ID = ""; // 예: "abcd1234ef"

// 서울강정형외과의원 좌표 (판교 크래프톤타워). 정확한 위치로 미세 조정 가능.
const CLINIC_LAT = 37.39478;
const CLINIC_LNG = 127.11116;

function renderNaverMap() {
  const map = new naver.maps.Map("naverMap", {
    center: new naver.maps.LatLng(CLINIC_LAT, CLINIC_LNG),
    zoom: 17,
  });
  new naver.maps.Marker({
    position: new naver.maps.LatLng(CLINIC_LAT, CLINIC_LNG),
    map: map,
    title: "서울강정형외과의원",
  });
  // 지도가 정상 로드되면 안내 카드는 숨김
  const fallback = document.getElementById("mapFallback");
  if (fallback) fallback.style.display = "none";
}

if (NAVER_CLIENT_ID) {
  const script = document.createElement("script");
  script.src =
    "https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=" +
    NAVER_CLIENT_ID;
  script.onload = renderNaverMap;
  document.head.appendChild(script);
}
