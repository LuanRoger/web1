class FormView {
  constructor() {
    this.elements = {
      form: document.getElementById("subscriptionForm"),
      nameInput: document.getElementById("name"),
      emailInput: document.getElementById("email"),
      cpfInput: document.getElementById("cpf"),
      phoneInput: document.getElementById("phone"),
      submitButton: null,
      successMessage: document.getElementById("successMessage"),
    };
  }

  renderForm() {
    const form = this.elements.form;
    if (!form) return;

    form.innerHTML = `
      <div class="form-group">
        <label for="name" class="form-label">Nome Completo</label>
        <input type="text" id="name" name="name" class="form-input" placeholder="Digite seu nome completo" required />
        <span class="error-message" id="nameError"></span>
      </div>
      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input type="email" id="email" name="email" class="form-input" placeholder="Digite seu email" required />
        <span class="error-message" id="emailError"></span>
      </div>
      <div class="form-group">
        <label for="cpf" class="form-label">CPF</label>
        <input type="text" id="cpf" name="cpf" class="form-input" placeholder="000.000.000-00" maxlength="14" required />
        <span class="error-message" id="cpfError"></span>
      </div>
      <div class="form-group">
        <label for="phone" class="form-label">Telefone</label>
        <input type="tel" id="phone" name="phone" class="form-input" placeholder="(00) 00000-0000" maxlength="15" required />
        <span class="error-message" id="phoneError"></span>
      </div>
      <button type="submit" class="submit-button gothic-font">Confirmar Inscrição</button>
      <div class="success-message" id="successMessage">
        <p>✅ Inscrição realizada com sucesso! Você receberá um email de confirmação em breve.</p>
      </div>
    `;

    this.elements = {
      form: document.getElementById("subscriptionForm"),
      nameInput: document.getElementById("name"),
      emailInput: document.getElementById("email"),
      cpfInput: document.getElementById("cpf"),
      phoneInput: document.getElementById("phone"),
      submitButton: form.querySelector(".submit-button"),
      successMessage: document.getElementById("successMessage"),
    };
  }

  showError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}Error`);
    const inputElement = document.getElementById(fieldName);

    if (errorElement) errorElement.textContent = message;
    if (inputElement) {
      inputElement.classList.add("error");
      inputElement.classList.remove("success");
    }
  }

  showSuccess(fieldName) {
    const errorElement = document.getElementById(`${fieldName}Error`);
    const inputElement = document.getElementById(fieldName);

    if (errorElement) errorElement.textContent = "";
    if (inputElement) {
      inputElement.classList.remove("error");
      inputElement.classList.add("success");
    }
  }

  clearValidation(fieldName) {
    const errorElement = document.getElementById(`${fieldName}Error`);
    const inputElement = document.getElementById(fieldName);

    if (errorElement) errorElement.textContent = "";
    if (inputElement) {
      inputElement.classList.remove("error", "success");
    }
  }

  setLoading(isLoading) {
    if (this.elements.submitButton) {
      if (isLoading) {
        this.elements.submitButton.classList.add("loading");
        this.elements.submitButton.disabled = true;
      } else {
        this.elements.submitButton.classList.remove("loading");
        this.elements.submitButton.disabled = false;
      }
    }
  }

  showSuccessMessage() {
    if (this.elements.successMessage) {
      this.elements.successMessage.style.display = "block";
      this.elements.successMessage.scrollIntoView({ behavior: "smooth" });
    }
  }

  hideSuccessMessage() {
    if (this.elements.successMessage) {
      this.elements.successMessage.style.display = "none";
    }
  }

  resetForm() {
    if (this.elements.form) {
      this.elements.form.reset();
    }
    ["name", "email", "cpf", "phone"].forEach((field) =>
      this.clearValidation(field)
    );
  }
}
