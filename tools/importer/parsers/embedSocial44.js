/* global WebImporter */
export default function parse(element, { document }) {
  // Embed (embedSocial44) expects a URL to the external content to embed
  // Review the HTML: There is no iframe, blockquote, or external embed. Only images (decorative) are present.
  // Per block instructions, if there is no embed or social content, the cell should be empty, but header must be present.
  const headerRow = ['Embed (embedSocial44)'];
  const rows = [headerRow, ['']];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}