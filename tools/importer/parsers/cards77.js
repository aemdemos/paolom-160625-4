/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell, even though the data rows have two columns
  const headerRow = ['Cards (cards77)'];
  const rows = [headerRow];

  // Get the cards container (may be a few layers deep)
  let cardsContainer = element.querySelector('[data-component="CardsGrid"]');
  if (!cardsContainer) cardsContainer = element;
  const cardEls = Array.from(cardsContainer.querySelectorAll(':scope > .ActionCard__ActionCardOuter-sc-niucah-0'));

  cardEls.forEach(card => {
    // First cell: image/icon, not present here, so empty string
    const imgCell = '';
    // Second cell: content (heading, description, link), reference not clone
    const textCellContent = [];
    const heading = card.querySelector('[data-ref="heading"]');
    if (heading) textCellContent.push(heading);
    const desc = card.querySelector('.vertical-rhythm--richText p');
    if (desc) textCellContent.push(desc);
    const link = card.querySelector('.CardCTATextLinks__LinkContainer-sc-14tk81h-0 a');
    if (link) textCellContent.push(link);
    rows.push([imgCell, textCellContent]);
  });

  // The WebImporter.DOMUtils.createTable will render the header row as one cell spanning the width of the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
