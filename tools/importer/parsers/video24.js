/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two main columns (text + video)
  const columns = element.querySelectorAll(':scope > div');
  let textCol = null;
  let videoCol = null;
  let iframe = null;

  columns.forEach(col => {
    const ifr = col.querySelector('iframe[src]');
    if (ifr && !videoCol) {
      videoCol = col;
      iframe = ifr;
    } else if (!textCol) {
      textCol = col;
    }
  });

  // Extract all relevant text content from textCol (headings and rich text)
  let textEls = [];
  if (textCol) {
    // Look for a heading (h1-h6)
    const heading = textCol.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) textEls.push(heading);
    // Look for main rich text content
    const richText = textCol.querySelector('[data-component="RichText"], .RichText__StyledRichTextContent-sc-1j7koit-0, .passthru, .Content-sc-mh9bui-0');
    if (richText) {
      // Add all child nodes (paragraphs, links, etc) in order
      Array.from(richText.childNodes).forEach(node => {
        if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())) {
          textEls.push(node);
        }
      });
    }
  }

  // Extract the video link as required
  let videoLink = null;
  if (iframe) {
    const src = iframe.getAttribute('src');
    videoLink = document.createElement('a');
    videoLink.href = src;
    videoLink.textContent = src;
  }

  // Build the single cell, preserving order: text content, then video link
  const cellContent = [];
  if (textEls.length) cellContent.push(...textEls);
  if (videoLink) {
    if (cellContent.length) cellContent.push(document.createElement('br'));
    cellContent.push(videoLink);
  }

  const cells = [
    ['Video'],
    [cellContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
