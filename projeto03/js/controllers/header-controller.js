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

  async renderHeader() {
    try {
      const playersData = await this.eventModel.getPlayersData();
      const navigationData = this.eventModel.getNavigationData();

      this.headerView.renderPlayerComparison(playersData);
      this.headerView.renderNavigation(navigationData);
    } catch (error) {
      console.error('Error rendering header:', error);
    }
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
