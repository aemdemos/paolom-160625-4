/* global WebImporter */
export default function parse(element, { document }) {
  // Find the immediate column divs
  const columns = Array.from(element.querySelectorAll(':scope > div[data-ref="gridColumn"]'));

  // For each column, assemble its core content as a single wrapper
  const columnCells = columns.map((col) => {
    // Typically, all useful content is inside the first child, which is the container wrapper
    const wrapper = col.firstElementChild;
    return wrapper;
  });

  // Compose the block table rows
  const rows = [
    ['Columns (columns53)'], // Header row matches exactly
    columnCells              // Second row: one cell per column, each is the referenced wrapper
  ];

  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
