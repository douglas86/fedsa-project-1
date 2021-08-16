let data;

console.log("this is the data before fetch", data);

function fetching() {
  fetch("https://fedsa-project-1.herokuapp.com/project-1/products")
    .then((res) => {
      data = res;
      console.log("this is the data after fetch", data);
    })
    .catch((err) => console.log(err));
}

setInterval(5000, fetching());

const root = document.getElementById("root");
console.log(root);

function generateProductCard() {
  //
  const div = document.createElement("div");
  div.textContent = "This was generated with JS";
  return div;
}

function render() {
  const productCard = generateProductCard();
  root.appendChild(productCard);
}

render();
