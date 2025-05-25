document.addEventListener("DOMContentLoaded", function () {
  const eventTitle = document.querySelector(".event-title");
  const eventDetailsModal = document.getElementById("eventDetailsModal");
  const closeModalBtn = document.querySelector(".close-modal");
  const modalOverlay = document.querySelector(".modal-overlay");

  const eventDetails = {
    name: "The Last Dance",
    date: "26 de Junho de 2025",
    location: "Spotify Camp Nou, Barcelona - Espanha",
    capacity: "99.354 espectadores",
    duration: "Aproximadamente 8 horas",
    ticketPrice: "A partir de R$ 150,00",
    description:
      "Um evento histórico que marca o último encontro entre duas lendas do futebol mundial.",
    highlights: [
      "Última partida entre Messi e Cristiano Ronaldo",
      "Evento 100% beneficente",
      "Show musical no intervalo",
      "Sessão de autógrafos exclusiva",
      "Jantar beneficente com leilão",
      "Transmissão mundial ao vivo",
    ],
    teams: {
      team1: "Time de Messi - Seleção de Estrelas da América do Sul",
      team2: "Time de Ronaldo - Seleção de Estrelas da Europa",
    },
  };

  function populateEventDetails() {
    document.getElementById("modalEventName").textContent = eventDetails.name;
    document.getElementById("modalEventDate").textContent = eventDetails.date;
    document.getElementById("modalEventLocation").textContent =
      eventDetails.location;
    document.getElementById("modalEventCapacity").textContent =
      eventDetails.capacity;
    document.getElementById("modalEventDuration").textContent =
      eventDetails.duration;
    document.getElementById("modalEventPrice").textContent =
      eventDetails.ticketPrice;
    document.getElementById("modalEventDescription").textContent =
      eventDetails.description;
    document.getElementById("modalTeam1").textContent =
      eventDetails.teams.team1;
    document.getElementById("modalTeam2").textContent =
      eventDetails.teams.team2;

    const highlightsList = document.getElementById("modalEventHighlights");
    highlightsList.innerHTML = "";
    eventDetails.highlights.forEach((highlight) => {
      const li = document.createElement("li");
      li.textContent = highlight;
      highlightsList.appendChild(li);
    });
  }

  function showModal() {
    populateEventDetails();
    eventDetailsModal.style.display = "flex";
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      eventDetailsModal.classList.add("show");
    }, 10);
  }

  function hideModal() {
    eventDetailsModal.classList.remove("show");
    setTimeout(() => {
      eventDetailsModal.style.display = "none";
      document.body.style.overflow = "auto";
    }, 300);
  }

  eventTitle.addEventListener("click", showModal);
  closeModalBtn.addEventListener("click", hideModal);
  modalOverlay.addEventListener("click", hideModal);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && eventDetailsModal.style.display === "flex") {
      hideModal();
    }
  });

  eventTitle.style.cursor = "pointer";
  eventTitle.title = "Clique para ver detalhes do evento";
});
