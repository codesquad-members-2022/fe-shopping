export default function carousel({ slides, selector }) {
  const liCount = slides.childElementCount;
  let slideOrder = 1;

  const showNextSlide = (id) => {
    const remaindar = id % liCount;
    const moveNum = remaindar === 0 ? 0 : remaindar;
    slides.style.transform = `translateX(-${moveNum * 100}vw)`;
    slideOrder = id;
    slideOrder += 1;
  };

  const sec = 3000;
  setInterval(() => {
    showNextSlide(slideOrder);
  }, sec);

  selector.addEventListener("mouseover", (event) => {
    const $category = event.target.closest("li");
    const currentId = $category.dataset.id - 1;
    showNextSlide(currentId);
  });
}
