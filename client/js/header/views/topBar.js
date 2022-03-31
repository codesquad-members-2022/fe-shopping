export const TopBar = function () {};

TopBar.prototype = {
  constructor: TopBar,
  createTemplate() {
    return `
      <nav class="top-bar-wrapper">
        <div class="top-bar flex-row-between thousand-width-center">
          <div class="top-bar__content-wrapper flex-row-between">
            <div class="top-bar__content flex-row-between flex-center">
              <div class="top-bar__text">즐겨찾기</div>
            </div>
            <div class="top-bar__content flex-row-between flex-center">
              <div class="top-bar__text">입점신청</div>
              <div class="top-bar__button"></div>
            </div>
          </div>
          <div class="top-bar__content-wrapper flex-row-between">
            <div class="top-bar__content flex-row-between flex-center">
              <div class="top-bar__text">로그인</div>
            </div>
            <div class="top-bar__content flex-row-between flex-center">
              <div class="top-bar__text">회원가입</div>
            </div>
            <div class="top-bar__content flex-row-between flex-center">
              <div class="top-bar__text">고객센터</div>
            </div>
          </div>
        </div>
      </nav>
      `;
  },
  render() {
    const topBar = document.querySelector(".header");
    topBar.insertAdjacentHTML("afterbegin", this.createTemplate());
  },
};
