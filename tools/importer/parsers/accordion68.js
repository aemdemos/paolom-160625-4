/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block in the provided element
  const accordion = element.querySelector('[data-component="AccordionSimple"]');
  if (!accordion) return;

  // Get all top-level accordion items
  const accordionItems = accordion.querySelectorAll('[data-ref="accordion"]');
  if (!accordionItems.length) return;

  // Block header row (must match example exactly)
  const rows = [['Accordion (accordion68)']];

  // Each item: get the title and content, preserving referenced elements
  accordionItems.forEach((item) => {
    // Find the button containing the accordion heading
    const btn = item.querySelector('button[data-ref="accordionHeader"]');
    let titleCell = null;
    if (btn) {
      // Prefer the inner span (if present)
      const span = btn.querySelector('span[data-ref="accordionHeading"]');
      titleCell = span || btn;
    }

    // Find the accordion content region
    const content = item.querySelector('[data-ref="accordionContent"]');
    let contentCell = content;
    // If there is no content, use an empty string
    if (!contentCell) {
      contentCell = '';
    }
    rows.push([titleCell, contentCell]);
  });

  // Create the accordion block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new block
  element.replaceWith(block);
}
