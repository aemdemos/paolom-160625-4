/* global WebImporter */
export default function parse(element, { document }) {
  // The block header must exactly match the specified block name
  const headerRow = ['Columns (columns39)'];

  // Get all immediate column divs
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (!columns.length) {
    // If no columns found, don't replace
    return;
  }

  // For each column, find the main content wrapper (usually a .SideBySideLayout__ContainerWrapper... or the first child)
  const contentRow = columns.map(col => {
    // Find a wrapper or fallback to the column itself
    let wrapper = col.querySelector('.SideBySideLayout__ContainerWrapper-sc-nb03j7-1')
      || col.querySelector('[data-component="VerticalRhythm"]');
    if (!wrapper) {
      // fallback: just use the column itself
      wrapper = col;
    }
    return wrapper;
  });

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}