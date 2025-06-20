/* global WebImporter */
export default function parse(element, { document }) {
  // Compose table header row exactly
  const headerRow = ['Table (no header, tableNoHeader43)'];
  const rows = [];

  // Find the content area - the column with the heading and the document list
  let contentCol = null;
  // First, try to find the deepest grid with data-component="ImageWithContent"
  const deepGrid = element.querySelector('[data-component="ImageWithContent"]');
  if (deepGrid) {
    // Pick the second column (content area)
    const gridCols = deepGrid.querySelectorAll(':scope > .NelComponents__Col-sc-vsly48-38');
    if (gridCols.length > 1) contentCol = gridCols[1];
  }
  // Fallback: find first column with heading and doclist
  if (!contentCol) {
    const allCols = element.querySelectorAll('[data-ref="gridColumn"]');
    for (const col of allCols) {
      if (col.querySelector('h1,h2,h3') && col.querySelector('ul[data-component="DocumentList"]')) {
        contentCol = col;
        break;
      }
    }
  }
  // Last fallback: use whole element
  if (!contentCol) contentCol = element;

  // Collect all content for the cell, referencing existing elements
  const content = [];
  // Heading
  const heading = contentCol.querySelector('h1, h2, h3');
  if (heading) content.push(heading);
  // Document list
  const docList = contentCol.querySelector('ul[data-component="DocumentList"]');
  if (docList) content.push(docList);

  // Only push a row if we have content
  if (content.length > 0) {
    rows.push([content]);
  }

  // Only create the table if there are content rows
  if (rows.length) {
    const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);
    element.replaceWith(table);
  }
}
