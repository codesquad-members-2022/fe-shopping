fetch("http://localhost:3000/fakeDB")
  .then((res) => res.json())
  .then(json => console.log(json));