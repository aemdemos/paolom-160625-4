/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // The header row must be a single cell, regardless of number of columns
  const headerRow = ['Columns (columns2)'];

  // For each column, extract the main content container (not the whole column, only the meaningful section/div)
  function extractMainContent(col) {
    let node = col;
    // Drill down to the deepest single section/div, but not past meaningful content
    while (
      node &&
      node.children.length === 1 &&
      (node.firstElementChild.tagName === 'DIV' || node.firstElementChild.tagName === 'SECTION') &&
      node.firstElementChild.textContent.trim() !== ''
    ) {
      node = node.firstElementChild;
    }
    // If after drilling there's still no meaningful content, return empty string
    if (!node || node.textContent.trim() === '') return '';
    return node;
  }

  // Build the content row so each cell maps to its respective visual column
  const contentRow = columns.map(extractMainContent);

  // Compose the table
  const cells = [headerRow, contentRow];

  // Create and replace with the new block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
