/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in example
  const headerRow = ['Accordion (accordion63)'];
  const cells = [headerRow];

  // Find all accordion items in this block
  const accordionItems = element.querySelectorAll(':scope > .nel-Accordion-514[data-ref="accordion"]');
  accordionItems.forEach((item) => {
    // Title: find the visible label in the accordion header span
    let title = '';
    const button = item.querySelector('button[data-ref="accordionHeader"]');
    if (button) {
      const span = button.querySelector('.nel-Accordion-516');
      if (span) {
        title = span.textContent.trim();
      } else {
        // fallback: get all text content of button
        title = button.textContent.trim();
      }
    }

    // Content: find the main content block inside .nel-Accordion-518
    let content = '';
    const contentWrapper = item.querySelector('.nel-Accordion-518');
    if (contentWrapper) {
      // Prefer rich text content if available
      const richText = contentWrapper.querySelector('[data-testid="AccordionContent"]');
      if (richText) {
        content = richText;
      } else {
        // fallback: include all children of contentWrapper except for script/style/meta
        // (but .nel-Accordion-518 itself is a wrapper: we want inner elements)
        const fragment = document.createDocumentFragment();
        Array.from(contentWrapper.children).forEach(child => {
          if (!['SCRIPT','STYLE','META'].includes(child.tagName)) {
            fragment.appendChild(child);
          }
        });
        content = fragment.childNodes.length === 1
          ? fragment.firstChild
          : fragment.childNodes.length > 1
            ? Array.from(fragment.childNodes)
            : '';
      }
    }
    // Push this accordion row (do not create extra cells)
    cells.push([
      title,
      content
    ]);
  });

  // Create and replace with the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
