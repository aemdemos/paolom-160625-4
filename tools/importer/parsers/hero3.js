/* global WebImporter */
export default function parse(element, { document }) {
  // Get the image element if it exists
  let imgEl = null;
  // Look for a <picture> with an <img> inside
  const picture = element.querySelector('picture');
  if (picture) {
    imgEl = picture.querySelector('img');
  }
  // If not found, look for any <img>
  if (!imgEl) {
    imgEl = element.querySelector('img');
  }
  // If no image, leave cell empty
  const imageCell = imgEl ? imgEl : '';

  // Get the text container: typically contains h1 and possibly p
  // Find the left/text column (usually not containing the image)
  let textCol = null;
  const gridColumns = element.querySelectorAll('[data-ref="gridColumn"]');
  if (gridColumns.length > 0) {
    // Heuristic: choose the column that contains an h1
    textCol = Array.from(gridColumns).find(col => col.querySelector('h1')) || gridColumns[0];
  } else {
    textCol = element;
  }

  // Gather all meaningful children from the text column: h1, h2, h3, p, ul, ol, etc.
  const contentNodes = [];
  // Only direct children or their children to avoid extraneous wrappers
  const possibleTags = ['h1','h2','h3','h4','h5','h6','p','ul','ol','a','button','blockquote'];
  possibleTags.forEach(tag => {
    textCol.querySelectorAll(tag).forEach(node => {
      if (!contentNodes.includes(node)) {
        contentNodes.push(node);
      }
    });
  });
  // If nothing found, fallback to all non-empty text nodes
  if (contentNodes.length === 0) {
    Array.from(textCol.childNodes).forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE && node.textContent.trim()) {
        contentNodes.push(node);
      }
    });
  }

  // Compose the table according to the Hero block pattern
  const cells = [
    ['Hero'],
    [imageCell],
    [contentNodes.length === 1 ? contentNodes[0] : contentNodes]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
