/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must be one cell, but data rows must be two cells
  const headerRow = ['Accordion (accordion58)'];
  const rows = [headerRow];

  // Each accordion item is a direct child div under the root element
  const itemDivs = Array.from(element.querySelectorAll(':scope > div'));
  itemDivs.forEach((itemDiv) => {
    // Title from <button> > <span>
    let titleEl = null;
    const headingBtn = itemDiv.querySelector('[data-ref="accordionHeader"]');
    if (headingBtn) {
      const titleSpan = headingBtn.querySelector('span[data-ref="accordionHeading"]');
      titleEl = titleSpan || headingBtn;
    }
    // Content from accordionContent region
    let contentEl = null;
    const contentRegion = itemDiv.querySelector('[data-ref="accordionContent"]');
    if (contentRegion) {
      let richContent = contentRegion.querySelector('.Accordion__StyledRichTextContent-sc-kdxjv9-0, [data-testid="AccordionContent"]');
      contentEl = richContent || contentRegion;
    }
    // Only add row if both present
    if (titleEl && contentEl) {
      rows.push([titleEl, contentEl]);
    }
  });

  // Ensure header row has same number of columns as content rows
  const maxColumns = rows.slice(1).reduce((max, row) => Math.max(max, row.length), 0);
  if (rows[0].length < maxColumns) {
    // Pad header row with empty cells
    while (rows[0].length < maxColumns) {
      rows[0].push('');
    }
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
