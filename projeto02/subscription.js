function validateName(name) {
  const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;
  return nameRegex.test(name.trim());
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

function validateCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, "");

  if (cpf.length !== 11) return false;

  if (/^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let firstDigit = 11 - (sum % 11);
  if (firstDigit >= 10) firstDigit = 0;

  if (parseInt(cpf.charAt(9)) !== firstDigit) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  let secondDigit = 11 - (sum % 11);
  if (secondDigit >= 10) secondDigit = 0;

  return parseInt(cpf.charAt(10)) === secondDigit;
}

function validatePhone(phone) {
  const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
  return phoneRegex.test(phone);
}

function formatCPF(value) {
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return value;
}

function formatPhone(value) {
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

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  const inputElement = document.getElementById(elementId.replace("Error", ""));

  errorElement.textContent = message;
  inputElement.classList.add("error");
  inputElement.classList.remove("success");
}

function showSuccess(elementId) {
  const errorElement = document.getElementById(elementId);
  const inputElement = document.getElementById(elementId.replace("Error", ""));

  errorElement.textContent = "";
  inputElement.classList.remove("error");
  inputElement.classList.add("success");
}

function clearError(elementId) {
  const errorElement = document.getElementById(elementId);
  const inputElement = document.getElementById(elementId.replace("Error", ""));

  errorElement.textContent = "";
  inputElement.classList.remove("error", "success");
}

function validateForm() {
  let isValid = true;

  const name = document.getElementById("name").value;
  if (!name.trim()) {
    showError("nameError", "Nome é obrigatório");
    isValid = false;
  } else if (!validateName(name)) {
    showError(
      "nameError",
      "Nome deve conter apenas letras e ter entre 2-50 caracteres"
    );
    isValid = false;
  } else {
    showSuccess("nameError");
  }

  const email = document.getElementById("email").value;
  if (!email.trim()) {
    showError("emailError", "Email é obrigatório");
    isValid = false;
  } else if (!validateEmail(email)) {
    showError("emailError", "Email inválido");
    isValid = false;
  } else {
    showSuccess("emailError");
  }

  const cpf = document.getElementById("cpf").value;
  if (!cpf.trim()) {
    showError("cpfError", "CPF é obrigatório");
    isValid = false;
  } else if (!validateCPF(cpf)) {
    showError("cpfError", "CPF inválido");
    isValid = false;
  } else {
    showSuccess("cpfError");
  }

  const phone = document.getElementById("phone").value;
  if (!phone.trim()) {
    showError("phoneError", "Telefone é obrigatório");
    isValid = false;
  } else if (!validatePhone(phone)) {
    showError("phoneError", "Telefone inválido. Use o formato (00) 00000-0000");
    isValid = false;
  } else {
    showSuccess("phoneError");
  }

  return isValid;
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("subscriptionForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const cpfInput = document.getElementById("cpf");
  const phoneInput = document.getElementById("phone");
  const submitButton = form.querySelector(".submit-button");
  const successMessage = document.getElementById("successMessage");

  cpfInput.addEventListener("input", function (e) {
    e.target.value = formatCPF(e.target.value);
    if (e.target.value.length > 0) {
      if (validateCPF(e.target.value)) {
        showSuccess("cpfError");
      } else {
        clearError("cpfError");
      }
    }
  });

  phoneInput.addEventListener("input", function (e) {
    e.target.value = formatPhone(e.target.value);
    if (e.target.value.length > 0) {
      if (validatePhone(e.target.value)) {
        showSuccess("phoneError");
      } else {
        clearError("phoneError");
      }
    }
  });

  nameInput.addEventListener("blur", function (e) {
    if (e.target.value.length > 0) {
      if (validateName(e.target.value)) {
        showSuccess("nameError");
      } else {
        showError(
          "nameError",
          "Nome deve conter apenas letras e ter entre 2-50 caracteres"
        );
      }
    }
  });

  emailInput.addEventListener("blur", function (e) {
    if (e.target.value.length > 0) {
      if (validateEmail(e.target.value)) {
        showSuccess("emailError");
      } else {
        showError("emailError", "Email inválido");
      }
    }
  });

  [nameInput, emailInput, cpfInput, phoneInput].forEach((input) => {
    input.addEventListener("focus", function (e) {
      const errorId = e.target.id + "Error";
      clearError(errorId);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm()) {
      submitButton.classList.add("loading");
      submitButton.disabled = true;

      setTimeout(() => {
        submitButton.classList.remove("loading");
        submitButton.disabled = false;

        successMessage.style.display = "block";

        form.reset();

        ["nameError", "emailError", "cpfError", "phoneError"].forEach(
          clearError
        );

        setTimeout(() => {
          successMessage.style.display = "none";
        }, 5000);

        successMessage.scrollIntoView({ behavior: "smooth" });
      }, 2000);
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});
