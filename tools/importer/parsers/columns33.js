/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must match the block name exactly
  const headerRow = ['Columns (columns33)'];

  // Get immediate column children
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: If no column divs found, treat the element as a single cell
  let contentRow;
  if (columns.length) {
    contentRow = columns;
  } else {
    contentRow = [element];
  }

  // Build cells: header + content row
  const cells = [
    headerRow,
    contentRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
