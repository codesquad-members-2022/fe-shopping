var kim = { name: "kim", first: 10, second: 20 };

function sum(prefix) {
  return prefix + (this.first + this.second);
}
sum.call(kim);
console.log(sum);
console.log("sum.call(kim) : ", sum.call(kim, "=="));
