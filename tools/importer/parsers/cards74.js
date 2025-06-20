/* global WebImporter */
export default function parse(element, { document }) {
  // Find all CardsGrid containers at any depth inside the main element
  const cardsGrids = Array.from(element.querySelectorAll('.CardsGrid-sc-ly43w8-0'));
  const cards = [];
  cardsGrids.forEach((cardsGrid) => {
    // Each card is an .ActionCard__ActionCardOuter-sc-niucah-0
    const cardEls = Array.from(cardsGrid.querySelectorAll(':scope > .ActionCard__ActionCardOuter-sc-niucah-0'));
    cardEls.forEach((cardEl) => {
      // LEFT CELL: Icon as <span> with role and aria-label, using original element
      let icon = null;
      const iconDiv = cardEl.querySelector('.ImageContainer__BackgroundImage-sc-fxzmob-0');
      if (iconDiv) {
        icon = iconDiv;
      }
      // RIGHT CELL: Heading, description (p, ul, etc), and CTA (link)
      const contentFrag = document.createDocumentFragment();
      // Heading
      const heading = cardEl.querySelector('h2');
      if (heading) contentFrag.appendChild(heading);
      // Description blocks (get all CardContent children: p, ul, etc)
      const cardContent = cardEl.querySelector('[data-testid="CardContent"]');
      if (cardContent) {
        // Only top-level children
        Array.from(cardContent.children).forEach((descEl) => {
          contentFrag.appendChild(descEl);
        });
      }
      // CTA link
      const cta = cardEl.querySelector('.CardCTATextLinks__LinkContainer-sc-14tk81h-0 a');
      if (cta) contentFrag.appendChild(cta);
      // Add this card's [icon, content] row
      cards.push([icon, contentFrag]);
    });
  });
  // Construct the table: 2 columns, n+1 rows (header + cards)
  const cells = [ [ 'Cards (cards74)' ], ...cards ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
