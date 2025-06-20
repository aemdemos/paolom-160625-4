/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row as in the example
  const headerRow = ['Hero'];
  
  // 2. Find the first image (all three have same src in this case)
  const img = element.querySelector('img');

  // 3. Hero text block (title, subheading, cta); in this HTML there is no such content, so keep empty.
  // If there were heading, subheading, or CTA, you'd find them and reference here.
  const heroTextElements = [];

  // 4. Build the table as in the markdown: header, image, hero text (empty here)
  const rows = [
    headerRow,
    [img],
    [heroTextElements.length ? heroTextElements : ''],
  ];

  // 5. Create the table using WebImporter helper
  const table = WebImporter.DOMUtils.createTable(rows, document);
  
  // 6. Replace the original element with the new block table
  element.replaceWith(table);
}
