/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header exactly as required
  const cells = [['Accordion (accordion14)']];

  // 2. Get all accordion items in a robust way
  const accordionItems = element.querySelectorAll(':scope > div[data-ref="accordion"]');
  accordionItems.forEach((item) => {
    // Get the accordion title
    let title = '';
    // Find the immediate button that contains the label/span
    const header = item.querySelector('[data-ref="accordionHeader"]');
    if (header) {
      // Prefer the span inside the button for text only
      const span = header.querySelector('[data-ref="accordionHeading"]');
      if (span) {
        title = span.textContent.trim();
      } else {
        // fallback if structure changes
        title = header.textContent.trim();
      }
    }

    // Get the accordion content element (robust: try for inner content, fallback to panel)
    let contentEl = null;
    const panel = item.querySelector('[data-ref="accordionContent"]');
    if (panel) {
      // Try to get the rich text content only
      const rich = panel.querySelector('[data-testid="AccordionContent"]');
      if (rich) {
        contentEl = rich;
      } else {
        // fallback to the panel region div itself
        contentEl = panel;
      }
    } else {
      // fallback: empty cell
      contentEl = document.createElement('div');
    }

    cells.push([
      title,
      contentEl
    ]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
