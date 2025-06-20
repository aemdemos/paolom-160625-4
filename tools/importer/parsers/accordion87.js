/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function: get all direct child elements of a given node
  function getDirectChildren(parent) {
    return Array.from(parent.children);
  }

  // Helper to find the main article (content area) containing the accordion sections
  function getMainContent(el) {
    // Try standard article
    let main = el.querySelector('article');
    if (main) return main;
    // Try fallback - dive into nested content if present
    // Find first large block with multiple headings
    const candidates = el.querySelectorAll('[data-component]');
    let best = null, bestCount = 0;
    candidates.forEach(c => {
      const count = c.querySelectorAll('h2, h3, h4').length;
      if (count > bestCount) {
        best = c;
        bestCount = count;
      }
    });
    if (bestCount > 0) return best;
    // Fallback: whole element
    return el;
  }

  // We want headings (h2, h3, h4) and their content, up to the next heading of equal or higher level
  function getAccordionItems(container) {
    // We'll use only h2, h3, h4 that are not the page title h1
    const all = Array.from(container.children);
    const headingTags = ['H2', 'H3', 'H4'];
    const items = [];
    for (let i = 0; i < all.length; i++) {
      const node = all[i];
      if (headingTags.includes(node.tagName)) {
        // This is an accordion title
        const titleEl = node;
        // Gather content until next heading of same or higher level
        const content = [];
        let j = i + 1;
        while (j < all.length) {
          const curr = all[j];
          if (headingTags.includes(curr.tagName)) {
            // Check heading level
            const currLevel = parseInt(curr.tagName[1], 10);
            const titleLevel = parseInt(node.tagName[1], 10);
            if (currLevel <= titleLevel) break;
          }
          content.push(curr);
          j++;
        }
        // Only push if there is any content (sometimes heading only)
        if (content.length > 0) {
          items.push([titleEl, content]);
        }
      }
    }
    return items;
  }

  // Find the main content area
  const mainContent = getMainContent(element);
  // Get accordion items
  const accordionItems = getAccordionItems(mainContent);
  // If none found, fallback to any h3 as title, block to next h3
  let items = accordionItems;
  if (items.length === 0) {
    const headings = Array.from(mainContent.querySelectorAll('h3'));
    headings.forEach(h => {
      const content = [];
      let n = h.nextElementSibling;
      while (n && n.tagName !== 'H3') {
        content.push(n);
        n = n.nextElementSibling;
      }
      if (content.length > 0) {
        items.push([h, content]);
      }
    });
  }

  // Build the rows
  const headerRow = ['Accordion (accordion87)'];
  const rows = [headerRow];
  for (const [titleEl, contentEls] of items) {
    // Title cell is the heading element
    // Content cell is the array of content nodes (reference originals!)
    rows.push([
      titleEl,
      contentEls
    ]);
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
