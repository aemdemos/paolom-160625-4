/* global WebImporter */
export default function parse(element, { document }) {
  // Get all CardsGrids in the element (deep)
  function getAllCardsGrids(root) {
    return Array.from(root.querySelectorAll('[data-component="CardsGrid"]'));
  }

  // Get all CardContactSimple children for a CardsGrid
  function getCards(cardsGrid) {
    return Array.from(cardsGrid.querySelectorAll(':scope > [data-component="CardContactSimple"]'));
  }

  // Extract the icon/svg for a card (always in the left cell)
  function getCardIcon(card) {
    // Use the first svg found within the immediate icon container
    const iconSpan = card.querySelector('.IconWithContent__StyledIcon-sc-mcdv6-1, span[class*="IconWithContent__StyledIcon"]');
    if (iconSpan) {
      const svg = iconSpan.querySelector('svg');
      if (svg) return svg;
    }
    // fallback: first svg in card
    const svg = card.querySelector('svg');
    if (svg) return svg;
    // fallback: empty node
    return document.createTextNode('');
  }

  // Extract content from card for the right cell
  function getCardContent(card) {
    const result = [];
    // Title/Heading (h3 or h4, preserve tag if possible)
    const heading = card.querySelector('h3, h4');
    if (heading) {
      result.push(heading);
    }
    // Description & details: CardContent, CardAvailability, CardActionText
    // Keep order as in DOM
    const contentAreas = Array.from(card.querySelectorAll('[data-testid="CardContent"], [data-testid="CardAvailability"], [data-testid="CardActionText"]'));
    contentAreas.forEach(area => {
      result.push(area);
    });
    // Any direct a (CTA), not already in content above
    // Only add links that are not inside the contentAreas
    const alreadyInResult = new Set(result.flatMap(el => Array.from(el.querySelectorAll('a'))));
    card.querySelectorAll('a').forEach(a => {
      if (!alreadyInResult.has(a) && !result.includes(a)) {
        result.push(a);
      }
    });
    return result;
  }

  // Helper to check if element is empty (with only whitespace)
  function isEmpty(el) {
    if (!el) return true;
    if (el.nodeType === Node.TEXT_NODE) return !el.textContent.trim();
    if (!el.hasChildNodes()) return !el.textContent.trim();
    return false;
  }

  // Find all cardsgrid blocks in the element
  const cardsGrids = getAllCardsGrids(element);
  if (!cardsGrids.length) return;

  cardsGrids.forEach(cardsGrid => {
    // Only process if there are CardContactSimple children
    const cards = getCards(cardsGrid);
    if (!cards.length) return;
    const rows = [];
    rows.push(["Cards (cards34)"]);
    cards.forEach(card => {
      const icon = getCardIcon(card);
      const content = getCardContent(card);
      // Only add cards that have at least one of icon or content
      if (!isEmpty(icon) || (Array.isArray(content) && content.some(el => !isEmpty(el)))) {
        rows.push([icon, content]);
      }
    });
    // Only replace if there are card rows
    if (rows.length > 1) {
      const table = WebImporter.DOMUtils.createTable(rows, document);
      cardsGrid.replaceWith(table);
    }
  });
}