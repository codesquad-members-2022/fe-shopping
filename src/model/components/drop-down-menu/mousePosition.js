// 마우스를 대각선으로 움직이느냐 위아래로 움직이느냐를 추적할 것.
function mousePosition(){
    var e = window.event;

    var posX = e.clientX;
    var posY = e.clientY;

    document.Form1.posX.value = posX;
}