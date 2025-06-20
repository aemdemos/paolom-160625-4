/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the main two columns in the ContentWithSidebar grid
  let grid = element.querySelector('[data-component="ContentWithSidebar"].vertical-rhythm--sublayout');
  if (!grid) grid = element.querySelector('[data-component="ContentWithSidebar"]');
  if (!grid) return;
  const cols = grid.querySelectorAll(':scope > .NelComponents__Col-sc-vsly48-38');
  if (cols.length < 2) return;

  // 2. For each column, extract the container that holds the main content
  // LEFT column - main content
  let left = cols[0].querySelector('.ContentWithSidebar__StyledContentWrapper-sc-jz7j6b-0');
  if (!left) left = cols[0]; // fallback to full col if not found
  // RIGHT column - sidebar/links
  let right = cols[1].querySelector('.ContentWithSidebar__StyledSidebarWrapper-sc-jz7j6b-2');
  if (!right) right = cols[1]; // fallback

  // 3. Table header must exactly match specification
  const headerRow = ['Columns (columns65)'];
  // 4. Second row: two columns, each a single element block from the original DOM
  const contentRow = [left, right];

  // 5. Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // 6. Replace the original element
  element.replaceWith(table);
}
