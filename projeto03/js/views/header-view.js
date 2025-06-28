class HeaderView {
  constructor() {
    this.elements = {
      playerComparison: document.querySelector(".player-comparison"),
      navList: document.querySelector(".nav-list"),
    };
  }

  renderPlayerComparison(playersData) {
    if (!this.elements.playerComparison) return;

    this.elements.playerComparison.innerHTML = `
      <article class="player">
        <h1 id="messi-logo" class="player-text-logo">${playersData.messi.logo}</h1>
        <a href="#messi" class="player-name">${playersData.messi.name}</a>
      </article>
      <h1 class="versus">X</h1>
      <article class="player">
        <h1 id="ronaldo-logo" class="player-text-logo">${playersData.cr7.logo}</h1>
        <a href="#cr7" class="player-name">${playersData.cr7.name}</a>
      </article>
    `;
  }

  renderNavigation(navigationData) {
    if (!this.elements.navList) return;

    this.elements.navList.innerHTML = navigationData
      .map((item) => `<li><a href="${item.href}">${item.text}</a></li>`)
      .join("");
  }
}
