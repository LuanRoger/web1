class ModalController {
  constructor(eventModel, modalView) {
    this.eventModel = eventModel;
    this.modalView = modalView;
    this.init();
  }

  init() {
    this.bindModalEvents();
  }

  bindModalEvents() {
    const eventTitle = document.querySelector(".event-title");
    const closeBtn = document.querySelector(".close-modal");
    const modalOverlay = document.querySelector(".modal-overlay");

    if (eventTitle) {
      eventTitle.style.cursor = "pointer";
      eventTitle.title = "Clique para ver detalhes do evento";
      eventTitle.addEventListener("click", () => this.showModal());
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.hideModal());
    }

    if (modalOverlay) {
      modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
          this.hideModal();
        }
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.hideModal();
      }
    });
  }

  async showModal() {
    try {
      const eventData = await this.eventModel.getEventData();
      this.modalView.renderModalContent(eventData);
      this.modalView.showModal();
    } catch (error) {
      console.error('Error showing modal:', error);
    }
  }

  hideModal() {
    this.modalView.hideModal();
  }
}
