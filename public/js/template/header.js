export const header = `
  <header>
    <div class="header-wrap">
      <div class="header">
        <div class="header-left">
          <div class="header-gnb">
            <a href="#" class="header-gnb__link">
              <img src="#" alt="#" class="header-gnb__img">
              <span class="header-gnb__text absolute-width-center">카테고리</span>
            </a>
              <div class="header-lnb">
                <ul class="header-lnb-first__list">
                  <li class="header-lnb-first__item">
                    <a href="#" class="header-lnb-first__link" data-second-list="1">패션의류/잡화</a>
                    <ul class="header-lnb-second__list" data-second-list="1">
                      <li class="header-lnb-second__item">
                        <a href="#" class="header-lnb-second__link" >여성패션</a>
                      </li>
                      <li class="header-lnb-second__item">
                        <a href="#" class="header-lnb-second__link">남성패션</a>
                      </li>
                      <li class="header-lnb-second__item">
                        <a href="#" class="header-lnb-second__link">남녀 공용 의류</a>
                      </li>
                      <li class="header-lnb-second__item">
                        <a href="#" class="header-lnb-second__link">유아동패션</a>
                      </li>
                    </ul>
                  </li>
                  <li class="header-lnb-first__item">
                    <a href="#" class="header-lnb-first__link" data-second-list="2">뷰티</a>
                    <ul class="header-lnb-second__list" data-second-list="2">
                      <li class="header-lnb-second__item">
                        <a href="#" class="header-lnb-second__link">명품뷰티</a>
                      </li>
                      <li class="header-lnb-second__item">
                        <a href="#" class="header-lnb-second__link">스킨케어</a>
                      </li>
                      <li class="header-lnb-second__item">
                        <a href="#" class="header-lnb-second__link">클렌징/필링</a>
                      </li>
                      <li class="header-lnb-second__item">
                        <a href="#" class="header-lnb-second__link">더마코스메틱</a>
                      </li>
                      <li class="header-lnb-second__item">
                        <a href="#" class="header-lnb-second__link">메이크업</a>
                      </li>
                      <li class="header-lnb-second__item">
                        <a href="#" class="header-lnb-second__link">향수</a>
                      </li>
                      <li class="header-lnb-second__item">
                        <a href="#" class="header-lnb-second__link">남성화장품</a>
                      </li>
                      <li class="header-lnb-second__item">
                        <a href="#" class="header-lnb-second__link">네일</a>
                      </li>
                      <li class="header-lnb-second__item">
                        <a href="#" class="header-lnb-second__link">뷰티소품</a>
                      </li>
                      <li class="header-lnb-second__item">
                        <a href="#" class="header-lnb-second__link">어린이화장품</a>
                      </li>
                      <li class="header-lnb-second__item">
                        <a href="#" class="header-lnb-second__link">로드샵</a>
                      </li>
                      <li class="header-lnb-second__item">
                        <a href="#" class="header-lnb-second__link">헤어</a>
                      </li>
                      <li class="header-lnb-second__item">
                        <a href="#" class="header-lnb-second__link">바디</a>
                      </li>
                      <li class="header-lnb-second__item">
                        <a href="#" class="header-lnb-second__link">선물세트/키트</a>
                      </li>
                    </ul>
                  </li>
                  <li class="header-lnb-first__item">
                    <a href="#" class="header-lnb-first__link">출산/유아동</a>
                  </li>
                  <li class="header-lnb-first__item">
                    <a href="#" class="header-lnb-first__link">식품</a>
                  </li>
                  <li class="header-lnb-first__item">
                    <a href="#" class="header-lnb-first__link">주방용품</a>
                  </li>
                  <li class="header-lnb-first__item">
                    <a href="#" class="header-lnb-first__link">생활용품</a>
                  </li>
                  <li class="header-lnb-first__item">
                    <a href="#" class="header-lnb-first__link">홈인테리어</a>
                  </li>
                  <li class="header-lnb-first__item">
                    <a href="#" class="header-lnb-first__link">가전디지털</a>
                  </li>
                  <li class="header-lnb-first__item">
                    <a href="#" class="header-lnb-first__link">스포츠/레저</a>
                  </li>
                  <li class="header-lnb-first__item">
                    <a href="#" class="header-lnb-first__link">자동차용품</a>
                  </li>
                  <li class="header-lnb-first__item">
                    <a href="#" class="header-lnb-first__link">도서/음반/DVD</a>
                  </li>
                  <li class="header-lnb-first__item">
                    <a href="#" class="header-lnb-first__link">완구/취미</a>
                  </li>
                  <li class="header-lnb-first__item">
                    <a href="#" class="header-lnb-first__link">문구/오피스</a>
                  </li>
                  <li class="header-lnb-first__item">
                    <a href="#" class="header-lnb-first__link">반려동물용품</a>
                  </li>
                  <li class="header-lnb-first__item">
                    <a href="#" class="header-lnb-first__link">헬스/건강식품</a>
                  </li>
                  <hr class="header-lnb-first__hr" />
                  <li class="header-lnb-first__item">
                    <a href="#" class="header-lnb-first__link">여행/티켓</a>
                  </li>
                  <hr class="header-lnb-first__hr" />
                  <li class="header-lnb-first__item">
                    <a href="#" class="header-lnb-first__link">테마관</a>
                  </li>
                </ul>
              </div>
          </div>
        </div>
        <div class="header-right">
          <div class="header-top">
            <div class="header-logo">
            <a href="#"><img src="#" alt="#" width="174" height="41" class="header-logo__img"/></a>
            </div>
            <div class="search-form">
              <div class="search-category">
                <a href="#" class="search-category__link">전체</a>
              </div>
              <input type="text" class="search-text" placeholder="찾고 싶은 상품을 검색해보세요!">
              <button class="btn search-mic"><i class="fa-solid fa-microphone fa-1x"></i></button>
              <button class="btn search-btn"><i class="fa-solid fa-magnifying-glass fa-1x"></i></button>
            </div>
            <div class="header-top-gnb">
              <ul class="header-top-gnb__list">
                <li class="header-top-gnb__item">
                  <a href="#" class="header-top-gnb__link">
                    <i class="fa-regular fa-user fa-2x"></i></i>
                    <span class="header-top-gnb__text">마이쿠팡</span>
                  </a>
                </li>
                <li class="header-top-gnb__item">
                  <a href="#" class="header-top-gnb__link">
                    <i class="fa-solid fa-cart-shopping fa-2x"></i>
                    <span class="header-top-gnb__text">장바구니</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="header-bottom">
            <div class="header-bottom-gnb">
              <ul class="header-bottom-gnb__list">
                <li class="header-bottom-gnb__item">
                  <a href="#" class="header-bottom-gnb__link">
                    로켓배송
                  </a>
                </li>
                <li class="header-bottom-gnb__item">
                  <a href="#" class="header-bottom-gnb__link">
                    로켓프레시
                  </a>
                </li>
                <li class="header-bottom-gnb__item">
                  <a href="#" class="header-bottom-gnb__link">
                    쿠팡비즈
                  </a>
                </li>
                <li class="header-bottom-gnb__item">
                  <a href="#" class="header-bottom-gnb__link">
                    로켓직구
                  </a>
                </li>
                <li class="header-bottom-gnb__item">
                  <a href="#" class="header-bottom-gnb__link">
                    골드박스
                  </a>
                </li>
                <li class="header-bottom-gnb__item">
                  <a href="#" class="header-bottom-gnb__link">
                    와우회원할인
                  </a>
                </li>
                <li class="header-bottom-gnb__item">
                  <a href="#" class="header-bottom-gnb__link">
                    이벤트/쿠폰
                  </a>
                </li>
                <li class="header-bottom-gnb__item">
                  <a href="#" class="header-bottom-gnb__link">
                    기획전
                  </a>
                </li>
                <li class="header-bottom-gnb__item">
                  <a href="#" class="header-bottom-gnb__link">
                    여행/티켓
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>`;
