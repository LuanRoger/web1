class PlayerController {
  constructor(eventModel, playerView) {
    this.eventModel = eventModel;
    this.playerView = playerView;
    this.init();
  }

  init() {
    this.renderPlayers();
  }

  async renderPlayers() {
    try {
      const playersData = await this.eventModel.getPlayersData();

      Object.keys(playersData).forEach((playerKey) => {
        this.playerView.renderPlayerSection(playerKey, playersData[playerKey]);
      });
    } catch (error) {
      console.error('Error rendering players:', error);
    }
  }
}
