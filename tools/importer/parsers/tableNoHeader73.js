/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches the required block name
  const headerRow = ['Table (no header, tableNoHeader73)'];
  const tableRows = [];

  // Get the first column (main content area)
  const gridColumns = element.querySelectorAll(':scope > div');
  if (!gridColumns || gridColumns.length === 0) {
    // No content to process
    const table = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(table);
    return;
  }

  const mainCol = gridColumns[0];

  // Find the DocumentList within the first column
  const docList = mainCol.querySelector('ul[data-component="DocumentList"]');
  if (docList) {
    const listItems = docList.querySelectorAll(':scope > li');
    listItems.forEach((li) => {
      // Find the visible text link (not the icon link)
      // This link has rel, target and data-testid attributes
      const textLink = li.querySelector("a[rel][target][data-testid='TextLink']");
      if (textLink) {
        tableRows.push([textLink]);
      }
    });
  }

  // If no rows found, create only the header
  const rows = tableRows.length > 0 ? [headerRow, ...tableRows] : [headerRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
