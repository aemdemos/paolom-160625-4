/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must have exactly one cell with the block name
  const headerRow = ['Columns (columns18)'];

  // Find the grid that contains the columns
  const grid = element.querySelector('[data-component="CardsGrid"]');
  if (!grid) {
    // Fallback: replace with empty block
    const block = WebImporter.DOMUtils.createTable([
      headerRow,
      ['']
    ], document);
    element.replaceWith(block);
    return;
  }

  // Each direct child .ActionCard__ActionCardOuter-sc-niucah-0 is a column
  const cards = Array.from(grid.querySelectorAll(':scope > .ActionCard__ActionCardOuter-sc-niucah-0'));

  // Fallback if no cards
  if (cards.length === 0) {
    const block = WebImporter.DOMUtils.createTable([
      headerRow,
      ['']
    ], document);
    element.replaceWith(block);
    return;
  }

  // For each card, extract the main content area (which includes heading and all text)
  const columns = cards.map(card => {
    const content = card.querySelector('.ActionCard__ActionCardContent-sc-niucah-6');
    return content || card;
  });

  // Compose the table: header (single cell), then one row with as many columns as cards
  const tableCells = [
    headerRow,
    columns
  ];

  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(block);
}
