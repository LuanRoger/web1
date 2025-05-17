let cart = [];
let cartTotal = 0;
let appliedCoupon = null;

const products = [
  { id: 1, name: "Café de casa", price: 5 },
  { id: 2, name: "Café com leite", price: 2 },
  { id: 3, name: "Cappuccino", price: 7 },
  { id: 4, name: "Chá Chai", price: 4.5 },
];

const validCoupons = [
  { code: "CAFRED", discount: 0.1 },
  { code: "ASSASSINO", discount: 0.2 },
  { code: "MORNINGBOOST", discount: 0.18 },
];

function renderCartItems() {
  const cartElement = document.getElementById("cart-list");
  cartElement.innerHTML = "";

  const cartItems = cart.map((item) => {
    const itemElement = document.createElement("li");
    itemElement.textContent = `${item.name} (R$ ${item.price})`;
    return itemElement;
  });

  cartItems.forEach((item) => {
    cartElement.appendChild(item);
  });
}

function updateTotal() {
  const totalElement = document.getElementById("total-price-cart");
  const discountedTotalElement = document.getElementById("applied-discount");
  const total = cart.reduce((total, item) => total + item.price, 0);
  cartTotal = total;

  if (appliedCoupon) {
    const { discount, code } = appliedCoupon;
    const discountValue = total * discount;
    cartTotal -= discountValue;

    discountedTotalElement.textContent = `Desconto: ${
      discount * 100
    }% (${code}) - R$ ${discountValue.toFixed(2)}`;
    discountedTotalElement.style.display = "block";
  } else {
    discountedTotalElement.style.display = "none";
  }

  totalElement.textContent = `Total: R$ ${cartTotal.toFixed(2)}`;
}

function updateCart() {
  renderCartItems();
  updateTotal();

  console.log("Corrinho atualizado");
}

function addToCart(id) {
  const item = products.find((product) => product.id === id);
  cart.push(item);

  console.log(`Item ${item} adicionado ao carrinho`);
  updateCart();
}

function applyCoupon() {
  const addCouponButton = document.getElementById("cart-coupon-button");
  const removeCouponButton = document.getElementById(
    "cart-coupon-remove-button"
  );
  const couponInput = document.getElementById("cart-coupon");
  const couponCode = couponInput.value;
  const coupon = validCoupons.find((c) => c.code === couponCode);
  if (!coupon) {
    alert("Cupom inválido");
    return;
  }
  if (appliedCoupon) {
    alert("Cupom já aplicado");
    return;
  }

  appliedCoupon = coupon;

  removeCouponButton.style.display = "inline-block";
  addCouponButton.style.display = "none";

  updateCart();
  console.log(`Cupom aplicado: ${couponCode}`);
}

function removeCoupon() {
  const couponInput = document.getElementById("cart-coupon");
  const removeCouponButton = document.getElementById(
    "cart-coupon-remove-button"
  );
  const addCouponButton = document.getElementById("cart-coupon-button");

  appliedCoupon = null;
  couponInput.value = "";

  removeCouponButton.style.display = "none";
  addCouponButton.style.display = "inline-block";

  updateCart();
  console.log("Cupom removido");
}

function resetCart() {
  const removeCouponButton = document.getElementById(
    "cart-coupon-remove-button"
  );
  const addCouponButton = document.getElementById("cart-coupon-button");
  const couponInput = document.getElementById("cart-coupon");

  cart = [];
  cartTotal = 0;
  appliedCoupon = null;

  couponInput.value = "";

  removeCouponButton.style.display = "none";
  addCouponButton.style.display = "inline-block";

  updateCart();
  console.log("Carrinho resetado");
}

function checkout() {
  if (cart.length === 0) {
    alert("Carrinho vazio!");
    return;
  }

  alert(
    "Compra finalizada com sucesso!. \n" +
      `Total: R$ ${cartTotal.toFixed(2)}\n` +
      `Cupom aplicado: ${appliedCoupon ? appliedCoupon.code : "Nenhum"}`
  );
  resetCart();

  console.log("Compra finalizada");
}

function initialize() {
  const cafeCasaAddCartButton = document.getElementById("add-cart-cafe-casa");
  const cafeLeiteAddCartButton = document.getElementById("add-cart-cafe-leite");
  const cappuccinoAddCartButton = document.getElementById(
    "add-cart-cafe-cappuccino"
  );
  const chaChaiAddCartButton = document.getElementById("add-cart-cha-chai");

  cafeCasaAddCartButton.addEventListener("click", () => addToCart(1));
  cafeLeiteAddCartButton.addEventListener("click", () => addToCart(2));
  cappuccinoAddCartButton.addEventListener("click", () => addToCart(3));
  chaChaiAddCartButton.addEventListener("click", () => addToCart(4));

  const couponButton = document.getElementById("cart-coupon-button");
  const removeCouponButton = document.getElementById(
    "cart-coupon-remove-button"
  );

  couponButton.addEventListener("click", applyCoupon);
  removeCouponButton.addEventListener("click", removeCoupon);

  const resetButton = document.getElementById("cart-clear-button");
  const checkoutButton = document.getElementById("cart-checkout-button");

  resetButton.addEventListener("click", resetCart);
  checkoutButton.addEventListener("click", checkout);
}

initialize();
