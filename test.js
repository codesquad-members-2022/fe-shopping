const A = "한글";
const find = "한";
const regex = new RegExp(find, "g");
const A1 = A.replace(regex, "<span class='highlight'>" + find + "</span>");
console.log(A1);

var mystring = "hello world test world";
var find1 = "world";
var regex1 = new RegExp(find1, "g");
const B = mystring.replace(
  regex1,
  "<span class='highlight'>" + find1 + "</span>"
);
console.log(B);
