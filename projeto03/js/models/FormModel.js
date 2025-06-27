class FormModel {
  constructor() {
    this.formData = {
      name: "",
      email: "",
      cpf: "",
      phone: "",
    };

    this.validationRules = {
      name: {
        required: true,
        pattern: /^[a-zA-ZÀ-ÿ\s]{2,50}$/,
        message: "Nome deve conter apenas letras e ter entre 2-50 caracteres",
      },
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Email inválido",
      },
      cpf: {
        required: true,
        message: "CPF inválido",
      },
      phone: {
        required: true,
        pattern: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
        message: "Telefone inválido. Use o formato (00) 00000-0000",
      },
    };
  }

  setFormData(field, value) {
    if (this.formData.hasOwnProperty(field)) {
      this.formData[field] = value;
    }
  }

  getFormData() {
    return { ...this.formData };
  }

  clearFormData() {
    this.formData = {
      name: "",
      email: "",
      cpf: "",
      phone: "",
    };
  }

  validateName(name) {
    const rule = this.validationRules.name;
    if (!name.trim()) {
      return { isValid: false, message: "Nome é obrigatório" };
    }
    if (!rule.pattern.test(name.trim())) {
      return { isValid: false, message: rule.message };
    }
    return { isValid: true, message: "" };
  }

  validateEmail(email) {
    const rule = this.validationRules.email;
    if (!email.trim()) {
      return { isValid: false, message: "Email é obrigatório" };
    }
    if (!rule.pattern.test(email.trim())) {
      return { isValid: false, message: rule.message };
    }
    return { isValid: true, message: "" };
  }

  validateCPF(cpf) {
    if (!cpf.trim()) {
      return { isValid: false, message: "CPF é obrigatório" };
    }

    const cleanCPF = cpf.replace(/[^\d]/g, "");

    if (cleanCPF.length !== 11) {
      return { isValid: false, message: "CPF inválido" };
    }

    if (/^(\d)\1+$/.test(cleanCPF)) {
      return { isValid: false, message: "CPF inválido" };
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let firstDigit = 11 - (sum % 11);
    if (firstDigit >= 10) firstDigit = 0;

    if (parseInt(cleanCPF.charAt(9)) !== firstDigit) {
      return { isValid: false, message: "CPF inválido" };
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    let secondDigit = 11 - (sum % 11);
    if (secondDigit >= 10) secondDigit = 0;

    if (parseInt(cleanCPF.charAt(10)) !== secondDigit) {
      return { isValid: false, message: "CPF inválido" };
    }

    return { isValid: true, message: "" };
  }

  validatePhone(phone) {
    const rule = this.validationRules.phone;
    if (!phone.trim()) {
      return { isValid: false, message: "Telefone é obrigatório" };
    }
    if (!rule.pattern.test(phone)) {
      return { isValid: false, message: rule.message };
    }
    return { isValid: true, message: "" };
  }

  validateAllFields() {
    const results = {
      name: this.validateName(this.formData.name),
      email: this.validateEmail(this.formData.email),
      cpf: this.validateCPF(this.formData.cpf),
      phone: this.validatePhone(this.formData.phone),
    };

    const isValid = Object.values(results).every((result) => result.isValid);
    return { isValid, results };
  }

  formatCPF(value) {
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return value;
  }

  formatPhone(value) {
    value = value.replace(/\D/g, "");
    if (value.length <= 10) {
      value = value.replace(/(\d{2})(\d)/, "($1) $2");
      value = value.replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      value = value.replace(/(\d{2})(\d)/, "($1) $2");
      value = value.replace(/(\d{5})(\d)/, "$1-$2");
    }
    return value;
  }
}
