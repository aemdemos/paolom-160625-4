/* global WebImporter */
export default function parse(element, { document }) {
  // Extract columns
  const columns = Array.from(element.querySelectorAll(':scope > [data-ref="gridColumn"]'));
  const columnCells = columns.map(col => {
    const wrapper = col.querySelector(':scope > .SideBySideLayout__ContainerWrapper-sc-nb03j7-1');
    return wrapper || col;
  });

  // The header row must have the same number of cells as the content row
  // First cell is the block name, the rest are empty strings
  const headerRow = ['Columns (columns46)'];
  while (headerRow.length < columnCells.length) {
    headerRow.push('');
  }

  const rows = [headerRow, columnCells];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
