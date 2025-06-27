class PlayerController {
  constructor(eventModel, playerView) {
    this.eventModel = eventModel;
    this.playerView = playerView;
    this.init();
  }

  init() {
    this.renderPlayers();
  }

  renderPlayers() {
    const playersData = this.eventModel.getPlayersData();

    Object.keys(playersData).forEach((playerKey) => {
      this.playerView.renderPlayerSection(playerKey, playersData[playerKey]);
    });
  }
}
