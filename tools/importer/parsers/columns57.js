/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each column's content
  const cellsRow = columns.map(col => {
    let wrapper = col.querySelector(':scope > div');
    if (!wrapper) wrapper = col;
    return wrapper;
  });

  // Header row must have the same number of columns as the data row
  const headerRow = ['Columns (columns57)', ...Array(cellsRow.length - 1).fill('')];

  const tableCells = [headerRow, cellsRow];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
