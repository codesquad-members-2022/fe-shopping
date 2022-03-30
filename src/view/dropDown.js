const categoryButton = document.querySelector(".drop-btn");

export {categoryButton}

// Controller
import {categoryController} from '../model/header.js'

categoryButton.addEventListener('mouseover', function(){
    const data = categoryController.getdata();
    if(categoryController.ownSweetSwitch === false){
        categoryController.initCategoryList(data, categoryButton);
        categoryController.switching();
    }
    
    categoryController.attachCategoryList();
    console.log(categoryController.ownSweetSwitch);
}); // turining switch 이용해서 범위 밖으로 나가면 메뉴 사라지도록 설정하기. 가급적 setTimeout 쓰지말것.
// window.addEventListener("mousemove", mousemove);

categoryButton.addEventListener('mouseout', function(){
    if(categoryController.ownSweetSwitch === true){
        categoryController.detachCategoryList();
    }
});