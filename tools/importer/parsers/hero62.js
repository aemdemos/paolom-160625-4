/* global WebImporter */
export default function parse(element, { document }) {
  // Get all columns in the side-by-side grid
  const cols = element.querySelectorAll(':scope > div');
  const images = [];

  // For each column, get the largest available image (desktop > tablet > mobile)
  cols.forEach((col) => {
    let img = col.querySelector('.ImageUi__DesktopImage-sc-1s16dzd-3 img');
    if (!img) {
      img = col.querySelector('.ImageUi__TabletImage-sc-1s16dzd-2 img');
    }
    if (!img) {
      img = col.querySelector('.ImageUi__MobileImage-sc-1s16dzd-1 img');
    }
    if (img) {
      images.push(img);
    }
  });

  // Compose the table rows according to the example markdown
  const rows = [];
  // Header row matches the example
  rows.push(['Hero']);
  // Second row: all referenced image elements in one row (side by side)
  if (images.length) {
    rows.push([images]);
  } else {
    rows.push(['']);
  }
  // Third row: In this HTML there is no heading or text, so leave blank
  rows.push(['']);

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
