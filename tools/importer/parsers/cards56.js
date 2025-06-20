/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards grid container
  const cardsGrid = element.querySelector('[data-component="CardsGrid"]');
  if (!cardsGrid) return;

  // Find all card elements
  const cardEls = Array.from(cardsGrid.children).filter((c) => c.matches('[data-component="CardCTATextLinks"]'));

  const rows = [['Cards (cards56)']];

  cardEls.forEach((card) => {
    // IMAGE CELL
    let imageCell = null;
    const aspectWrapper = card.querySelector('.ActionCard__AspectRatioWrapper-sc-niucah-1');
    if (aspectWrapper) {
      const imgContainer = aspectWrapper.querySelector('[data-testid="ImageContainer"]');
      if (imgContainer) {
        // Try to find an existing <img> inside, otherwise reference the container div
        const imgEl = imgContainer.querySelector('img');
        if (imgEl) {
          imageCell = imgEl;
        } else {
          imageCell = imgContainer;
        }
      }
    }
    // TEXT CELL
    const textParts = [];
    // Heading
    const heading = card.querySelector('[data-ref="heading"]');
    if (heading) textParts.push(heading);
    // Description
    const desc = card.querySelector('[data-testid="CardContent"]');
    if (desc) textParts.push(desc);
    // CTA link
    const cta = card.querySelector('.CardCTATextLinks__LinkContainer-sc-14tk81h-0');
    if (cta) textParts.push(cta);
    rows.push([
      imageCell,
      textParts.length === 1 ? textParts[0] : textParts
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
