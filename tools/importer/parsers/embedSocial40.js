/* global WebImporter */
export default function parse(element, { document }) {
  // The Embed (embedSocial40) block expects all content (text and links) in the second row
  // Get all child nodes and include them directly (no cloning)
  const content = Array.from(element.childNodes);
  // If there is no content, put an empty string to avoid empty row
  const cellContent = content.length ? content : [''];
  const rows = [
    ['Embed (embedSocial40)'],
    [cellContent]
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}