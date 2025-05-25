const EVENT_DATE = "2025-06-24 18:00:00";

class CountdownTimer {
  constructor(eventDate) {
    this.eventDate = new Date(eventDate);
    this.elements = {
      days: document.getElementById("days"),
      hours: document.getElementById("hours"),
      minutes: document.getElementById("minutes"),
      seconds: document.getElementById("seconds"),
    };
    this.previousValues = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    this.init();
  }

  init() {
    this.updateCountdown();
    this.interval = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  updateCountdown() {
    const now = new Date();
    const timeLeft = this.eventDate - now;

    if (timeLeft < 0) {
      this.handleEventPassed();
      return;
    }

    const values = this.calculateTimeLeft(timeLeft);
    this.updateDisplay(values);
  }

  calculateTimeLeft(timeLeft) {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  updateDisplay(values) {
    Object.keys(values).forEach((unit) => {
      if (values[unit] !== this.previousValues[unit]) {
        this.animateNumberChange(this.elements[unit], values[unit], unit);
        this.previousValues[unit] = values[unit];
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

          newDigitElement.offsetHeight;

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

  handleEventPassed() {
    clearInterval(this.interval);
  }

  static changeEventDate(newDate) {
    const newEventDate = new Date(newDate);
    if (window.countdownTimer) {
      clearInterval(window.countdownTimer.interval);
      window.countdownTimer = new CountdownTimer(newDate);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.countdownTimer = new CountdownTimer(EVENT_DATE);
});

window.changeEventDate = CountdownTimer.changeEventDate;
