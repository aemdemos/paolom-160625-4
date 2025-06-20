/* global WebImporter */
export default function parse(element, { document }) {
  // Find the CardsGrid wrapper which contains both columns
  const cardsGrid = element.querySelector('[data-component="CardsGrid"]');
  if (!cardsGrid) return;

  // Each 'section[data-component="CardLinkList"]' is one column
  const columnSections = Array.from(cardsGrid.querySelectorAll(':scope > section[data-component="CardLinkList"]'));

  // Each column cell will contain the heading and list from that section (preserving structure & semantics)
  const columnCells = columnSections.map(section => {
    // Reference the heading and the list directly as children
    const frag = document.createElement('div');
    const heading = section.querySelector('h2');
    const list = section.querySelector('ul');
    if (heading) frag.appendChild(heading);
    if (list) frag.appendChild(list);
    return frag;
  });

  // Build the table rows: header (single cell), then columns row
  const tableRows = [
    ['Columns (columns20)'], // always a single cell header row
    columnCells // array of column cells (one for each section)
  ];

  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(blockTable);
}
