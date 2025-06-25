// Main Application Controller - Coordinates all MVC components
class AppController {
  constructor() {
    this.models = {};
    this.views = {};
    this.controllers = {};
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeApp());
    } else {
      this.initializeApp();
    }
  }

  initializeApp() {
    this.initializeModels();
    this.initializeViews();
    this.initializeControllers();
  }

  initializeModels() {
    // Initialize all models
    this.models.event = new EventModel();
    this.models.form = new FormModel();
    this.models.countdown = new CountdownModel(this.models.event.getEventData().eventDate);
  }

  initializeViews() {
    // Initialize all views
    this.views.header = new HeaderView();
    this.views.player = new PlayerView();
    this.views.about = new AboutView();
    this.views.schedule = new ScheduleView();
    this.views.countdown = new CountdownView();
    this.views.form = new FormView();
    this.views.modal = new ModalView();
    this.views.footer = new FooterView();
  }

  initializeControllers() {
    // Initialize all controllers
    this.controllers.header = new HeaderController(this.models.event, this.views.header);
    this.controllers.player = new PlayerController(this.models.event, this.views.player);
    this.controllers.about = new AboutController(this.models.event, this.views.about);
    this.controllers.schedule = new ScheduleController(this.models.event, this.views.schedule);
    this.controllers.countdown = new CountdownController(this.models.countdown, this.views.countdown);
    this.controllers.form = new FormController(this.models.form, this.views.form);
    this.controllers.modal = new ModalController(this.models.event, this.views.modal);
    this.controllers.footer = new FooterController(this.models.event, this.views.footer);
  }

  // Public API methods
  changeEventDate(newDate) {
    this.models.event.updateEventDate(newDate);
    this.controllers.countdown.changeEventDate(newDate);
  }

  getEventData() {
    return this.models.event.getEventData();
  }

  // Cleanup method
  destroy() {
    if (this.controllers.countdown) {
      this.controllers.countdown.destroy();
    }
  }
}

// Initialize the application
const app = new AppController();

// Expose some global methods for backward compatibility
window.changeEventDate = (newDate) => app.changeEventDate(newDate);
window.app = app;
