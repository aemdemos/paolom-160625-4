/* global WebImporter */
export default function parse(element, { document }) {
  // The block must have 1 column, 3 rows: header, image (optional), content
  // Header is always 'Hero' as in the markdown example
  // All content must be dynamically extracted from the element

  // 1. Extract the hero image: look for background-image style, data-bg, or any <img> inside the element
  let imgCell = '';
  // Look for a hero image container (background image)
  const imgDiv = element.querySelector('[data-testid="ImageContainer"]');
  if (imgDiv) {
    // Try background-image style
    let imgUrl = '';
    if (imgDiv.style && imgDiv.style.backgroundImage && imgDiv.style.backgroundImage !== 'none') {
      const match = imgDiv.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
      if (match) imgUrl = match[1];
    }
    // Try data-bg attribute
    if (!imgUrl && imgDiv.dataset && imgDiv.dataset.bg) {
      imgUrl = imgDiv.dataset.bg;
    }
    // Try <img> inside
    const imageTag = imgDiv.querySelector('img');
    if (!imgUrl && imageTag && imageTag.src) {
      imgUrl = imageTag.src;
    }
    if (imgUrl) {
      const img = document.createElement('img');
      img.src = imgUrl;
      imgCell = img;
    }
  }
  // If no image found, leave blank as in the example

  // 2. Extract text content (heading, subheading, etc.): we want all text content after breadcrumbs
  // In this HTML, the main content for the hero is inside BreadcrumbsAndContent or SectionHero__InnerContainer
  let contentCell = '';
  // Get the main column holding breadcrumbs and hero content
  let heroContentSection = element.querySelector('.SectionHero__InnerContainer-sc-fol9tk-0') || element;
  // Remove breadcrumb navigation if present
  const heroContent = document.createElement('div');
  const breadcrumbsNav = heroContentSection.querySelector('nav[data-testid="BreadcrumbNavigation"]');
  // We'll copy over everything except the breadcrumb nav and the image container
  Array.from(heroContentSection.children).forEach(child => {
    // Skip breadcrumbs and image container
    if (child === breadcrumbsNav) return;
    if (child === imgDiv) return;
    // Include remaining content
    heroContent.appendChild(child);
  });
  // Remove image containers and breadcrumb nav from deep within heroContent
  heroContent.querySelectorAll('nav[data-testid="BreadcrumbNavigation"], [data-testid="ImageContainer"]').forEach(el => el.remove());
  // Remove empty containers
  Array.from(heroContent.children).forEach(child => {
    if (!child.textContent.trim()) child.remove();
  });
  // If anything is left, use it; otherwise fallback to entire element text
  if (heroContent.textContent.trim()) {
    contentCell = Array.from(heroContent.childNodes);
  } else {
    contentCell = element.textContent.trim();
  }
  // 3. Assemble the cells
  const cells = [
    ['Hero'],
    [imgCell],
    [contentCell],
  ];
  // 4. Create table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
