/* global WebImporter */
export default function parse(element, { document }) {
  // The block header as specified
  const headerRow = ['Cards (cardsNoImages85)'];
  const rows = [headerRow];

  // Each card is a <section> inside the container
  const cardSections = element.querySelectorAll(':scope > section');

  cardSections.forEach((section) => {
    // Each card may have a heading and a list of links
    const cardContent = [];
    // Heading: keep the existing heading element for semantic accuracy
    const heading = section.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      cardContent.push(heading);
    }
    // List: keep the existing <ul> element (including its links)
    const list = section.querySelector('ul');
    if (list) {
      cardContent.push(list);
    }
    if (cardContent.length) {
      rows.push([cardContent]);
    }
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
