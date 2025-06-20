/* global WebImporter */
export default function parse(element, { document }) {
  // Compose the header row
  const headerRow = ['Accordion (accordion79)'];

  // Find all direct accordion item containers
  const accordionItems = Array.from(element.querySelectorAll(':scope > .nel-Accordion-501'));

  const rows = accordionItems.map(item => {
    // Title cell: find the button, then the label span inside it
    let titleCell = '';
    const button = item.querySelector('button[data-ref="accordionHeader"]');
    if (button) {
      // Remove any icons from the button (so we only have text)
      const headingSpan = button.querySelector('span[data-ref="accordionHeading"]');
      if (headingSpan) {
        titleCell = headingSpan;
      } else {
        // fallback: use button text, but remove any svg icons
        const btnClone = button.cloneNode(true);
        // Remove all svg elements from btnClone
        Array.from(btnClone.querySelectorAll('svg')).forEach(svg => svg.remove());
        titleCell = document.createTextNode(btnClone.textContent.trim());
      }
    } else {
      // fallback: use the heading's text if possible
      const heading = item.querySelector('[data-ref="heading"]');
      if (heading) {
        titleCell = document.createTextNode(heading.textContent.trim());
      } else {
        titleCell = document.createTextNode('');
      }
    }

    // Content cell: get the main content from within the content panel
    let contentCell = '';
    const contentPanel = item.querySelector('.nel-Accordion-505[data-ref="accordionContent"]');
    if (contentPanel) {
      // Look for the rich text content, otherwise use all children (preserves structure: paragraphs, lists, etc.)
      const rich = contentPanel.querySelector('[data-testid="AccordionContent"]');
      if (rich) {
        // Use all children as an array, so paragraphs/lists/etc. all go in
        contentCell = Array.from(rich.childNodes);
      } else {
        contentCell = Array.from(contentPanel.childNodes);
      }
    }

    return [titleCell, contentCell];
  });

  // Create the table for the accordion block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows,
  ], document);
  
  // Replace the original accordion with the new table
  element.replaceWith(table);
}
