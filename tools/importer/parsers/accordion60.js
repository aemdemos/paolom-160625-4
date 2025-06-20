/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block
  const accordion = element.querySelector('[data-component="AccordionSimple"]');
  if (!accordion) return;

  // Prepare header row as per the example
  const rows = [['Accordion (accordion60)']];

  // Find all accordion items
  const items = accordion.querySelectorAll('[data-ref="accordion"]');
  items.forEach(item => {
    // --- TITLE CELL ---
    // Prefer the span within the button for the heading text, fall back to button text
    let titleCell = '';
    const btn = item.querySelector('button');
    if (btn) {
      const span = btn.querySelector('span');
      if (span && span.textContent.trim()) {
        titleCell = span;
      } else {
        // Use the button itself to preserve any formatting
        titleCell = btn;
      }
    } else {
      // fallback to heading if button missing
      const heading = item.querySelector('h2, h3, h4, h5, h6');
      if (heading) {
        titleCell = heading;
      } else {
        titleCell = '';
      }
    }

    // --- CONTENT CELL ---
    // Prefer the rich text wrapper if present, else use all content children
    let contentCell = '';
    const content = item.querySelector('[data-ref="accordionContent"]');
    if (content) {
      // Rich text structure (to preserve links and text blocks)
      const rich = content.querySelector('[data-testid="AccordionContent"], .vertical-rhythm--richText');
      if (rich) {
        // Use all existing child nodes (elements and text), referencing originals
        const children = Array.from(rich.childNodes).filter(
          n => (n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim()))
        );
        if (children.length === 1) {
          contentCell = children[0];
        } else if (children.length > 1) {
          contentCell = children;
        } else {
          contentCell = '';
        }
      } else {
        // If no rich container, reference all content's child nodes
        const children = Array.from(content.childNodes).filter(
          n => (n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim()))
        );
        if (children.length === 1) {
          contentCell = children[0];
        } else if (children.length > 1) {
          contentCell = children;
        } else {
          contentCell = '';
        }
      }
    } else {
      contentCell = '';
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
