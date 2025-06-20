/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct li's (columns)
  const liElements = Array.from(element.querySelectorAll(':scope > li'));
  const numCols = liElements.length;

  // Header row: single cell (so the table has 1 column in header)
  const headerRow = ['Columns (columns69)'];

  // Content row: one cell per column
  const contentRow = liElements.map((li) => {
    // Find heading (h1-h6) and image, append to a container
    const heading = li.querySelector('h1, h2, h3, h4, h5, h6');
    const img = li.querySelector('img');
    const container = document.createElement('div');
    if (heading) container.appendChild(heading);
    if (img) container.appendChild(img);
    return container;
  });

  // Compose the table: header (1 cell) then content row (N cells)
  const rows = [headerRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the table
  element.replaceWith(table);
}
