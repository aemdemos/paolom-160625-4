/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified in the example
  const headerRow = ['Cards (cardsNoImages76)'];

  // Find the two main grid columns (main content and sidebar)
  const columns = element.querySelectorAll(':scope > div');
  if (!columns || columns.length < 2) return;

  // ========== MAIN CONTENT CARDS ==========
  // These are in the first column
  const mainCards = [];
  const mainContent = columns[0];
  // Find all top-level card wrappers
  const mainSections = mainContent.querySelectorAll('.VerticalRhythm-sc-16b971y-0.kgLxmR');
  mainSections.forEach(section => {
    // Each section has: h2 (optional), 1+ .RichText, maybe a button group (cta)
    const cellContent = [];
    const heading = section.querySelector('h2');
    if (heading) cellContent.push(heading);
    // All direct .RichText blocks
    const richTexts = section.querySelectorAll('.RichText__StyledRichTextContent-sc-1j7koit-0');
    richTexts.forEach(rich => cellContent.push(rich));
    // Optional CTA
    const buttonGroup = section.querySelector('[data-component="ButtonGroup"]');
    if (buttonGroup) cellContent.push(buttonGroup);
    // Only add row if there is at least some content
    if (cellContent.length > 0) mainCards.push([cellContent]);
  });

  // ========== SIDEBAR CARDS ==========
  // These are in the second column
  const sidebarCards = [];
  const sidebar = columns[1];
  // Look for section[data-component="CardLinkList"] (each is a card)
  const sidebarCardEls = sidebar.querySelectorAll('section[data-component="CardLinkList"]');
  sidebarCardEls.forEach(card => {
    const cellContent = [];
    const heading = card.querySelector('h2');
    if (heading) cellContent.push(heading);
    const list = card.querySelector('ul');
    if (list) cellContent.push(list);
    // Only add if there is content
    if (cellContent.length > 0) sidebarCards.push([cellContent]);
  });

  // Combine all card rows (main first, then sidebar)
  const rows = [headerRow, ...mainCards, ...sidebarCards];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(table);
}
