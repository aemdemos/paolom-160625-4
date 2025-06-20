/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per example
  const headerRow = ['Columns (columns21)'];

  // --- First main row: 3 columns of links (left), Social links (right) ---
  // Find the three footer navigation columns ("Get in touch", "About Nationwide", "Here to help")
  let navColumnsBlock = null;
  const innerFooter = element.querySelector('.Footer__InnerFooter-sc-cd0zm5-1');
  if (innerFooter) {
    // Grab the whole nav block containing the columns so no text is missed
    navColumnsBlock = innerFooter.querySelector('.FooterNavigation__ColumnedFooter-sc-e6atpx-0');
  }
  // For right side: social + copyright
  let socialCopyrightBlock = null;
  // Social/copyright is always inside .Footer__SocialCopyrightWrapper-sc-cd0zm5-4
  socialCopyrightBlock = element.querySelector('.Footer__SocialCopyrightWrapper-sc-cd0zm5-4');

  // --- Second row: Legal/disclaimer (left), copyright only (right, if available) ---
  let legalBlock = null;
  // Legal text is in .Footer__ContentArea-sc-cd0zm5-2
  legalBlock = element.querySelector('.Footer__ContentArea-sc-cd0zm5-2');
  // Copyright area for right column of bottom row
  let copyrightBlock = null;
  // It's typically inside the SocialCopyrightWrapper
  if (socialCopyrightBlock) {
    copyrightBlock = socialCopyrightBlock.querySelector('.Footer__CopyrightArea-sc-cd0zm5-6');
  }

  // Fallback if any area is missing
  if (!navColumnsBlock) navColumnsBlock = '';
  if (!socialCopyrightBlock) socialCopyrightBlock = '';
  if (!legalBlock) legalBlock = '';
  if (!copyrightBlock) copyrightBlock = '';

  // Table rows as per example: header, then two rows with two columns each
  const cells = [
    headerRow,
    [navColumnsBlock, socialCopyrightBlock],
    [legalBlock, copyrightBlock],
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
