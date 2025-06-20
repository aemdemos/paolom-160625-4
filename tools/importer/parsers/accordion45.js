/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified in the requirements
  const headerRow = ['Accordion (accordion45)'];
  const rows = [headerRow];

  // Select all top-level accordion items
  const accordionItems = Array.from(element.querySelectorAll(':scope > div[data-ref="accordion"]'));

  accordionItems.forEach((item) => {
    // Title: .nel-Accordion-503 or [data-ref="accordionHeading"] inside the button in the heading
    let titleEl = item.querySelector('button .nel-Accordion-503, button [data-ref="accordionHeading"]');
    if (!titleEl) {
      // fallback: use the button text
      const btn = item.querySelector('button');
      if (btn) {
        // Only the immediate text content excluding icon etc.
        // If there is a span, prefer it
        titleEl = document.createElement('span');
        titleEl.textContent = btn.textContent.trim();
      } else {
        // fallback: empty cell
        titleEl = document.createElement('span');
        titleEl.textContent = '';
      }
    }

    // Content: the collapsible region
    let contentEl = item.querySelector('div[data-ref="accordionContent"]');
    if (!contentEl) {
      contentEl = document.createElement('div');
    }

    rows.push([titleEl, contentEl]);
  });

  // Create the 2-column accordion block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
