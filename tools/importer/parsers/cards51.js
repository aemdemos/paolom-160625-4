/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Cards (cards51)'];

  // Get all direct children (each represents a card)
  const cardDivs = element.querySelectorAll(':scope > div');
  const cardRows = [];

  cardDivs.forEach(card => {
    // --- Icon/Image/First cell ---
    let iconCell = null;
    // The icon is always within the IconWithContent__Container-sc-mcdv6-0
    const iconContainer = card.querySelector('.IconWithContent__Container-sc-mcdv6-0');
    if (iconContainer) {
      // Reference the icon container directly
      iconCell = iconContainer;
    } else {
      iconCell = document.createTextNode('');
    }

    // --- Text/Second cell ---
    // The rest of the card (excluding icon) is relevant text content and CTAs.
    // Collect all content except the icon container
    const textCellContent = [];

    card.childNodes.forEach(node => {
      if (node !== iconContainer && (node.nodeType !== 3 || node.textContent.trim())) {
        textCellContent.push(node);
      }
    });

    // If we captured nothing, fall back to an empty string
    const textCell = textCellContent.length ? textCellContent : document.createTextNode('');
    cardRows.push([iconCell, textCell]);
  });

  const cells = [headerRow, ...cardRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
