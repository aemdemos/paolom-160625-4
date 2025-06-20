/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified in the block info
  const headerRow = ['Table (striped, bordered, tableStripedBordered54)'];

  // The intent is to have a single cell containing all visual content (image block)
  // We'll wrap all children of the element into a single container
  const contentDiv = document.createElement('div');
  while (element.firstChild) {
    contentDiv.appendChild(element.firstChild);
  }

  const rows = [
    headerRow,
    [contentDiv]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
