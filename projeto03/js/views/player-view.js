class PlayerView {
  renderPlayerSection(playerKey, playerData) {
    const section = document.getElementById(playerKey);
    if (!section) return;

    section.innerHTML = `
      <span class="player-explanation">
        <h1 class="player-name-section gothic-font">${playerData.name}</h1>
        ${playerData.description.map((p) => `<p>${p}</p>`).join("")}
      </span>
      <img src="${playerData.image}" class="player-about-section-image" />
      <div class="${
        playerKey === "messi" ? "messi" : "cr7"
      }-gradient-decoration"></div>
    `;
  }
}
