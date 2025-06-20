/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Block Header (must match example EXACTLY)
  const headerRow = ['Hero'];

  // 2. Background image (optional)
  // In input HTML, it's a div with class ImageContainer__BackgroundImage or SectionHero__ImageContainerStyled-sc-fol9tk-2
  let imgCell = '';
  const imageDiv = element.querySelector('.ImageContainer__BackgroundImage, .SectionHero__ImageContainerStyled-sc-fol9tk-2');
  // This element usually has background CSS. Try to extract background-image url from style attribute.
  if (imageDiv) {
    // Try style attribute
    const style = imageDiv.getAttribute('style') || '';
    // Look for background-image: url(...)
    const urlMatch = style.match(/background-image\s*:\s*url\(["']?(.*?)["']?\)/i);
    if (urlMatch && urlMatch[1]) {
      const img = document.createElement('img');
      img.src = urlMatch[1];
      imgCell = img;
    } else {
      // No style, sometimes a child img exists but isn't present in this HTML, so leave it blank.
      imgCell = '';
    }
  } else {
    imgCell = '';
  }

  // 3. Content cell: heading, subheading, CTA (optional)
  // Heading: h1[data-ref="heading"].
  // Subheading: p after the heading, or .Content-sc-mh9bui-0
  // CTA: .NelComponents__ButtonGroup-sc-vsly48-10, .LinkGroup-sc-xemnca-0 (may be empty)
  const contentParts = [];
  const h1 = element.querySelector('h1[data-ref="heading"]');
  if (h1) contentParts.push(h1);

  // Subheading: look for Content-sc-mh9bui-0 or a p after h1
  let subheading = null;
  const contentDiv = element.querySelector('.Content-sc-mh9bui-0');
  if (contentDiv) {
    subheading = contentDiv;
  } else if (h1) {
    // Try nextElementSibling is a p
    let sib = h1.nextElementSibling;
    while (sib && (!subheading)) {
      if (sib.tagName.toLowerCase() === 'p') {
        subheading = sib;
      }
      sib = sib.nextElementSibling;
    }
  }
  if (subheading) contentParts.push(subheading);

  // CTA: .NelComponents__ButtonGroup-sc-vsly48-10, .LinkGroup-sc-xemnca-0
  const cta = element.querySelector('.NelComponents__ButtonGroup-sc-vsly48-10, .LinkGroup-sc-xemnca-0');
  // Only add if it has content (non-empty)
  if (cta && cta.childElementCount > 0) {
    contentParts.push(cta);
  }

  // If no content, keep cell blank
  const contentCell = contentParts.length ? contentParts : '';

  // 4. Assemble table (header, image, content)
  const cells = [
    headerRow,
    [imgCell],
    [contentCell]
  ];

  // 5. Create table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
