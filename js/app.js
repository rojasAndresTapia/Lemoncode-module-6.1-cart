'use strict';

// IVA
const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;

// Lista de productos
const products = [
  {
    description: 'Goma de borrar',
    price: 0.25,
    tax: LOWER_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: 'Lápiz H2',
    price: 0.4,
    tax: LOWER_TYPE,
    stock: 5,
    units: 0,
  },
  {
    description: 'Cinta rotular',
    price: 9.3,
    tax: REGULAR_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: 'Papelera plástico',
    price: 2.75,
    tax: REGULAR_TYPE,
    stock: 5,
    units: 0,
  },
  {
    description: 'Escuadra',
    price: 8.4,
    tax: REGULAR_TYPE,
    stock: 3,
    units: 0,
  },
];

// Variables globales
const container = document.getElementById('product-list-container');
const calculateButton = document.getElementById('calculate');

calculateButton.disabled = true;

// Definición de funciones
const createDescription = (data, tax) => {
  let description = document.createElement('span');
  description.setAttribute('class', 'productDescription');
  description.setAttribute('tax', tax);
  container.appendChild(description);
  description.innerHTML = data;
};

const createPrice = (data) => {
  let price = document.createElement('span');
  price.setAttribute('class', 'productPrice');
  container.appendChild(price);
  price.innerHTML = data + ' €';
};

const createInput = (product) => {
  let input = document.createElement('input');
  let inputTitle = document.createElement('p');
  input.setAttribute('class', 'productInput');
  input.setAttribute('value', 0);
  input.setAttribute('min', 0);
  input.setAttribute('id', 'input');
  input.setAttribute('max', product.stock);
  input.setAttribute('type', 'number');
  container.appendChild(inputTitle);
  inputTitle.textContent = 'Cantidad:';
  inputTitle.setAttribute('class', 'inputTitle');
  container.appendChild(input);

  const handleInput = (ev) => {
    input.value > 0
      ? (calculateButton.disabled = false)
      : (calculateButton.disabled = true);
    return (product.units = ev.target.valueAsNumber);
  };

  input.addEventListener('change', handleInput);
};

// crear lista de productos
const createList = () => {
  for (let product of products) {
    createProductBox();
    let productDescription = product.description;
    let productPrice = product.price;
    let productTax = product.tax;
    createDescription(productDescription, productTax);
    createPrice(productPrice);
    createInput(product);
  }
};

const createProductBox = () => {
  let productContainer = document.createElement('div');
  container.appendChild(productContainer);
  productContainer.classList.add('productBox');
};

createList();

// Calcular precio
const productPrice = () => {
  let total = 0;

  for (let element of products) {
    let productPrice = element.price;
    let productUnits = element.units;
    let productTaxPrice = (element.tax * productPrice) / 100 + productPrice;
    total += productTaxPrice * productUnits;
  }

  const totalElement = document.createElement('p');
  container.appendChild(totalElement);
  totalElement.innerHTML =
    'El total de la compra es: ' + total.toFixed(2) + ' €';
  return total;
};

// Boton calcular precio total
const handleCalculateButton = () => {
  productPrice();
  totalElement.innerHTML = '';
};

// Eventos
calculateButton.addEventListener('click', handleCalculateButton);
