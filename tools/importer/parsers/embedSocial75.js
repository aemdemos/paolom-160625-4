/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row exactly as in the example
  const headerRow = ['Embed (embedSocial75)'];

  // We want the main content: everything in the LinkedIn card on the left, including heading, description, and link
  // The card is inside the first grid column (data-ref="gridColumn")
  const columns = element.querySelectorAll(':scope > div[data-ref="gridColumn"]');
  let mainContent;
  if (columns && columns.length > 0) {
    // Find the first column that has meaningful content (contains a heading or link)
    for (const col of columns) {
      if (col.querySelector('a[href*="linkedin.com"], h1, h2, h3, h4, h5, h6, p')) {
        mainContent = col;
        break;
      }
    }
    // fallback if none found
    if (!mainContent) {
      mainContent = columns[0];
    }
  } else {
    mainContent = element;
  }

  // Compose the table with header and a single cell containing the existing content element
  const rows = [
    headerRow,
    [mainContent]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
