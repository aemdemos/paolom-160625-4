/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all direct child sections (each section is a column)
  const sections = Array.from(element.querySelectorAll(':scope > section'));

  // Build the table: header (single cell), then content (row of columns)
  // Only the first row (header) should have a single cell, as per the example
  const tableArray = [
    ['Columns (columns22)'], // header row: exactly one cell
    sections                // content row: each section is a column
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(tableArray, document);

  // After table creation, manually set colspan on the header cell to span all columns
  if (sections.length > 1) {
    const headerTr = table.querySelector('tr');
    const headerTh = headerTr && headerTr.querySelector('th');
    if (headerTh) {
      headerTh.setAttribute('colspan', sections.length);
    }
  }

  // Replace the original element
  element.replaceWith(table);
}
