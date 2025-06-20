/* global WebImporter */
export default function parse(element, { document }) {
  // Header row with exact block name
  const headerRow = ['Columns (columns42)'];

  // Get all immediate children, each is a card/column
  const columns = Array.from(element.querySelectorAll(':scope > div')).map(card => {
    // For robustness, get the main inner card layout
    // Usually it's the div.ActionCard__ActionCardNoImageInner-sc-niucah-5
    // but for resilience, fallback to first div inside card, else the card itself
    let inner = card.querySelector(':scope > div');
    if (!inner) inner = card;
    return inner;
  });

  // If element is empty, do nothing
  if (columns.length === 0) return;

  // Compose the block table
  const rows = [headerRow, columns];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
