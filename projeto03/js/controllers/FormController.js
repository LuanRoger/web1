class FormController {
  constructor(formModel, formView) {
    this.formModel = formModel;
    this.formView = formView;
    this.init();
  }

  init() {
    this.formView.renderForm();
    this.bindFormEvents();
  }

  bindFormEvents() {
    const form = document.getElementById("subscriptionForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const cpfInput = document.getElementById("cpf");
    const phoneInput = document.getElementById("phone");

    if (!form) return;

    cpfInput?.addEventListener("input", (e) => {
      const formatted = this.formModel.formatCPF(e.target.value);
      e.target.value = formatted;
      this.formModel.setFormData("cpf", formatted);

      if (formatted.length > 0) {
        const validation = this.formModel.validateCPF(formatted);
        if (validation.isValid) {
          this.formView.showSuccess("cpf");
        } else {
          this.formView.clearValidation("cpf");
        }
      }
    });

    phoneInput?.addEventListener("input", (e) => {
      const formatted = this.formModel.formatPhone(e.target.value);
      e.target.value = formatted;
      this.formModel.setFormData("phone", formatted);

      if (formatted.length > 0) {
        const validation = this.formModel.validatePhone(formatted);
        if (validation.isValid) {
          this.formView.showSuccess("phone");
        } else {
          this.formView.clearValidation("phone");
        }
      }
    });

    nameInput?.addEventListener("blur", (e) => {
      this.formModel.setFormData("name", e.target.value);
      const validation = this.formModel.validateName(e.target.value);

      if (e.target.value.length > 0) {
        if (validation.isValid) {
          this.formView.showSuccess("name");
        } else {
          this.formView.showError("name", validation.message);
        }
      }
    });

    emailInput?.addEventListener("blur", (e) => {
      this.formModel.setFormData("email", e.target.value);
      const validation = this.formModel.validateEmail(e.target.value);

      if (e.target.value.length > 0) {
        if (validation.isValid) {
          this.formView.showSuccess("email");
        } else {
          this.formView.showError("email", validation.message);
        }
      }
    });

    [nameInput, emailInput, cpfInput, phoneInput].forEach((input) => {
      input?.addEventListener("focus", (e) => {
        const fieldName = e.target.id;
        this.formView.clearValidation(fieldName);
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleFormSubmission();
    });
  }

  handleFormSubmission() {
    const formElements = document.getElementById("subscriptionForm").elements;
    this.formModel.setFormData("name", formElements.name.value);
    this.formModel.setFormData("email", formElements.email.value);
    this.formModel.setFormData("cpf", formElements.cpf.value);
    this.formModel.setFormData("phone", formElements.phone.value);

    const validation = this.formModel.validateAllFields();

    if (validation.isValid) {
      this.submitForm();
    } else {
      this.showValidationErrors(validation.results);
    }
  }

  showValidationErrors(results) {
    Object.keys(results).forEach((field) => {
      const result = results[field];
      if (!result.isValid) {
        this.formView.showError(field, result.message);
      } else {
        this.formView.showSuccess(field);
      }
    });
  }

  async submitForm() {
    this.formView.setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    this.formView.setLoading(false);
    this.formView.showSuccessMessage();
    this.formView.resetForm();
    this.formModel.clearFormData();

    setTimeout(() => {
      this.formView.hideSuccessMessage();
    }, 5000);
  }
}
