const STORAGE_KEYS = {
  CART: "cafeCart",
  COUPON: "cafeAppliedCoupon",
};

const state = {
  cart: [],
  cartTotal: 0,
  appliedCoupon: null,
};

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
  { code: "CAFEDESCONTO", discount: 0.15 },
];

const elements = {
  cartList: document.getElementById("cart-list"),
  totalElement: document.getElementById("total-price-cart"),
  discountElement: document.getElementById("applied-discount"),
  couponInput: document.getElementById("cart-coupon"),
  addCouponButton: document.getElementById("cart-coupon-button"),
  removeCouponButton: document.getElementById("cart-coupon-remove-button"),
  clearButton: document.getElementById("cart-clear-button"),
  checkoutButton: document.getElementById("cart-checkout-button"),
  productButtons: {
    cafeCasa: document.getElementById("add-cart-cafe-casa"),
    cafeLeite: document.getElementById("add-cart-cafe-leite"),
    cafeCappuccino: document.getElementById("add-cart-cafe-cappuccino"),
    chaChai: document.getElementById("add-cart-cha-chai"),
  },
};

const utils = {
  formatPrice: (price) => `R$ ${price.toFixed(2)}`,

  toggleElementDisplay: (element, show) => {
    element.style.display = show ? "inline-block" : "none";
  },

  findItemById: (id) => products.find((product) => product.id === id),

  findCouponByCode: (code) => validCoupons.find((c) => c.code === code),

  showMessage: (message) => alert(message),

  logAction: (action, data = null) => {
    console.log(action, data ? data : "");
  },
};

const storageService = {
  save() {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cart));
      localStorage.setItem(
        STORAGE_KEYS.COUPON,
        state.appliedCoupon ? JSON.stringify(state.appliedCoupon) : ""
      );
      utils.logAction("Estado salvo no localStorage");
    } catch (error) {
      console.error("Erro ao salvar no localStorage:", error);
    }
  },

  load() {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
      if (savedCart) {
        state.cart = JSON.parse(savedCart);
      }

      const savedCoupon = localStorage.getItem(STORAGE_KEYS.COUPON);
      if (savedCoupon && savedCoupon !== "") {
        state.appliedCoupon = JSON.parse(savedCoupon);

        if (state.appliedCoupon) {
          elements.couponInput.value = state.appliedCoupon.code;
          utils.toggleElementDisplay(elements.addCouponButton, false);
          utils.toggleElementDisplay(elements.removeCouponButton, true);
        }
      }

      utils.logAction("Estado carregado do localStorage:", state);
    } catch (error) {
      console.error("Erro ao carregar do localStorage:", error);
      this.clear(false);
    }
  },

  clear(removeFromStorage = true) {
    state.cart = [];
    state.cartTotal = 0;
    state.appliedCoupon = null;

    if (removeFromStorage) {
      try {
        localStorage.removeItem(STORAGE_KEYS.CART);
        localStorage.removeItem(STORAGE_KEYS.COUPON);
        utils.logAction("LocalStorage limpo");
      } catch (error) {
        console.error("Erro ao limpar localStorage:", error);
      }
    }
  },
};

const cartController = {
  renderItems() {
    elements.cartList.innerHTML = "";

    if (state.cart.length === 0) {
      const emptyMsg = document.createElement("li");
      emptyMsg.textContent = "Seu carrinho está vazio";
      emptyMsg.className = "empty-cart-message";
      elements.cartList.appendChild(emptyMsg);
      return;
    }

    state.cart.forEach((item) => {
      const itemElement = document.createElement("li");
      itemElement.textContent = `${item.name} (${utils.formatPrice(
        item.price
      )})`;
      elements.cartList.appendChild(itemElement);
    });
  },

  calculateTotal() {
    return state.cart.reduce((total, item) => total + item.price, 0);
  },

  updateTotal() {
    const total = this.calculateTotal();
    state.cartTotal = total;

    if (state.appliedCoupon) {
      const { discount, code } = state.appliedCoupon;
      const discountValue = total * discount;
      state.cartTotal -= discountValue;

      elements.discountElement.textContent = `Desconto: ${
        discount * 100
      }% (${code}) - ${utils.formatPrice(discountValue)}`;
      elements.discountElement.style.display = "block";
    } else {
      elements.discountElement.style.display = "none";
    }

    elements.totalElement.textContent = `Total: ${utils.formatPrice(
      state.cartTotal
    )}`;
  },

  update() {
    this.renderItems();
    this.updateTotal();
    storageService.save();
    utils.logAction("Carrinho atualizado:", state.cart);
  },

  addItem(id) {
    const item = utils.findItemById(id);
    if (!item) {
      console.error("Produto não encontrado");
      return;
    }

    state.cart.push(item);
    utils.logAction(`Item adicionado ao carrinho:`, item);
    this.update();
  },

  reset() {
    elements.couponInput.value = "";
    utils.toggleElementDisplay(elements.removeCouponButton, false);
    utils.toggleElementDisplay(elements.addCouponButton, true);

    storageService.clear();
    this.update();
    utils.logAction("Carrinho resetado");
  },

  checkout() {
    if (state.cart.length === 0) {
      utils.showMessage("Carrinho vazio!");
      return;
    }

    const itemsSummary = state.cart
      .map((item) => `${item.name} - ${utils.formatPrice(item.price)}`)
      .join("\n");

    const discountInfo = state.appliedCoupon
      ? `\nDesconto: ${state.appliedCoupon.discount * 100}% (${
          state.appliedCoupon.code
        })`
      : "";

    utils.showMessage(
      `Compra finalizada com sucesso!\n\n` +
        `Itens:\n${itemsSummary}\n` +
        `${discountInfo}\n` +
        `Total: ${utils.formatPrice(state.cartTotal)}`
    );

    this.reset();
    utils.logAction("Compra finalizada");
  },
};

const couponController = {
  apply() {
    const couponCode = elements.couponInput.value.trim().toUpperCase();

    if (!couponCode) {
      utils.showMessage("Por favor, insira um código de cupom");
      return;
    }

    const coupon = utils.findCouponByCode(couponCode);
    if (!coupon) {
      utils.showMessage("Cupom inválido");
      return;
    }

    if (state.appliedCoupon) {
      utils.showMessage("Cupom já aplicado");
      return;
    }

    state.appliedCoupon = coupon;

    utils.toggleElementDisplay(elements.removeCouponButton, true);
    utils.toggleElementDisplay(elements.addCouponButton, false);

    cartController.update();
    utils.logAction(`Cupom aplicado:`, coupon);
  },

  remove() {
    state.appliedCoupon = null;
    elements.couponInput.value = "";

    utils.toggleElementDisplay(elements.removeCouponButton, false);
    utils.toggleElementDisplay(elements.addCouponButton, true);

    cartController.update();
    utils.logAction("Cupom removido");
  },
};

function initApp() {
  storageService.load();

  elements.productButtons.cafeCasa.addEventListener("click", () =>
    cartController.addItem(1)
  );
  elements.productButtons.cafeLeite.addEventListener("click", () =>
    cartController.addItem(2)
  );
  elements.productButtons.cafeCappuccino.addEventListener("click", () =>
    cartController.addItem(3)
  );
  elements.productButtons.chaChai.addEventListener("click", () =>
    cartController.addItem(4)
  );

  elements.addCouponButton.addEventListener("click", couponController.apply);
  elements.removeCouponButton.addEventListener(
    "click",
    couponController.remove
  );

  if (!state.appliedCoupon) {
    utils.toggleElementDisplay(elements.removeCouponButton, false);
  }

  elements.clearButton.addEventListener("click", () => cartController.reset());
  elements.checkoutButton.addEventListener("click", () =>
    cartController.checkout()
  );

  cartController.update();
}

document.addEventListener("DOMContentLoaded", initApp);
