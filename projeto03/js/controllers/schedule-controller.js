class ScheduleController {
  constructor(eventModel, scheduleView) {
    this.eventModel = eventModel;
    this.scheduleView = scheduleView;
    this.init();
  }

  init() {
    this.renderSchedule();
  }

  async renderSchedule() {
    try {
      const scheduleData = await this.eventModel.getScheduleData();
      this.scheduleView.renderSchedule(scheduleData);
    } catch (error) {
      console.error('Error rendering schedule:', error);
    }
  }
}
