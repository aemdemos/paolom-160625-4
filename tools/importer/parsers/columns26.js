/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two columns
  const mainGrid = element.querySelector('[data-ref="grid"][data-component="ContentWithSidebar"]');
  if (!mainGrid) return;

  // Get immediate column children of mainGrid
  const columns = Array.from(mainGrid.querySelectorAll(':scope > [data-ref="gridColumn"]'));
  if (columns.length < 2) return;

  // For the left column: heading and feature list (ul)
  let col0Content = [];
  {
    const col0 = columns[0];
    // Heading (h2)
    const heading = col0.querySelector('[data-ref="heading"]');
    if (heading) col0Content.push(heading);
    // Feature list (ul with class .ListTicksCrosses__StyledList-sc-uld9g-0)
    const featureList = col0.querySelector('ul.ListTicksCrosses__StyledList-sc-uld9g-0');
    if (featureList) col0Content.push(featureList);
  }

  // For the right column: eligibility heading, criteria list, and note box (message)
  let col1Content = [];
  {
    const col1 = columns[1];
    // Eligibility heading (h3)
    const eligibilityHeading = col1.querySelector('h3[data-ref="heading"]');
    if (eligibilityHeading) col1Content.push(eligibilityHeading);
    // Eligibility list (ul)
    // Must not select the list from the note box
    let ulCandidates = Array.from(col1.querySelectorAll('ul'));
    // The eligibility list is usually the ul right after the eligibilityHeading
    let eligibilityList = null;
    if (eligibilityHeading) {
      // Try to find the first <ul> that follows the heading
      let next = eligibilityHeading.nextElementSibling;
      while (next && next.tagName !== 'UL') {
        next = next.nextElementSibling;
      }
      if (next && next.tagName === 'UL') {
        eligibilityList = next;
      }
      // If not found, fallback to first ul
      if (!eligibilityList && ulCandidates.length > 0) {
        eligibilityList = ulCandidates[0];
      }
    } else if (ulCandidates.length > 0) {
      eligibilityList = ulCandidates[0];
    }
    if (eligibilityList) col1Content.push(eligibilityList);

    // The note/message box (data-ref="message")
    const messageBox = col1.querySelector('[data-ref="message"]');
    if (messageBox) col1Content.push(messageBox);
  }

  // Build the table as per guidelines
  const cells = [
    ['Columns (columns26)'],
    [col0Content, col1Content]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
