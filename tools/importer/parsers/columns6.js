/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate grid columns
  const columns = Array.from(element.querySelectorAll(':scope > div[data-ref="gridColumn"]'));
  // For each column, get the main content wrapper inside
  const colContent = columns.map(col => {
    // The first container wrapper holds all the content for this column
    // If not found, fallback to the column itself
    const wrapper = col.querySelector(':scope > .SideBySideLayout__ContainerWrapper-sc-nb03j7-1, :scope > div');
    return wrapper || col;
  });
  // Build the table: header row is a single cell; content row has a cell for each column
  const cells = [
    ['Columns (columns6)'],
    colContent,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
