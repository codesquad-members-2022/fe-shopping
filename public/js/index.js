import { carouselData } from "../data/data.js";

const carouselUlElement = document.querySelector(".carousel-items");
const carouselImgArea = document.querySelector(".carousel-img-area");

let carouselitems = "";
for (let i = 0; i < carouselData.length; i++) {
  carouselitems += `
  <li class="carousel-item" data-carousel-idx="${i}">
    <img src="${carouselData[i]["thumbnail"]}"
    alt="${carouselData[i]["alt"]}"
    class="img">
</li>
  `;
}
carouselUlElement.innerHTML = carouselitems;

let curCarouselIdx = 0;
const carouselLiElements = document.querySelectorAll("[data-carousel-idx]");
const totalDataCnt = carouselData.length;

carouselImgArea.style.backgroundImage = `url(${carouselData[curCarouselIdx]["backgroundImg"]})`;
carouselLiElements[curCarouselIdx].classList.add("selected");

const carousel = () => {
  curCarouselIdx++;
  if (curCarouselIdx >= totalDataCnt) {
    curCarouselIdx = 0;
  }

  carouselLiElements.forEach((el) => el.classList.remove("selected"));
  carouselLiElements[curCarouselIdx].classList.add("selected");
  carouselImgArea.style.backgroundImage = `url(${carouselData[curCarouselIdx]["backgroundImg"]})`;
};

const start = () => {
  timer = setInterval(carousel, 1700);
};
const stop = () => {
  clearInterval(timer);
};

let timer = setInterval(carousel, 1700);
carouselUlElement.addEventListener("mouseover", ({ target }) => {
  if (
    !target.parentElement.classList.contains("carousel-item") &&
    !target.classList.contains("carousel-item")
  )
    return;

  stop();
  let carouselItem = target;
  if (target.parentElement.classList.contains("carousel-item")) {
    carouselItem = target.parentElement;
  }
  curCarouselIdx = carouselItem.dataset.carouselIdx;
  carouselLiElements.forEach((el) => el.classList.remove("selected"));
  carouselItem.classList.add("selected");
  carouselImgArea.style.backgroundImage = `url(${carouselData[curCarouselIdx]["backgroundImg"]})`;
});

carouselUlElement.addEventListener("mouseout", ({ target }) => {
  if (
    !target.parentElement.classList.contains("carousel-item") &&
    !target.classList.contains("carousel-item")
  )
    return;

  start();
});
