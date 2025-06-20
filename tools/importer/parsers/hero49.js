/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row -- matches example exactly
  const headerRow = ['Hero'];

  // Get the main inner container
  const inner = element.querySelector(':scope > div');

  // Find image element (optional)
  let imgEl = null;
  if (inner) {
    // Image typically in the column with an <img>
    const imageCol = inner.querySelector('.StyledCompoenents__ImageColumn-sc-1ecigph-10, [data-ref="gridColumn"]:has(img)');
    if (imageCol) {
      imgEl = imageCol.querySelector('img');
    } else {
      // fallback: any img inside the hero
      imgEl = element.querySelector('img');
    }
  }

  // Build the image row (second row)
  const imageRow = [imgEl ? imgEl : ''];

  // Find the content column (contains heading, text, CTA)
  let contentCol = null;
  if (inner) {
    // Prefer text column
    const contentColumn = inner.querySelector('.StyledCompoenents__TextColumn-sc-1ecigph-8, [data-ref="gridColumn"]:not(:has(img))');
    if (contentColumn) {
      contentCol = contentColumn;
    } else {
      // fallback: look for a column that has heading or text
      const cols = inner.querySelectorAll('[data-ref="gridColumn"]');
      for (const col of cols) {
        if (col.querySelector('h1, h2, h3, h4, h5, h6, p, a')) {
          contentCol = col;
          break;
        }
      }
    }
  }

  const contentRow = [contentCol ? contentCol : ''];

  // Compose rows together
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
