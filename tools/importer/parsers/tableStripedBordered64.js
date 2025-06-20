/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Table (striped, bordered, tableStripedBordered64)'];
  const blockContent = [];

  // Find all data tables
  const tables = element.querySelectorAll('table[data-component="SimpleTable"]');

  tables.forEach((table) => {
    // 1. Find the closest previous <h2> (section heading)
    let heading = null;
    let pointer = table.previousElementSibling;
    while (pointer) {
      if (pointer.tagName && pointer.tagName.toLowerCase() === 'h2') {
        heading = pointer;
        break;
      }
      pointer = pointer.previousElementSibling;
    }

    // 2. Gather all elements between heading and table (exclusive)
    const contextBlocks = [];
    if (heading) {
      let sib = heading.nextElementSibling;
      while (sib && sib !== table) {
        if (sib.textContent && sib.textContent.trim().length > 0) {
          contextBlocks.push(sib);
        }
        sib = sib.nextElementSibling;
      }
    }

    // 3. Compose a wrapper div: heading, context, table, footnote
    const wrapper = document.createElement('div');
    if (heading) wrapper.appendChild(heading);
    contextBlocks.forEach((ctx) => wrapper.appendChild(ctx));
    wrapper.appendChild(table);
    // 4. Add <small> footnote after the table if present
    let after = table.nextElementSibling;
    if (
      after &&
      after.tagName &&
      after.tagName.toLowerCase() === 'small' &&
      after.textContent.trim().length > 0
    ) {
      wrapper.appendChild(after);
    }
    blockContent.push([wrapper]);
  });

  if (blockContent.length) {
    blockContent.unshift(headerRow);
    const block = WebImporter.DOMUtils.createTable(blockContent, document);
    element.replaceWith(block);
  }
}
