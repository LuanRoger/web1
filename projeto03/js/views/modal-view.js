class ModalView {
  constructor() {
    this.elements = {
      modal: document.getElementById("eventDetailsModal"),
      closeBtn: document.querySelector(".close-modal"),
      overlay: document.querySelector(".modal-overlay"),
    };
  }

  renderModalContent(eventData) {
    const modalContent = document.querySelector(".modal-content");
    if (!modalContent) return;

    modalContent.innerHTML = `
      <div class="modal-section">
        <h3>Informações do Evento</h3>
        <div class="event-info-grid">
          <div class="info-item">
            <span class="info-label">Data</span>
            <span id="modalEventDate" class="info-value">${
              eventData.date
            }</span>
          </div>
          <div class="info-item">
            <span class="info-label">Local</span>
            <span id="modalEventLocation" class="info-value">${
              eventData.location
            }</span>
          </div>
          <div class="info-item">
            <span class="info-label">Capacidade</span>
            <span id="modalEventCapacity" class="info-value">${
              eventData.capacity
            }</span>
          </div>
          <div class="info-item">
            <span class="info-label">Duração</span>
            <span id="modalEventDuration" class="info-value">${
              eventData.duration
            }</span>
          </div>
          <div class="info-item">
            <span class="info-label">Ingressos</span>
            <span id="modalEventPrice" class="info-value">${
              eventData.ticketPrice
            }</span>
          </div>
        </div>
      </div>
      <div class="modal-section">
        <h3>Sobre o Evento</h3>
        <p id="modalEventDescription">${eventData.description}</p>
      </div>
      <div class="modal-section">
        <h3>Destaques do Evento</h3>
        <ul id="modalEventHighlights" class="highlights-list">
          ${eventData.highlights
            .map((highlight) => `<li>${highlight}</li>`)
            .join("")}
        </ul>
      </div>
      <div class="modal-section">
        <h3>Equipes</h3>
        <div class="teams-section">
          <div class="team-info">
            <h4 style="color: #00bcd4; margin-bottom: 0.5rem">Time do Messi</h4>
            <p id="modalTeam1">${eventData.teams.team1}</p>
          </div>
          <div class="team-info">
            <h4 style="color: #ff5722; margin-bottom: 0.5rem">Time do Ronaldo</h4>
            <p id="modalTeam2">${eventData.teams.team2}</p>
          </div>
        </div>
      </div>
    `;
  }

  showModal() {
    if (this.elements.modal) {
      this.elements.modal.style.display = "flex";
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        this.elements.modal.classList.add("show");
      }, 10);
    }
  }

  hideModal() {
    if (this.elements.modal) {
      this.elements.modal.classList.remove("show");
      setTimeout(() => {
        this.elements.modal.style.display = "none";
        document.body.style.overflow = "auto";
      }, 300);
    }
  }
}
