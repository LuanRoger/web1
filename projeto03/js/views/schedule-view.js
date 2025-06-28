class ScheduleView {
  renderSchedule(scheduleData) {
    const table = document.querySelector(".cronograma-table");
    if (!table) return;

    table.innerHTML = `
      <thead>
        <tr>
          <th>Horário</th>
          <th>Atividade</th>
        </tr>
      </thead>
      <tbody>
        ${scheduleData
          .map(
            (item) => `
          <tr>
            <td>${item.time}</td>
            <td>${item.activity}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    `;
  }
}
