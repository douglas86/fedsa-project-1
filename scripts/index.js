let data;

function fetching() {
  fetch("https://fedsa-project-1.herokuapp.com/project-1/products")
    .then((res) => {
      data = res;
      console.log("this is the data after fetch", data);
    })
    .catch((err) => console.log(err));
}

fetching();

const root = document.getElementById("root");

// helper function to create an element
function elements(element, classes) {
  const Element = document.createElement(element);
  Element.setAttribute("class", classes);
  return Element;
}

// helper function to create an image
function images(srcs, alts, classes) {
  const Images = document.createElement("img");
  Images.setAttribute("src", srcs);
  Images.setAttribute("alt", alts);
  Images.setAttribute("class", classes);
  return Images;
}

// helper function to create text content
function texts(elements, classes, contents) {
  const Text = document.createElement(elements);
  Text.setAttribute("class", classes);
  Text.textContent = `${contents}`;
  return Text;
}

function generateProductCard(arr) {
  // parameters for elements function
  // elements(element, class)
  const divCard = elements("div", "card");

  // parameters for elements function
  // elements(element, class)
  const divImage = elements("div", "image-container");
  divCard.appendChild(divImage);

  // parameters for images function
  // images(src, alt, class)
  const imgChair = images(`assets/chairs/${arr[0]}`, "chairs", "chair-image");
  divImage.appendChild(imgChair);

  // parameters for elements function
  // elements(element, class)
  const sections = elements("section", "text-container");
  divCard.appendChild(sections);

  // parameters for elements function
  // elements(element, class)
  const divTextTop = elements("div", "text-container-top");
  sections.appendChild(divTextTop);

  let tags = ["h3", "p"];

  // forEach loop to create h3 and p tags
  tags.forEach((item, index) => {
    // parameters for texts function
    // texts(element, class, content)
    const tag = texts(`${item}`, "", `${arr[index + 1]}`);
    divTextTop.appendChild(tag);
  });

  // parameters for elements function
  // elements(element, class)
  const divTextBottom = elements("div", "text-container-bottom");
  sections.appendChild(divTextBottom);

  // parameters for elements function
  // elements(element, class)
  const ul = elements("ul", "prices");
  divTextBottom.appendChild(ul);

  // classes for prices top and bottom
  const list = ["top", "bottom"];

  // forEach loop to create list items
  list.forEach((item, index) => {
    // parameters for texts function
    // texts(element, class, content)
    const prices = texts("li", `prices-${list[index]}`, `${arr[index + 3]}`);
    ul.appendChild(prices);
  });

  // parameters for elements function
  // elements(element, class)
  const icons = elements("div", "icons");
  divTextBottom.appendChild(icons);

  let icon = ["heart", "cart"];

  // forEach loop to create the heart and cart button
  icon.forEach((item, index) => {
    const btn = elements("button", "product-card-button");
    // parameters for elements function
    // buttons(class)
    icons.appendChild(btn);
    // parameters for images function
    // images(src, alt, class)
    const image = images(
      `assets/${icon[index]}.svg`,
      `${icon[index]}`,
      `product-card-button-${icon[index]}`
    );

    // event listener on click of cart button
    btn.addEventListener("click", () => shoppingCart.addToCart(item));
    btn.addEventListener("click", () => shoppingCart.getTotalCost(arr[4]));
    btn.appendChild(image);
  });

  return divCard;
}

function render() {
  // parameters for elements function
  // elements(element, class)
  const divCards = elements("div", "cards");

  // data for the cards to be generated
  const productData = [
    [
      "chair-5.jpg",
      "COUNTESSA",
      "A mix between class and affordability.",
      "R899.99",
      "R549.99",
    ],
    [
      "chair-6.jpg",
      "SUPREME BLACK LOTUS",
      "Imported velvet on a 4-pillar frame",
      "R2,199.99",
      "R1,249.99",
    ],
    [
      "chair-3.jpg",
      "BEACHCOMER",
      "Outdoor resistant bar stool with a smooth finish.",
      "R1,099.99",
      "R899.99",
    ],
  ];

  // for loop to generate the cards
  for (let i = 0; i < productData.length; i++) {
    const data = generateProductCard(productData[i]);
    divCards.appendChild(data);
  }

  root.appendChild(divCards);
}

render();

let totalCost = 0;

// once cart is clicked add an item to items array
const shoppingCart = (function () {
  const items = [];

  function getItems() {
    return items;
  }

  function addToCart(item) {
    items.push(item);
    console.log("items", items);
  }

  function getTotalCost(price) {
    //

    // const splitAtR = price.split('R')
    // const splitAtC = splitAtR[1].split[',']
    let removeUnwanted = parseFloat(price.replace(/\R|,/g, ""));
    totalCost += removeUnwanted;
    // return totalCost;
  }

  return {
    getItems,
    addToCart,
    getTotalCost,
  };
})();

let costs = document.getElementById("totalPrice");
costs.innerHTML = `${totalCost}`;

console.log(totalCost)

console.log(shoppingCart.getItems());
