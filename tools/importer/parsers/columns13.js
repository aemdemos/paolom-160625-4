/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns in the grid, which are the direct children with data-ref="gridColumn"
  const columns = Array.from(element.querySelectorAll(':scope > div[data-ref="gridColumn"]'));

  // The header row must match the example exactly
  const headerRow = ['Columns (columns13)'];

  // Each column's content is the full content inside each column, starting at the first child of the column
  // For this layout, all relevant content is inside the first child of the column
  // Defensive: fallback to the column itself if the container is not found
  const contentRow = columns.map(col => {
    // Usually the content is wrapped in a 'SideBySideLayout__ContainerWrapper-sc-nb03j7-1' div
    const container = col.querySelector(':scope > div');
    return container || col;
  });

  // Build the rows array for the table
  const cells = [headerRow, contentRow];

  // Create the table using the provided helper and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
