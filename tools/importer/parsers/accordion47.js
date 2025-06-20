/* global WebImporter */
export default function parse(element, { document }) {
  // Find the article that contains the content sections
  const article = element.querySelector('article');
  if (!article) return;

  // Prepare the rows array for the accordion block table
  const rows = [['Accordion (accordion47)']];

  // Get all children of the article, including possible extra wrappers
  const children = Array.from(article.children);
  let i = 0;
  while (i < children.length) {
    const node = children[i];
    if (node.tagName === 'H2') {
      // Use the H2 as the title cell (reference the element, do not clone)
      const titleCell = node;
      // Gather all nodes after this H2 until the next H2 or end
      const contentNodes = [];
      let j = i + 1;
      while (j < children.length && children[j].tagName !== 'H2') {
        // Do not include HRs (they are visual separators, not content in accordion)
        if (children[j].tagName !== 'HR') {
          contentNodes.push(children[j]);
        }
        j++;
      }
      // Ensure nothing is missed, and preserve full content structure
      let contentCell;
      if (contentNodes.length === 1) {
        contentCell = contentNodes[0];
      } else if (contentNodes.length > 1) {
        contentCell = contentNodes;
      } else {
        contentCell = '';
      }
      rows.push([titleCell, contentCell]);
      i = j;
    } else {
      i++;
    }
  }

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
