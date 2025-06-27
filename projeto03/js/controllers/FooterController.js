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
