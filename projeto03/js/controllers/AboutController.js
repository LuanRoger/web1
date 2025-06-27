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