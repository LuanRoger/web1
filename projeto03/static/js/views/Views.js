class HeaderView {
  constructor() {
    this.elements = {
      playerComparison: document.querySelector(".player-comparison"),
      navList: document.querySelector(".nav-list"),
    };
  }

  renderPlayerComparison(playersData) {
    if (!this.elements.playerComparison) return;

    this.elements.playerComparison.innerHTML = `
      <article class="player">
        <h1 id="messi-logo" class="player-text-logo">${playersData.messi.logo}</h1>
        <a href="#messi" class="player-name">${playersData.messi.name}</a>
      </article>
      <h1 class="versus">X</h1>
      <article class="player">
        <h1 id="ronaldo-logo" class="player-text-logo">${playersData.cr7.logo}</h1>
        <a href="#cr7" class="player-name">${playersData.cr7.name}</a>
      </article>
    `;
  }

  renderNavigation(navigationData) {
    if (!this.elements.navList) return;

    this.elements.navList.innerHTML = navigationData
      .map((item) => `<li><a href="${item.href}">${item.text}</a></li>`)
      .join("");
  }
}

class PlayerView {
  renderPlayerSection(playerKey, playerData) {
    const section = document.getElementById(playerKey);
    if (!section) return;

    section.innerHTML = `
      <span class="player-explanation">
        <h1 class="player-name-section gothic-font">${playerData.name}</h1>
        ${playerData.description.map((p) => `<p>${p}</p>`).join("")}
      </span>
      <img src="${playerData.image}" class="player-about-section-image" />
      <div class="${
        playerKey === "messi" ? "messi" : "cr7"
      }-gradient-decoration"></div>
    `;
  }
}

class AboutView {
  renderAboutSection(aboutContent) {
    const aboutSection = document.getElementById("about");
    if (!aboutSection) return;

    const aboutText = aboutSection.querySelector(".about-text");
    if (aboutText) {
      aboutText.textContent = aboutContent.subtitle;
    }

    const paragraphs = aboutSection.querySelectorAll(
      "p:not(.about-text):not(.underline-text)"
    );
    paragraphs.forEach((p, index) => {
      if (aboutContent.paragraphs[index]) {
        p.textContent = aboutContent.paragraphs[index];
      }
    });

    const underlineText = aboutSection.querySelector(".underline-text");
    if (underlineText && aboutContent.paragraphs[3]) {
      underlineText.textContent = aboutContent.paragraphs[3];
    }
  }
}

class ScheduleView {
  renderSchedule(scheduleData) {
    const table = document.querySelector(".cronograma-table");
    if (!table) return;

    table.innerHTML = `
      <thead>
        <tr>
          <th>Horário</th>
          <th>Atividade</th>
        </tr>
      </thead>
      <tbody>
        ${scheduleData
          .map(
            (item) => `
          <tr>
            <td>${item.time}</td>
            <td>${item.activity}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    `;
  }
}

class CountdownView {
  constructor() {
    this.elements = {
      days: document.getElementById("days"),
      hours: document.getElementById("hours"),
      minutes: document.getElementById("minutes"),
      seconds: document.getElementById("seconds"),
    };
  }

  renderCountdown() {
    const container = document.querySelector(".countdown-container");
    if (!container) return;

    container.innerHTML = `
      <div class="countdown-item">
        <div class="countdown-number" id="days">
          <div class="countdown-digit-wrapper">
            <span class="countdown-digit">0</span>
          </div>
          <div class="countdown-digit-wrapper">
            <span class="countdown-digit">0</span>
          </div>
          <div class="countdown-digit-wrapper">
            <span class="countdown-digit">0</span>
          </div>
        </div>
        <span class="countdown-label">Dias</span>
      </div>
      <div class="countdown-separator">:</div>
      <div class="countdown-item">
        <div class="countdown-number" id="hours">
          <div class="countdown-digit-wrapper">
            <span class="countdown-digit">0</span>
          </div>
          <div class="countdown-digit-wrapper">
            <span class="countdown-digit">0</span>
          </div>
        </div>
        <span class="countdown-label">Horas</span>
      </div>
      <div class="countdown-separator">:</div>
      <div class="countdown-item">
        <div class="countdown-number" id="minutes">
          <div class="countdown-digit-wrapper">
            <span class="countdown-digit">0</span>
          </div>
          <div class="countdown-digit-wrapper">
            <span class="countdown-digit">0</span>
          </div>
        </div>
        <span class="countdown-label">Minutos</span>
      </div>
      <div class="countdown-separator">:</div>
      <div class="countdown-item">
        <div class="countdown-number" id="seconds">
          <div class="countdown-digit-wrapper">
            <span class="countdown-digit">0</span>
          </div>
          <div class="countdown-digit-wrapper">
            <span class="countdown-digit">0</span>
          </div>
        </div>
        <span class="countdown-label">Segundos</span>
      </div>
    `;

    this.elements = {
      days: document.getElementById("days"),
      hours: document.getElementById("hours"),
      minutes: document.getElementById("minutes"),
      seconds: document.getElementById("seconds"),
    };
  }

  updateCountdownDisplay(timeData) {
    Object.keys(timeData.hasChanged).forEach((unit) => {
      if (timeData.hasChanged[unit] && this.elements[unit]) {
        this.animateNumberChange(this.elements[unit], timeData[unit], unit);
      }
    });
  }

  animateNumberChange(element, newValue, unit) {
    const digitWrappers = element.querySelectorAll(".countdown-digit-wrapper");
    let valueStr;

    if (unit === "days") {
      valueStr = newValue.toString().padStart(3, "0");
    } else {
      valueStr = newValue.toString().padStart(2, "0");
    }

    digitWrappers.forEach((wrapper, index) => {
      if (index < valueStr.length) {
        const newDigitValue =
          valueStr[valueStr.length - 1 - (digitWrappers.length - 1 - index)];
        const currentDigit = wrapper.querySelector(".countdown-digit");

        if (currentDigit && currentDigit.textContent !== newDigitValue) {
          const newDigitElement = document.createElement("span");
          newDigitElement.classList.add("countdown-digit", "slide-down-enter");
          newDigitElement.textContent = newDigitValue;

          wrapper.appendChild(newDigitElement);
          currentDigit.classList.add("slide-up-exit-active");

          requestAnimationFrame(() => {
            newDigitElement.classList.remove("slide-down-enter");
            newDigitElement.classList.add("slide-down-enter-active");
          });

          setTimeout(() => {
            if (wrapper.contains(currentDigit)) {
              wrapper.removeChild(currentDigit);
            }
            newDigitElement.classList.remove("slide-down-enter-active");
          }, 600);
        }
      }
    });
  }
}

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

class ModalView {
  constructor() {
    this.elements = {
      modal: document.getElementById("eventDetailsModal"),
      closeBtn: document.querySelector(".close-modal"),
      overlay: document.querySelector(".modal-overlay"),
    };
  }

  renderModalContent(eventData) {
    const modalContent = document.querySelector(".modal-content");
    if (!modalContent) return;

    modalContent.innerHTML = `
      <div class="modal-section">
        <h3>Informações do Evento</h3>
        <div class="event-info-grid">
          <div class="info-item">
            <span class="info-label">Data</span>
            <span id="modalEventDate" class="info-value">${
              eventData.date
            }</span>
          </div>
          <div class="info-item">
            <span class="info-label">Local</span>
            <span id="modalEventLocation" class="info-value">${
              eventData.location
            }</span>
          </div>
          <div class="info-item">
            <span class="info-label">Capacidade</span>
            <span id="modalEventCapacity" class="info-value">${
              eventData.capacity
            }</span>
          </div>
          <div class="info-item">
            <span class="info-label">Duração</span>
            <span id="modalEventDuration" class="info-value">${
              eventData.duration
            }</span>
          </div>
          <div class="info-item">
            <span class="info-label">Ingressos</span>
            <span id="modalEventPrice" class="info-value">${
              eventData.ticketPrice
            }</span>
          </div>
        </div>
      </div>
      <div class="modal-section">
        <h3>Sobre o Evento</h3>
        <p id="modalEventDescription">${eventData.description}</p>
      </div>
      <div class="modal-section">
        <h3>Destaques do Evento</h3>
        <ul id="modalEventHighlights" class="highlights-list">
          ${eventData.highlights
            .map((highlight) => `<li>${highlight}</li>`)
            .join("")}
        </ul>
      </div>
      <div class="modal-section">
        <h3>Equipes</h3>
        <div class="teams-section">
          <div class="team-info">
            <h4 style="color: #00bcd4; margin-bottom: 0.5rem">Time do Messi</h4>
            <p id="modalTeam1">${eventData.teams.team1}</p>
          </div>
          <div class="team-info">
            <h4 style="color: #ff5722; margin-bottom: 0.5rem">Time do Ronaldo</h4>
            <p id="modalTeam2">${eventData.teams.team2}</p>
          </div>
        </div>
      </div>
    `;
  }

  showModal() {
    if (this.elements.modal) {
      this.elements.modal.style.display = "flex";
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        this.elements.modal.classList.add("show");
      }, 10);
    }
  }

  hideModal() {
    if (this.elements.modal) {
      this.elements.modal.classList.remove("show");
      setTimeout(() => {
        this.elements.modal.style.display = "none";
        document.body.style.overflow = "auto";
      }, 300);
    }
  }
}

class FooterView {
  renderFooter(socialLinks) {
    const socialContainer = document.querySelector(".social-media-container");
    const eventNameFooter = document.querySelector(".event-name-footer");

    if (socialContainer) {
      socialContainer.innerHTML = socialLinks
        .map(
          (link) => `
        <a href="${link.href}" target="_blank">
          <svg viewBox="0 0 24 24" xmlns="http:
            <title>${link.title}</title>
            <path d="${link.svgPath}" />
          </svg>
        </a>
      `
        )
        .join("");
    }

    if (eventNameFooter) {
      eventNameFooter.textContent = "The Last Dance";
    }
  }
}
