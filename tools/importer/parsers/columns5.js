/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards grid container
  const cardsGrid = element.querySelector('[data-component="CardsGrid"]');
  if (!cardsGrid) return;

  // Find all card elements (columns)
  const cardNodes = Array.from(cardsGrid.querySelectorAll('[data-component="CardContactSimple"]'));
  if (cardNodes.length === 0) return;

  // Header row: a single cell, as per the example markdown
  const headerRow = ['Columns (columns5)'];

  // Content row: each card is a separate cell (do NOT clone, reference directly)
  const contentRow = cardNodes;

  // Compose rows for the final table block
  const tableRows = [
    headerRow,
    contentRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
