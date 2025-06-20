/* global WebImporter */
export default function parse(element, { document }) {
  // Block header: exactly as in the example
  const headerRow = ['Cards (cardsNoImages31)'];
  const rows = [headerRow];

  // Find the main content area that includes all the cards
  // The main content is in the second grid column of the ImageWithContent grid
  const mainGrid = element.querySelector('[data-component="ImageWithContent"]');
  if (!mainGrid) return;
  const columns = mainGrid.querySelectorAll('[data-ref="gridColumn"]');
  // Usually image in col[0], content in col[1]
  const contentCol = columns.length > 1 ? columns[1] : columns[0];
  if (!contentCol) return;

  // Gather all children: we expect a h2, then 1 or more div.richtext, then h3/div-richtext pairs for each additional card
  const cards = [];
  let children = Array.from(contentCol.children);

  // 1. First card: h2 + following richtext(s) until the next h3
  let cardStart = 0;
  while (cardStart < children.length &&
    (!children[cardStart].tagName || children[cardStart].tagName.toLowerCase() !== 'h2')) {
    cardStart++;
  }
  if (cardStart >= children.length) return; // No h2 found
  const h2 = children[cardStart];
  let cardDiv = document.createElement('div');
  cardDiv.appendChild(h2);
  let nextIdx = cardStart + 1;
  while (
    nextIdx < children.length &&
    (!children[nextIdx].tagName ||
      children[nextIdx].tagName.toLowerCase() !== 'h3')
  ) {
    if (
      children[nextIdx].tagName &&
      children[nextIdx].tagName.toLowerCase() === 'div' &&
      children[nextIdx].className.includes('RichText__StyledRichTextContent')
    ) {
      cardDiv.appendChild(children[nextIdx]);
    }
    nextIdx++;
  }
  if (cardDiv.childNodes.length > 0) {
    rows.push([cardDiv]);
  }

  // 2. Each h3 + next richtext div is a card
  let idx = nextIdx;
  while (idx < children.length) {
    // Look for h3
    if (children[idx].tagName && children[idx].tagName.toLowerCase() === 'h3') {
      const h3 = children[idx];
      // Find next sibling that's a richtext div
      let j = idx + 1;
      while (
        j < children.length &&
        (!children[j].tagName ||
          children[j].tagName.toLowerCase() !== 'div' ||
          !children[j].className.includes('RichText__StyledRichTextContent'))
      ) {
        j++;
      }
      const div = (j < children.length) ? children[j] : null;
      const cardDiv = document.createElement('div');
      cardDiv.appendChild(h3);
      if (div) cardDiv.appendChild(div);
      rows.push([cardDiv]);
      idx = j + 1;
    } else {
      idx++;
    }
  }

  // Only create the table if we have at least 2 rows (header + at least 1 card)
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
