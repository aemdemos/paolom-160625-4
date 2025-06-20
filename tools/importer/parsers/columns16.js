/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell containing the block name, matching the example exactly
  const headerRow = ['Columns (columns16)'];

  // For each direct li child (column), we want to create a cell containing both the content and the image
  const columns = Array.from(element.querySelectorAll(':scope > li'));
  const contentRow = columns.map((li) => {
    // Get the content container (heading and paragraph)
    const content = li.querySelector('.IconBlock__ContentContainer-sc-5h87dc-2');
    // Get the image container (usually a span with an img inside)
    const imgSpan = li.querySelector('.IconBlock__StyledSpan-sc-5h87dc-5');
    // Return both, in order, as an array in the cell
    // Reference the original elements, don't clone
    if (content && imgSpan) {
      return [content, imgSpan];
    } else if (content) {
      return [content];
    } else if (imgSpan) {
      return [imgSpan];
    } else {
      // Fallback to the li itself if both are missing
      return li;
    }
  });

  // Build the block table cells array as per the example: first row is header (1 cell), second row is one cell per column
  const cells = [headerRow, contentRow];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the new block table
  element.replaceWith(table);
}
