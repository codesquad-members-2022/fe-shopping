const $slideList = document.querySelector(".slide__list");
const $banner__category = document.querySelector(".banner__category");
const liCount = $slideList.childElementCount;
let count = 1;

const showNextSlide = (id) => {
  const remaindar = id % liCount;
  const moveNum = remaindar === 0 ? 0 : remaindar;
  console.log(moveNum);
  $slideList.style.transform = `translateX(-${moveNum * 100}vw)`;
  count = id;
  count += 1;
};

const sec = 3000;
setInterval(() => {
  showNextSlide(count);
}, sec);

$banner__category.addEventListener("mouseover", (event) => {
  const $category = event.target.closest("li");
  const currentId = $category.dataset.id - 1;
  showNextSlide(currentId);
});
