/* global WebImporter */
export default function parse(element, { document }) {
  // Find the OL for the columns
  const ol = element.querySelector('ol[data-component="IconBlock"]');
  if (!ol) return;
  // Get all LI children (each is a column)
  const lis = Array.from(ol.children).filter(li => li.tagName === 'LI');

  // Compose each column's content as an array (image and text)
  const columns = lis.map(li => {
    const iconSpan = li.querySelector('span.IconBlock__StyledSpan-sc-5h87dc-5');
    const iconImg = iconSpan ? iconSpan.querySelector('img') : null;
    const contentSpan = li.querySelector('span.IconBlock__ContentContainer-sc-5h87dc-2');
    const cellContent = [];
    if (iconImg) cellContent.push(iconImg);
    if (contentSpan) cellContent.push(contentSpan);
    return cellContent.length > 1 ? cellContent : cellContent[0];
  });

  // The header row must have only one cell, per requirements
  const headerRow = ['Columns (columns8)'];

  // Build the table
  const cells = [
    headerRow,
    columns
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
