/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate columns
  const columns = Array.from(element.querySelectorAll(':scope > div[data-ref="gridColumn"]'));

  // Defensive: if no columns, do nothing
  if (columns.length === 0) return;

  // For each column, we want to reference the main content area.
  // Columns in this pattern usually have a wrapper (.SideBySideLayout__ContainerWrapper-sc-nb03j7-1),
  // which itself contains the content card, which is what we want in the cell.
  const columnCells = columns.map(col => {
    // Find the first wrapper (should always exist)
    const container = col.querySelector(':scope > .SideBySideLayout__ContainerWrapper-sc-nb03j7-1');
    // If not present, fallback to first child div
    if (container) {
      return container;
    }
    // fallback: just include all content of column
    return col;
  });

  // Table header should exactly match example: 'Columns (columns48)'
  const tableRows = [
    ['Columns (columns48)'],
    columnCells
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
