class FooterView {
  renderFooter(socialLinks) {
    const socialContainer = document.querySelector(".social-media-container");
    const eventNameFooter = document.querySelector(".event-name-footer");

    if (socialContainer) {
      socialContainer.innerHTML = socialLinks
        .map(
          (link) => `
        <a href="${link.href}" target="_blank">
          <svg viewBox="0 0 24 24" xmlns="http:
            <title>${link.title}</title>
            <path d="${link.svgPath}" />
          </svg>
        </a>
      `
        )
        .join("");
    }

    if (eventNameFooter) {
      eventNameFooter.textContent = "The Last Dance";
    }
  }
}
