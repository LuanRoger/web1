class AboutController {
  constructor(eventModel, aboutView) {
    this.eventModel = eventModel;
    this.aboutView = aboutView;
    this.init();
  }

  init() {
    this.renderAbout();
  }

  async renderAbout() {
    try {
      const aboutContent = await this.eventModel.getAboutContent();
      this.aboutView.renderAboutSection(aboutContent);
    } catch (error) {
      console.error("Error rendering about section:", error);
    }
  }
}
