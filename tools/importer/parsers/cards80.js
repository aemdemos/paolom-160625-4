/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must match example EXACTLY
  const headerRow = ['Cards (cards80)'];
  // Get all cards (li direct children)
  const items = element.querySelectorAll(':scope > li');
  const rows = Array.from(items).map((li) => {
    // Image: always in span.IconBlock__StyledSpan-sc-5h87dc-5 > img
    const imgSpan = li.querySelector('.IconBlock__StyledSpan-sc-5h87dc-5');
    let image = null;
    if (imgSpan) {
      image = imgSpan.querySelector('img');
    }
    // Text: in span.IconBlock__ContentContainer-sc-5h87dc-2
    // Want: heading and description as elements (preserve real elements)
    const contentSpan = li.querySelector('.IconBlock__ContentContainer-sc-5h87dc-2');
    let textContent = [];
    if (contentSpan) {
      // Heading (usually h3)
      const heading = contentSpan.querySelector('h3, h2, h4, h5, h6');
      if (heading) textContent.push(heading);
      // Description: find the first p (could be more than one p)
      const ps = contentSpan.querySelectorAll('p');
      ps.forEach((p) => textContent.push(p));
    }
    // If nothing found, add null so cell is empty
    const firstCell = image || '';
    const secondCell = textContent.length > 0 ? textContent : '';
    return [firstCell, secondCell];
  });
  // Build the table: header plus rows
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
