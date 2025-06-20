/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the main grid containing the columns
  const mainGrid = element.querySelector('[data-component="ContentWithSidebar"]');
  if (!mainGrid) return;

  // 2. Get the two grid columns (main and sidebar)
  const gridColumns = mainGrid.querySelectorAll(':scope > .NelComponents__Col-sc-vsly48-38');
  if (gridColumns.length < 2) return;

  // 3. For each column, find the wrapper that contains all visible content
  // Left: main content; Right: sidebar (related links)
  const leftColWrapper = gridColumns[0].querySelector(':scope > .ContentWithSidebar__ContainerWrapper-sc-jz7j6b-3');
  const rightColWrapper = gridColumns[1].querySelector(':scope > .ContentWithSidebar__ContainerWrapper-sc-jz7j6b-3');

  // Fallback if wrappers are missing - use column's content directly
  const leftContent = leftColWrapper || gridColumns[0];
  const rightContent = rightColWrapper || gridColumns[1];

  // 4. Compose the table as in the example markdown: header, then single row with 2 columns.
  const rows = [];
  rows.push(['Columns (columns1)']);
  rows.push([
    leftContent,
    rightContent,
  ]);

  // 5. Create the block and replace the original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
