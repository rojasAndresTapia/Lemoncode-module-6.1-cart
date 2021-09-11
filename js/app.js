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
  {
    description: 'Pizarra blanca',
    price: 5.95,
    tax: REGULAR_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: 'Afilador',
    price: 1.2,
    tax: LOWER_TYPE,
    stock: 10,
    units: 0,
  },
  {
    description: 'Libro ABC',
    price: 19,
    tax: EXEMPT_TYPE,
    stock: 2,
    units: 0,
  },
];

// Variables globales
const main = document.getElementById('product-list-container');
const calculateButton = document.getElementById('calculate');

calculateButton.disabled = true;

// Definición de funciones
const createDescription = (data, tax) => {
  let description = document.createElement('h2');
  description.setAttribute('class', 'productDescription');
  description.setAttribute('tax', tax);
  main.appendChild(description);
  description.innerHTML = data;
};

const createPrice = (data) => {
  let price = document.createElement('p');
  price.setAttribute('class', 'productPrice');
  main.appendChild(price);
  price.innerHTML = data;
};

const createInput = (product) => {
  let input = document.createElement('input');
  input.setAttribute('class', 'productInput');
  input.setAttribute('value', 0);
  input.setAttribute('min', 0);
  input.setAttribute('id', 'input');
  input.setAttribute('max', product.stock);
  input.setAttribute('type', 'number');
  main.appendChild(input);

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
    let productDescription = product.description;
    let productPrice = product.price;
    let productTax = product.tax;

    createDescription(productDescription, productTax);
    createPrice(productPrice);
    createInput(product);
  }
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

  let inputTotal = document.createElement('p');
  main.appendChild(inputTotal);
  inputTotal.innerHTML = 'El total de la compra es: ' + total.toFixed(2) + ' €';
  return total;
};

// Boton calcular precio total
let handleCalculateButton = (ev) => {
  productPrice();
};

// Eventos
calculateButton.addEventListener('click', handleCalculateButton);
