/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must match EXACTLY as per instructions
  const headerRow = ['Accordion (accordion59)'];
  // Select all direct child accordion items
  const itemRoots = Array.from(element.querySelectorAll(':scope > div[data-ref="accordion"]'));
  const rows = [];
  itemRoots.forEach(item => {
    // Title: from button > span[data-ref="accordionHeading"]
    let title = '';
    const button = item.querySelector('button[data-ref="accordionHeader"]');
    if (button) {
      const span = button.querySelector('span[data-ref="accordionHeading"]');
      if (span) {
        title = span.textContent.trim();
      } else {
        // fallback: just use all button text (shouldn't happen here)
        title = button.textContent.trim();
      }
    }
    // Content: region with data-ref="accordionContent" (grab all its children)
    let contentCell = null;
    const contentRegion = item.querySelector('div[data-ref="accordionContent"]');
    if (contentRegion) {
      // Grab all children of the first child (vertical rhythm container)
      const wrap = contentRegion.querySelector(':scope > div');
      if (wrap) {
        // If the vertical rhythm container exists, use its children
        const children = Array.from(wrap.children);
        if (children.length === 1) {
          // Single element, just reference it
          contentCell = children[0];
        } else if (children.length > 1) {
          // Pass as array, preserve order
          contentCell = children;
        } else {
          // Empty content
          contentCell = '';
        }
      } else {
        // Fallback: use all children of contentRegion
        const children = Array.from(contentRegion.children);
        if (children.length === 1) {
          contentCell = children[0];
        } else if (children.length > 1) {
          contentCell = children;
        } else {
          contentCell = '';
        }
      }
    } else {
      // No content region found
      contentCell = '';
    }
    rows.push([title, contentCell]);
  });
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
