/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block (must match example: 'Hero')
  const header = ['Hero'];

  // Row 2: Background image (optional)
  // Find the image as background-image style or <img> in the first relevant child
  let imageEl = null;
  const bgDiv = element.querySelector('[data-testid="ImageContainer"]');
  if (bgDiv) {
    let imgUrl = null;
    if (bgDiv.style && bgDiv.style.backgroundImage) {
      // backgroundImage: url("https://...")
      const match = bgDiv.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/i);
      if (match && match[1]) {
        imgUrl = match[1];
      }
    } else if (bgDiv.getAttribute('style')) {
      const styleAttr = bgDiv.getAttribute('style');
      const match = styleAttr.match(/background-image:\s*url\(["']?(.*?)["']?\)/i);
      if (match && match[1]) {
        imgUrl = match[1];
      }
    }
    if (imgUrl) {
      imageEl = document.createElement('img');
      imageEl.src = imgUrl;
      imageEl.alt = bgDiv.getAttribute('aria-label') || '';
    } else {
      // Fallback: any <img> inside?
      const innerImg = bgDiv.querySelector('img');
      if (innerImg) imageEl = innerImg;
    }
  }
  // If not found, leave blank cell per spec
  const row2 = [imageEl || ''];

  // Row 3: Heading, description, CTA link (all in one cell)
  const contentArr = [];
  // Heading: find first heading element in content area
  const heading = element.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) contentArr.push(heading);

  // Description: get all paragraphs in the main content area (avoid CTA container)
  // The content paragraph is under: [data-testid="CardContent"]
  const descContainer = element.querySelector('[data-testid="CardContent"]');
  if (descContainer) {
    descContainer.querySelectorAll('p').forEach(p => contentArr.push(p));
  }

  // CTA: link, in the provided markup as <a data-ref="link">
  const cta = element.querySelector('a[data-ref="link"]');
  if (cta) contentArr.push(cta);

  const row3 = [contentArr];

  // Compose the block table
  const cells = [header, row2, row3];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element
  element.replaceWith(table);
}
