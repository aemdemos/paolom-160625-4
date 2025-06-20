/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to get the best available image (preferring desktop, then tablet, then mobile)
  function getBestImage(el) {
    return (
      el.querySelector('.ImageUi__DesktopImage-sc-1s16dzd-3 img') ||
      el.querySelector('.ImageUi__TabletImage-sc-1s16dzd-2 img') ||
      el.querySelector('.ImageUi__MobileImage-sc-1s16dzd-1 img') ||
      null
    );
  }

  // Per spec, this block is for embedding external video with optional poster image.
  // The provided HTML only contains images, no video/iframe/link. So only the image is included.
  const img = getBestImage(element);

  // Compose the table rows per example: header, then content (image as poster, no link).
  const headerRow = ['Embed (embedVideo10)'];
  const contentRow = [img ? img : ''];
  const cells = [headerRow, contentRow];

  // Build block table and replace element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}