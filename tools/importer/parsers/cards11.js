/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row
  const rows = [
    ['Cards (cards11)']
  ];

  // Select all CardsGrid sections
  const cardGrids = element.querySelectorAll('[data-component="CardsGrid"]');
  cardGrids.forEach((grid) => {
    // For each card
    const cards = grid.querySelectorAll('.ActionCard__ActionCardOuter-sc-niucah-0');
    cards.forEach((card) => {
      // Image/Icon: the [data-testid="ImageContainer"] div
      const imageDiv = card.querySelector('[data-testid="ImageContainer"]');
      
      // Text: heading + description + CTA
      const textCell = document.createElement('div');
      // Heading (usually <h2>)
      const heading = card.querySelector('[data-ref="heading"]');
      if (heading) textCell.appendChild(heading);
      // Description paragraph(s)
      const cardContent = card.querySelector('[data-testid="CardContent"]');
      if (cardContent) {
        Array.from(cardContent.children).forEach(child => {
          textCell.appendChild(child);
        });
      }
      // CTA link
      const ctaContainer = card.querySelector('.CardCTATextLinks__LinkContainer-sc-14tk81h-0');
      if (ctaContainer) {
        // Add a <br> if there's body text above (not first element)
        if (textCell.childElementCount > 0) {
          textCell.appendChild(document.createElement('br'));
        }
        // Add all links (could be more than one)
        Array.from(ctaContainer.querySelectorAll('a')).forEach(link => {
          textCell.appendChild(link);
        });
      }
      // Add to rows: [image, text]
      rows.push([imageDiv, textCell]);
    });
  });

  // Replace the element with the generated block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
