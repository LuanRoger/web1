class ScheduleController {
  constructor(eventModel, scheduleView) {
    this.eventModel = eventModel;
    this.scheduleView = scheduleView;
    this.init();
  }

  init() {
    this.renderSchedule();
  }

  renderSchedule() {
    const scheduleData = this.eventModel.getScheduleData();
    this.scheduleView.renderSchedule(scheduleData);
  }
}
