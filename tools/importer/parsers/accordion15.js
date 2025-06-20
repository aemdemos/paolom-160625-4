/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as shown in the example
  const headerRow = ['Accordion (accordion15)'];
  const rows = [headerRow];
  // Find all accordion items (direct children)
  const accordionItems = Array.from(element.querySelectorAll(':scope > .nel-Accordion-510'));
  accordionItems.forEach((item) => {
    // Title cell: the span inside the button with data-ref="accordionHeading"
    let titleCell = '';
    const button = item.querySelector('button[data-ref="accordionHeader"]');
    if (button) {
      const headingSpan = button.querySelector('span[data-ref="accordionHeading"]');
      if (headingSpan) {
        titleCell = headingSpan;
      } else {
        // fallback: use the button's text, stripped of child element content
        titleCell = document.createElement('span');
        titleCell.textContent = button.textContent.trim();
      }
    }
    // Content cell: rich content area, preserve all formatting, lists, etc.
    let contentCell = '';
    const contentDiv = item.querySelector('.nel-Accordion-514[data-ref="accordionContent"]');
    if (contentDiv) {
      // They sometimes wrap with .VerticalRhythm... and .Accordion__StyledRichTextContent... so prefer the rich content area
      const richContent = contentDiv.querySelector('[data-testid="AccordionContent"]');
      if (richContent) {
        contentCell = richContent;
      } else {
        // fallback: include the entire accordion content panel
        contentCell = contentDiv;
      }
    }
    rows.push([titleCell, contentCell]);
  });
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
