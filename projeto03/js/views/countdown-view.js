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
