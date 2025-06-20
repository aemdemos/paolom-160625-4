/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the column containing the accordion block
  const columns = element.querySelectorAll(':scope > div');
  let accordionContainer = null;
  for (const col of columns) {
    const found = col.querySelector('[data-component="AccordionSimple"]');
    if (found) {
      accordionContainer = found;
      break;
    }
  }
  if (!accordionContainer) return;

  // Select all accordion items
  const items = accordionContainer.querySelectorAll(':scope > .nel-Accordion-504');
  const rows = [['Accordion (accordion84)']];

  items.forEach(item => {
    // Extract title: look for a button with a span, fallback to button textContent
    let title = '';
    const btn = item.querySelector('button');
    if (btn) {
      const btnSpan = btn.querySelector('span');
      if (btnSpan && btnSpan.textContent.trim()) {
        title = btnSpan.textContent.trim();
      } else {
        title = btn.textContent.trim();
      }
    } else {
      // Fallback to heading in the accordion item
      const heading = item.querySelector('[data-ref="heading"], h2, h3, h4, h5, h6');
      if (heading && heading.textContent.trim()) {
        title = heading.textContent.trim();
      }
    }
    // Extract content: reference the content DIV directly (do NOT clone)
    let contentCell = '';
    const contentDiv = item.querySelector('.nel-Accordion-508');
    if (contentDiv) {
      // Look for a rich text content block first, fallback to the content div itself
      const rich = contentDiv.querySelector('[data-testid="AccordionContent"]');
      if (rich) {
        contentCell = rich;
      } else {
        contentCell = contentDiv;
      }
    }
    rows.push([title, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
