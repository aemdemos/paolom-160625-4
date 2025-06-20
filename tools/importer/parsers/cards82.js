/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Cards (cards82)'];

  // Gather all card elements (only immediate children)
  const cardNodes = element.querySelectorAll(':scope > div');
  const rows = [headerRow];

  cardNodes.forEach((card) => {
    // IMAGE: Find the .ActionCard__AspectRatioWrapper and then the [data-testid="ImageContainer"]
    const imageContainer = card.querySelector('.ActionCard__AspectRatioWrapper-sc-niucah-1 [data-testid="ImageContainer"]');
    let imageEl = undefined;

    // Try to get a background image URL from style (may not exist) or just supply as an empty img tag with alt.
    if (imageContainer) {
      // Try inline style backgroundImage
      let bgUrl = '';
      if (imageContainer.style && imageContainer.style.backgroundImage) {
        const bg = imageContainer.style.backgroundImage;
        const match = bg.match(/url\(["']?(.*?)["']?\)/);
        if (match && match[1]) {
          bgUrl = match[1];
        }
      }
      // If not in style, can try data attributes or leave blank
      imageEl = document.createElement('img');
      imageEl.alt = card.querySelector('h3')?.textContent?.trim() || '';
      if (bgUrl) imageEl.src = bgUrl;
    } else {
      imageEl = '';
    }

    // TEXT: Heading, paragraphs, list, cta
    const textParts = [];
    const contentContainer = card.querySelector('.ActionCard__ActionCardContent-sc-niucah-6');
    if (contentContainer) {
      const heading = contentContainer.querySelector('h3');
      if (heading) textParts.push(heading);
      const descBlock = contentContainer.querySelector('[data-testid="CardContent"]');
      if (descBlock) {
        Array.from(descBlock.children).forEach((child) => {
          textParts.push(child);
        });
      }
    }
    const cta = card.querySelector('[data-ref="buttonGroup"] a');
    if (cta) textParts.push(cta);

    rows.push([imageEl, textParts]);
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
