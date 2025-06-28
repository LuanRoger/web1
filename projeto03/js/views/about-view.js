class AboutView {
  renderAboutSection(aboutContent) {
    const aboutSection = document.getElementById("about");
    if (!aboutSection) return;

    const aboutText = aboutSection.querySelector(".about-text");
    if (aboutText) {
      aboutText.textContent = aboutContent.subtitle;
    }

    const paragraphs = aboutSection.querySelectorAll(
      "p:not(.about-text):not(.underline-text)"
    );
    paragraphs.forEach((p, index) => {
      if (aboutContent.paragraphs[index]) {
        p.textContent = aboutContent.paragraphs[index];
      }
    });

    const underlineText = aboutSection.querySelector(".underline-text");
    if (underlineText && aboutContent.paragraphs[3]) {
      underlineText.textContent = aboutContent.paragraphs[3];
    }
  }
}
