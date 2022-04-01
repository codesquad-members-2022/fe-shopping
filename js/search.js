let animals = [
    "Cat",
    "Dog",
    "Elephant",
    "Fish",
    "Gorilla",
    "Monkey",
    "Turtle",
    "Whale",
    "Aligator",
    "Donkey",
    "Horse"
] 

let a = {
    "animals":"Cat",
    "animals":"Dog",
    "animals":"Elephant",
    "animals":"Fish",
    "animals":"Gorilla",
    "animals":"Monkey",
    "animals":"Turtle",
    "animals":"Whale",
    "animals":"Aligator",
    "animals":"Donkey",
    "animals":"Horse"
}

const result = document.querySelector('.result');
const showResultOnScreen = (word) => {
    return result.innerHTML += `<div>${word}</div>`
};


function searchAnimals(e) {
    console.log('searchAnimals function worked!');
    // console.log(e); // Object 형태이다.
    let input = e.key; // 입력받은 값.

    // console.log(input);
    // console.log(typeof input);


    for (let i = 0; i < animals.length; i++) {
        // console.log(animals[i]);
        // console.log(typeof animals[i]) // string 형태임

        animals[i].includes(input) ? showResultOnScreen(animals[i]) : '';

        // 콘솔에 목록 찍혀나오게 해놓음.
        // console.log(animals[i].includes(input) ? animals[i] : '');
    }
}



export {searchAnimals};