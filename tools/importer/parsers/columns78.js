/* global WebImporter */
export default function parse(element, { document }) {
  // Find the OL containing the columns
  const ol = element.querySelector('ol[data-component="IconBlock"]');
  if (!ol) return;

  // Get all immediate LI children (representing columns)
  const lis = Array.from(ol.children).filter(li => li.tagName === 'LI');

  // For each column, gather heading and image as DOM references
  const columns = lis.map(li => {
    const cell = [];
    const heading = li.querySelector('h3');
    if (heading) cell.push(heading);
    const img = li.querySelector('img');
    if (img) cell.push(img);
    return cell;
  });

  // Compose the table: header row (single cell), then columns row (array of cells)
  const headerRow = ['Columns (columns78)']; // Single cell
  const contentRow = columns; // N cells (one for each column)
  const cells = [headerRow, contentRow];

  // Create table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
