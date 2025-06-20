/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards86)'];
  const rows = [];

  // Each card is a direct child div with data-component="CardContactSimple"
  const cards = Array.from(element.querySelectorAll(':scope > div[data-component="CardContactSimple"]'));

  cards.forEach(card => {
    // Icon cell (first visible SVG in icon container)
    const iconContainer = card.querySelector('.IconWithContent__Container-sc-mcdv6-0');
    let icon = null;
    if (iconContainer) {
      // Reference existing span that contains the svg (do not clone, do not extract HTML string)
      // To ensure referencing the actual element, get the span directly
      const iconSpan = iconContainer.querySelector('span.IconWithContent__StyledIcon-sc-mcdv6-1');
      if (iconSpan) {
        icon = iconSpan;
      }
    }

    // Text cell - collect existing elements in order: h3 (heading), availability, action
    const contentParts = [];
    const title = card.querySelector('h3');
    if (title) contentParts.push(title);
    // There may be multiple paragraphs in availability, preserve all
    const availability = card.querySelector('div[data-testid="CardAvailability"]');
    if (availability) contentParts.push(availability);
    const action = card.querySelector('div[data-testid="CardActionText"]');
    if (action) contentParts.push(action);

    rows.push([icon, contentParts]);
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}