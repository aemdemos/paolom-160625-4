/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: if element is missing, do nothing
  if (!element) return;

  // Get all direct <li> children representing each column
  const items = Array.from(element.querySelectorAll(':scope > li'));

  if (items.length === 0) return;

  // Header row: single cell (matches example)
  const headerRow = ['Columns (columns29)'];

  // Second row: one cell for each column, each with its full column content
  const columnsRow = items.map((li) => li);

  // Compose the table rows
  const rows = [headerRow, columnsRow];

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
