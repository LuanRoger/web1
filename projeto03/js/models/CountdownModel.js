// Model: Manages countdown timer data and calculations
class CountdownModel {
  constructor(eventDate) {
    this.eventDate = new Date(eventDate);
    this.currentTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  setEventDate(newDate) {
    this.eventDate = new Date(newDate);
  }

  getEventDate() {
    return this.eventDate;
  }

  calculateTimeLeft() {
    const now = new Date();
    const timeLeft = this.eventDate - now;

    if (timeLeft < 0) {
      return { hasEnded: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    const newTime = { hasEnded: false, days, hours, minutes, seconds };
    
    // Check if any value has changed
    const hasChanged = {
      days: newTime.days !== this.currentTime.days,
      hours: newTime.hours !== this.currentTime.hours,
      minutes: newTime.minutes !== this.currentTime.minutes,
      seconds: newTime.seconds !== this.currentTime.seconds
    };

    // Update current time
    this.currentTime = { days, hours, minutes, seconds };

    return { ...newTime, hasChanged };
  }

  formatTimeValue(value, unit) {
    if (unit === 'days') {
      return value.toString().padStart(3, '0');
    }
    return value.toString().padStart(2, '0');
  }
}
