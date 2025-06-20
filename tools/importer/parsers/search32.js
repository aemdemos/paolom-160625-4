/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Create the header row as specified in the example
  const headerRow = ['Search'];

  // 2. Extract all relevant visible content from the element
  //    To ensure all semantic and visible info is included, grab all immediate children except spacers
  //    (Spacers are typically empty divs with spacing-related classnames)
  const contentNodes = [];
  // Use direct children of the block element (not deep descendants)
  element.childNodes.forEach((node) => {
    // Filter out empty text nodes and likely spacers (by class name pattern)
    if (node.nodeType === 1) { // element node
      const className = node.className || '';
      if (
        // Filter vertical/horizontal spacers and empty divs
        !(className.match(/spacer|VerticalSpacer|HorizontalSpacer/i) && node.children.length === 0)
      ) {
        contentNodes.push(node);
      }
    } else if (node.nodeType === 3) { // text node
      if (node.textContent.trim().length > 0) {
        contentNodes.push(node);
      }
    }
  });

  // 3. Always add the canonical search index link as the last part of the cell
  const searchIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const link = document.createElement('a');
  link.href = searchIndexUrl;
  link.textContent = searchIndexUrl;
  contentNodes.push(link);

  // 4. Structure the cells: header row, then one cell with content
  const cells = [
    headerRow,
    [contentNodes],
  ];

  // 5. Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
