/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header as in example
  const headerRow = ['Cards (cardsNoImages7)'];
  const rows = [headerRow];
  // Select all direct child card containers
  const cards = element.querySelectorAll(':scope > div');
  cards.forEach((card) => {
    // Get the card inner wrapper
    const inner = card.querySelector('.ActionCard__ActionCardNoImageInner-sc-niucah-5') || card;
    // Find the content block with heading and description
    const content = inner.querySelector('.ActionCard__ActionCardContent-sc-niucah-6') || inner;
    // Heading (might be missing)
    const heading = content.querySelector('h3');
    // Description: usually an element with [data-testid="CardContent"]
    const description = content.querySelector('[data-testid="CardContent"]');
    // CTA link (optional)
    const ctaContainer = inner.querySelector('.CardCTATextLinks__LinkContainer-sc-14tk81h-0');
    const ctaLink = ctaContainer ? ctaContainer.querySelector('a') : null;
    // Build the cell content, always as an array for robustness
    const cellContent = [];
    if (heading) cellContent.push(heading);
    if (description) cellContent.push(description);
    if (ctaLink) cellContent.push(ctaLink);
    rows.push([cellContent]);
  });
  // Create the single-column table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}