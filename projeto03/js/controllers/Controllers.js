class HeaderController {
  constructor(eventModel, headerView) {
    this.eventModel = eventModel;
    this.headerView = headerView;
    this.init();
  }

  init() {
    this.renderHeader();
    this.bindNavigationEvents();
  }

  renderHeader() {
    const playersData = this.eventModel.getPlayersData();
    const navigationData = this.eventModel.getNavigationData();

    this.headerView.renderPlayerComparison(playersData);
    this.headerView.renderNavigation(navigationData);
  }

  bindNavigationEvents() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }
}

class PlayerController {
  constructor(eventModel, playerView) {
    this.eventModel = eventModel;
    this.playerView = playerView;
    this.init();
  }

  init() {
    this.renderPlayers();
  }

  renderPlayers() {
    const playersData = this.eventModel.getPlayersData();

    Object.keys(playersData).forEach((playerKey) => {
      this.playerView.renderPlayerSection(playerKey, playersData[playerKey]);
    });
  }
}

class AboutController {
  constructor(eventModel, aboutView) {
    this.eventModel = eventModel;
    this.aboutView = aboutView;
    this.init();
  }

  init() {
    this.renderAbout();
  }

  renderAbout() {
    const aboutContent = this.eventModel.getAboutContent();
    this.aboutView.renderAboutSection(aboutContent);
  }
}

class ScheduleController {
  constructor(eventModel, scheduleView) {
    this.eventModel = eventModel;
    this.scheduleView = scheduleView;
    this.init();
  }

  init() {
    this.renderSchedule();
  }

  renderSchedule() {
    const scheduleData = this.eventModel.getScheduleData();
    this.scheduleView.renderSchedule(scheduleData);
  }
}

class CountdownController {
  constructor(countdownModel, countdownView) {
    this.countdownModel = countdownModel;
    this.countdownView = countdownView;
    this.interval = null;
    this.init();
  }

  init() {
    this.countdownView.renderCountdown();
    this.startCountdown();
  }

  startCountdown() {
    this.updateCountdown();
    this.interval = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  updateCountdown() {
    const timeData = this.countdownModel.calculateTimeLeft();

    if (timeData.hasEnded) {
      this.handleEventEnded();
      return;
    }

    this.countdownView.updateCountdownDisplay(timeData);
  }

  handleEventEnded() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  changeEventDate(newDate) {
    this.countdownModel.setEventDate(newDate);
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.startCountdown();
  }

  destroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

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

class ModalController {
  constructor(eventModel, modalView) {
    this.eventModel = eventModel;
    this.modalView = modalView;
    this.init();
  }

  init() {
    this.bindModalEvents();
  }

  bindModalEvents() {
    const eventTitle = document.querySelector(".event-title");
    const closeBtn = document.querySelector(".close-modal");
    const modalOverlay = document.querySelector(".modal-overlay");

    if (eventTitle) {
      eventTitle.style.cursor = "pointer";
      eventTitle.title = "Clique para ver detalhes do evento";
      eventTitle.addEventListener("click", () => this.showModal());
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.hideModal());
    }

    if (modalOverlay) {
      modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
          this.hideModal();
        }
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.hideModal();
      }
    });
  }

  showModal() {
    const eventData = this.eventModel.getEventData();
    this.modalView.renderModalContent(eventData);
    this.modalView.showModal();
  }

  hideModal() {
    this.modalView.hideModal();
  }
}

class FooterController {
  constructor(eventModel, footerView) {
    this.eventModel = eventModel;
    this.footerView = footerView;
    this.init();
  }

  init() {
    this.renderFooter();
  }

  renderFooter() {
    const socialLinks = this.eventModel.getSocialLinks();
    this.footerView.renderFooter(socialLinks);
  }
}
