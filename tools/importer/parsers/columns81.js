/* global WebImporter */
export default function parse(element, { document }) {
  // Find all immediate column elements
  const columns = Array.from(element.querySelectorAll(':scope > div[data-ref="gridColumn"]'));

  // Defensive: if no columns found, do nothing
  if (columns.length === 0) return;

  // Header row, matching the spec exactly
  const headerRow = ['Columns (columns81)'];

  // For each column, grab its primary content wrapper
  // For this layout, it's the .ContentWithSidebar__ContainerWrapper-sc-jz7j6b-3 element in each column
  const columnCells = columns.map(col => {
    // The desired wrapper always exists in the example HTML
    const wrapper = col.querySelector('.ContentWithSidebar__ContainerWrapper-sc-jz7j6b-3');
    // If not found (edge case), fallback to the column div itself
    return wrapper || col;
  });

  // Build the cells structure for the table block
  const cells = [
    headerRow,
    columnCells
  ];

  // Create the block table using the utility
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table block
  element.replaceWith(block);
}
