/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid for the side-by-side columns
  const sideBySideGrid = element.querySelector('[data-component="SideBySideGrid"]');
  if (!sideBySideGrid) return;

  // Get the two columns
  const gridColumns = sideBySideGrid.querySelectorAll(':scope > [data-ref="gridColumn"]');
  if (gridColumns.length < 2) return;

  // Get the container for each column, reference existing DOM nodes
  const firstColContent = gridColumns[0].querySelector(':scope > .SideBySideLayout__ContainerWrapper-sc-nb03j7-1');
  const secondColContent = gridColumns[1].querySelector(':scope > .SideBySideLayout__ContainerWrapper-sc-nb03j7-1');

  // Replace iframe with a link in the original DOM for the second column
  if (secondColContent) {
    const iframe = secondColContent.querySelector('iframe[src]');
    if (iframe) {
      const link = document.createElement('a');
      link.href = iframe.src;
      link.textContent = 'Watch video';
      iframe.replaceWith(link);
    }
  }

  // Compose the cells array with header row as a single column, and second row as two columns
  const cells = [
    ['Columns (columns71)'], // Header row: single cell spanning all columns
    [firstColContent, secondColContent] // Data row: two columns
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
