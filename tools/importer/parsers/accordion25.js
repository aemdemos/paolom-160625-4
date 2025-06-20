/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion container inside the section
  const accordion = element.querySelector('[data-component="AccordionSimple"]');
  if (!accordion) return;

  // Get all direct accordion items (may be only one)
  // Each item is a div[data-ref="accordion"]
  const itemEls = accordion.querySelectorAll('[data-ref="accordion"]');
  const rows = [];
  // Correct header row
  rows.push(['Accordion (accordion25)']);

  itemEls.forEach((item) => {
    // Get the title (button > span[data-ref="accordionHeading"])
    let titleCell = '';
    const button = item.querySelector('button');
    if (button) {
      const headingSpan = button.querySelector('[data-ref="accordionHeading"]');
      if (headingSpan) {
        titleCell = headingSpan;
      } else {
        // fallback: use button text (as a text node)
        titleCell = document.createTextNode(button.textContent.trim());
      }
    }
    // Get the accordion content (the whole content region for resiliency)
    let contentCell = '';
    const contentDiv = item.querySelector('[data-ref="accordionContent"]');
    if (contentDiv) {
      contentCell = contentDiv;
    }
    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
