/* global WebImporter */
export default function parse(element, { document }) {
  // Find the immediate column children
  const columns = Array.from(element.querySelectorAll(':scope > div[data-ref="gridColumn"]'));

  // Defensive: if no columns found, do nothing
  if (columns.length === 0) return;

  // Header row must be a single cell/column, as per example
  const headerRow = ['Columns (columns35)'];

  // Each column's main container (reference existing DOM)
  const contentRow = columns.map((col) => {
    // Use the first direct child as the column content container
    const first = col.querySelector(':scope > div');
    return first || col;
  });

  // Table cells: first row is header (1 cell), second row is columns (n cells)
  const cells = [headerRow, contentRow];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
