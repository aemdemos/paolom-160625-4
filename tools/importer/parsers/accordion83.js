/* global WebImporter */
export default function parse(element, { document }) {
  // Compose header
  const headerRow = ['Accordion (accordion83)'];
  const rows = [headerRow];

  // Find all accordion items (immediate children)
  const accordionItems = element.querySelectorAll(':scope > .nel-Accordion-504');
  accordionItems.forEach((item) => {
    // Title cell: find span[data-ref="accordionHeading"] inside the button
    let titleCell = '';
    const heading = item.querySelector('button[data-ref="accordionHeader"] span[data-ref="accordionHeading"]');
    if (heading) {
      titleCell = heading;
    }

    // Content cell: the content region
    let contentCell = '';
    // Prefer deepest content div if present; fallback to accordionContent div
    const contentRegion = item.querySelector('div[data-ref="accordionContent"]');
    if (contentRegion) {
      const richContent = contentRegion.querySelector('div[data-testid="AccordionContent"]');
      if (richContent) {
        contentCell = richContent;
      } else {
        // fallback, in case structure is slightly different
        contentCell = contentRegion;
      }
    }
    // Only add the row if both cells are present
    if (titleCell && contentCell) {
      rows.push([titleCell, contentCell]);
    }
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
