/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cardsNoImages12) uses a 1-column table: header, then 1 card per row
  const headerRow = ['Cards (cardsNoImages12)'];
  const rows = [headerRow];

  // The content column is always the second immediate child div
  const columns = element.querySelectorAll(':scope > div');
  if (columns.length < 2) return;
  const contentCol = columns[1];

  // We need to split the content into cards if more than one "card" exists, but in this HTML only one card exists

  // Each card: heading (h3, optional), then description, then list, etc, all together
  const cardParts = [];
  // Heading (if present)
  const heading = contentCol.querySelector('h3, h2, h1, h4, h5, h6');
  if (heading) cardParts.push(heading);

  // Rich text (if present)
  // Accept any rich text container or direct paragraphs/lists
  const richText = contentCol.querySelector('.Content-sc-mh9bui-0, [data-component="RichText"]');
  if (richText) {
    cardParts.push(richText);
  } else {
    // Fallback: collect all paragraphs and lists directly inside contentCol
    const paras = contentCol.querySelectorAll(':scope > p, :scope > ul, :scope > ol');
    paras.forEach(e => cardParts.push(e));
  }

  // Only add a row if we have some content
  if (cardParts.length > 0) {
    rows.push([cardParts]);
  }

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
