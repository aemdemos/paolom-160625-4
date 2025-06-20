/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get the best available image (Desktop > Tablet > Mobile)
  function getMainImage() {
    // Prefer desktop, then tablet, then mobile image
    const imgSelectors = [
      '.ImageUi__DesktopImage-sc-1s16dzd-3 img',
      '.ImageUi__TabletImage-sc-1s16dzd-2 img',
      '.ImageUi__MobileImage-sc-1s16dzd-1 img'
    ];
    for (const sel of imgSelectors) {
      const img = element.querySelector(sel);
      if (img) return img;
    }
    // fallback: first image
    const anyImg = element.querySelector('img');
    return anyImg || '';
  }

  // Find the columns (image left, content right)
  const cols = element.querySelectorAll('[data-ref="gridColumn"]');
  // Fallback to direct div children if not found
  let imgCol = null, contentCol = null;
  if (cols.length > 1) {
    imgCol = cols[0];
    contentCol = cols[1];
  } else {
    // fallback - not expected for this HTML but more robust
    const divs = element.querySelectorAll(':scope > div');
    if (divs.length > 1) {
      imgCol = divs[0];
      contentCol = divs[1];
    }
  }

  // Get the main image element (or blank cell)
  const imgEl = getMainImage();

  // Get content elements: heading, (multiple) paragraphs, CTA (a link)
  let contentBlocks = [];
  if (contentCol) {
    // Get all headings in order (h1-h6)
    const heading = contentCol.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) contentBlocks.push(heading);
    // Get all paragraphs
    contentCol.querySelectorAll('p').forEach(p => contentBlocks.push(p));
    // Get first CTA link (a), but only if not already present (sometimes links are inside paragraphs)
    const cta = contentCol.querySelector('a');
    if (cta && !contentBlocks.includes(cta)) contentBlocks.push(cta);
  }
  // Defensive: if contentCol doesn't exist, try top-level for content
  if (!contentBlocks.length) {
    const heading = element.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) contentBlocks.push(heading);
    element.querySelectorAll('p').forEach(p => contentBlocks.push(p));
    const cta = element.querySelector('a');
    if (cta && !contentBlocks.includes(cta)) contentBlocks.push(cta);
  }

  // Build table rows according to example (1 col, 3 rows, header: Hero)
  const tableRows = [
    ['Hero'],
    [imgEl || ''],
    [contentBlocks.length ? contentBlocks : '']
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
