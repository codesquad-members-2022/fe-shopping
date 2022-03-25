import { Core } from "../core.js";

export class TopBar extends Core {
  constructor() {
    super();
    this.template = this.setTemplate();
  }

  setTemplate() {
    const template = document.createElement("div");
    template.className = "top-bar";
    template.innerHTML = `
    <section>
      <ul class="subscribe">
        <li>즐겨찾기</li>
        <li>입점신청</li>
      </ul>
      <ul class="account">
        <li>로그인</li>
        <li>회원가입</li>
        <li>고객센터</li>
      </ul>
    </section>`;

    return template;
  }
}
