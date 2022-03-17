const t = [
    { keyword: "티젠 콤부차" },
    { keyword: "티슈" },
    { keyword: "티비" },
    { keyword: "티셔츠" },
    { keyword: "티니핑" },
    { keyword: "여성 티셔츠 긴팔티" },
    { keyword: "티백" },
    { keyword: "티포트" },
    { keyword: "남자 티셔츠 긴팔티" },
    { keyword: "티젠 콤부차 레몬" },
];

const tshir = [
    { keyword: "여성 티셔츠 긴팔티" },
    { keyword: "티셔츠" },
    { keyword: "남자 티셔츠 긴팔티" },
    { keyword: "남성 티셔츠" },
    { keyword: "여성 브이넥 티셔츠" },
    { keyword: "여아 티셔츠" },
    { keyword: "빅사이즈 티셔츠" },
    { keyword: "여성 티셔츠 긴팔티 기본티" },
    { keyword: "남아 티셔츠" },
    { keyword: "나이키 티셔츠" },
];

const tshirt = [
    { keyword: "티셔츠" },
    { keyword: "여성 티셔츠 긴팔티" },
    { keyword: "남자 티셔츠 긴팔티" },
    { keyword: "여성 브이넥 티셔츠" },
    { keyword: "남성 티셔츠" },
    { keyword: "빅사이즈 티셔츠" },
    { keyword: "여성 티셔츠 긴팔티 기본티" },
    { keyword: "여아 티셔츠" },
    { keyword: "여성 7부 티셔츠" },
    { keyword: "나이키 티셔츠" },
];

const database = new Map();
database.set("티", t);
database.set("티셔", tshir);
database.set("티셔츠", tshirt);

export { database };
