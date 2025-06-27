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
