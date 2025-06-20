/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that contains the image and the content
  const grid = element.querySelector('[data-component="ImageWithContent"]');
  if (!grid) return;

  // Get all the grid columns (should be 2: image and content)
  const columns = grid.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // The content is always in the second column
  const contentCol = columns[1];

  // The card content is inside the contentCol
  // We'll extract the heading (h2), the rich text (div.RichText...), and the button group (if present)
  const cardChildren = [];
  const heading = contentCol.querySelector('h2');
  if (heading) cardChildren.push(heading);
  // Select all rich text content blocks (should be one, but robust to multiple)
  const richTexts = contentCol.querySelectorAll('.RichText__StyledRichTextContent-sc-1j7koit-0');
  richTexts.forEach(rt => cardChildren.push(rt));
  // Button group (may include link)
  const buttonGroup = contentCol.querySelector('[data-component="ButtonGroup"]');
  if (buttonGroup) cardChildren.push(buttonGroup);

  // Build the table rows
  const headerRow = ['Cards (cardsNoImages72)'];
  const cardRow = [cardChildren];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cardRow
  ], document);

  element.replaceWith(table);
}
