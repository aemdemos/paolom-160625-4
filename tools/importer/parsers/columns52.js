/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract columns from a given <ol>
  function extractColumnsFromOl(ol) {
    const columns = [];
    const lis = Array.from(ol.children);
    lis.forEach((li) => {
      // For each li: gather inner content and icon
      const contentSpan = li.querySelector('.IconBlock__ContentContainer-sc-5h87dc-2');
      const iconSpan = li.querySelector('.IconBlock__StyledSpan-sc-5h87dc-5');
      // Create a wrapper div to keep order and separation
      const cellDiv = document.createElement('div');
      if (contentSpan) cellDiv.appendChild(contentSpan);
      if (iconSpan) cellDiv.appendChild(iconSpan);
      columns.push(cellDiv);
    });
    return columns;
  }

  // Gather all relevant <ol> (IconBlock)
  const ols = element.querySelectorAll('ol[data-component="IconBlock"]');
  const rows = Array.from(ols).map(extractColumnsFromOl);

  // Determine max columns for normalization
  let maxCols = 0;
  rows.forEach(row => { if (row.length > maxCols) maxCols = row.length; });

  // Normalize rows: pad with empty divs as needed
  const normalizedRows = rows.map(row => {
    if (row.length < maxCols) {
      const padRow = row.slice();
      while (padRow.length < maxCols) {
        padRow.push(document.createElement('div'));
      }
      return padRow;
    }
    return row;
  });

  // The first row must be the header, and must be a single cell/column
  const tableCells = [
    ['Columns (columns52)'],
    ...normalizedRows
  ];

  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
