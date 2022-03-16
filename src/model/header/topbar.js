export class TopBar {
  createTemplate() {
    return `
  <div class="top-bar">
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
    </section>
  </div>
    `;
  }
}
