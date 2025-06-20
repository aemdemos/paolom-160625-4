/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two main columns (content and sidebar)
  const columns = element.querySelectorAll(':scope > div');
  if (!columns || columns.length === 0) return;
  const contentCol = columns[0];

  // Get the content wrapper inside the content column
  const contentWrapper = contentCol.querySelector('.ContentWithSidebar__ContainerWrapper-sc-jz7j6b-3');
  if (!contentWrapper) return;

  // Get the heading (if exists)
  const heading = contentWrapper.querySelector('h2');
  // Get the intro rich text (if exists)
  const introRichText = contentWrapper.querySelector('.RichText__StyledRichTextContent-sc-1j7koit-0');
  // Get the ticked list container
  const tickedList = contentWrapper.querySelector('[data-component="ListTicksCrosses"] ul');

  // Compose header row
  const cells = [['Cards (cardsNoImages70)']];
  
  // Optional: Add a summary card row if there is a heading or intro text
  if (heading || introRichText) {
    // Compose a div containing both, in the order they appear
    const summaryDiv = document.createElement('div');
    if (heading) summaryDiv.appendChild(heading);
    if (introRichText) summaryDiv.appendChild(introRichText);
    cells.push([summaryDiv]);
  }

  // For each li in the tickedList, add a row with its text content
  if (tickedList) {
    const lis = Array.from(tickedList.querySelectorAll(':scope > li'));
    lis.forEach(li => {
      // Each li contains a .vertical-rhythm--richText which has a <p>
      const richText = li.querySelector('.vertical-rhythm--richText');
      let contentElem = null;
      if (richText) {
        // Defensive: if there are multiple p's, append all (should not occur, but general)
        const ps = Array.from(richText.querySelectorAll('p'));
        if (ps.length === 1) {
          contentElem = ps[0];
        } else if (ps.length > 1) {
          const cardDiv = document.createElement('div');
          ps.forEach(p => cardDiv.appendChild(p));
          contentElem = cardDiv;
        } else {
          // fallback: use the whole richText div
          contentElem = richText;
        }
      } else {
        // fallback: use the li's textContent as a <span>
        const span = document.createElement('span');
        span.textContent = li.textContent.trim();
        contentElem = span;
      }
      cells.push([contentElem]);
    });
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
