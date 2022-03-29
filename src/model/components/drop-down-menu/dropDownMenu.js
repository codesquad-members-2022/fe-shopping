function initCategoryList(data, btn) {
   let orderMadeInnerHTMLData = '';
   for (const element of data) {
      orderMadeInnerHTMLData += '<li class = "category-item item">'+ element +'</li>';
   }
   const newDiv = document.createElement('div');
   newDiv.innerHTML = orderMadeInnerHTMLData;
   newDiv.classList.add("category", "mouse-pst");
   return btn.appendChild(newDiv);
}

function attachCategoryList(data, list) {
   document.querySelector('.category').hidden = false;
}

function detachCategoryList(data, list) {
   document.querySelector('.category').hidden = true;
}

// https://stackoverflow.com/questions/49063413/how-to-access-object-prototype-methods-from-another-file-using-module-exports
export {initCategoryList, attachCategoryList, detachCategoryList};