/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import embedVideo10Parser from './parsers/embedVideo10.js';
import cardsNoImages7Parser from './parsers/cardsNoImages7.js';
import hero3Parser from './parsers/hero3.js';
import cards11Parser from './parsers/cards11.js';
import cardsNoImages12Parser from './parsers/cardsNoImages12.js';
import columns13Parser from './parsers/columns13.js';
import accordion14Parser from './parsers/accordion14.js';
import accordion15Parser from './parsers/accordion15.js';
import columns2Parser from './parsers/columns2.js';
import columns5Parser from './parsers/columns5.js';
import columns18Parser from './parsers/columns18.js';
import columns20Parser from './parsers/columns20.js';
import columns16Parser from './parsers/columns16.js';
import columns6Parser from './parsers/columns6.js';
import accordion25Parser from './parsers/accordion25.js';
import hero17Parser from './parsers/hero17.js';
import columns26Parser from './parsers/columns26.js';
import hero30Parser from './parsers/hero30.js';
import cardsNoImages31Parser from './parsers/cardsNoImages31.js';
import columns1Parser from './parsers/columns1.js';
import columns33Parser from './parsers/columns33.js';
import columns8Parser from './parsers/columns8.js';
import video24Parser from './parsers/video24.js';
import columns22Parser from './parsers/columns22.js';
import columns35Parser from './parsers/columns35.js';
import columns39Parser from './parsers/columns39.js';
import cards34Parser from './parsers/cards34.js';
import columns42Parser from './parsers/columns42.js';
import embedSocial44Parser from './parsers/embedSocial44.js';
import accordion45Parser from './parsers/accordion45.js';
import columns48Parser from './parsers/columns48.js';
import hero4Parser from './parsers/hero4.js';
import accordion47Parser from './parsers/accordion47.js';
import hero49Parser from './parsers/hero49.js';
import columns53Parser from './parsers/columns53.js';
import cards51Parser from './parsers/cards51.js';
import columns52Parser from './parsers/columns52.js';
import hero55Parser from './parsers/hero55.js';
import columns46Parser from './parsers/columns46.js';
import tableStripedBordered54Parser from './parsers/tableStripedBordered54.js';
import columns29Parser from './parsers/columns29.js';
import accordion59Parser from './parsers/accordion59.js';
import accordion58Parser from './parsers/accordion58.js';
import columns57Parser from './parsers/columns57.js';
import hero62Parser from './parsers/hero62.js';
import accordion63Parser from './parsers/accordion63.js';
import accordion60Parser from './parsers/accordion60.js';
import columns65Parser from './parsers/columns65.js';
import hero67Parser from './parsers/hero67.js';
import accordion68Parser from './parsers/accordion68.js';
import columns69Parser from './parsers/columns69.js';
import cardsNoImages70Parser from './parsers/cardsNoImages70.js';
import columns71Parser from './parsers/columns71.js';
import cardsNoImages72Parser from './parsers/cardsNoImages72.js';
import tableNoHeader73Parser from './parsers/tableNoHeader73.js';
import search32Parser from './parsers/search32.js';
import columns21Parser from './parsers/columns21.js';
import cards74Parser from './parsers/cards74.js';
import columns78Parser from './parsers/columns78.js';
import cards77Parser from './parsers/cards77.js';
import accordion79Parser from './parsers/accordion79.js';
import cards80Parser from './parsers/cards80.js';
import embedSocial40Parser from './parsers/embedSocial40.js';
import accordion83Parser from './parsers/accordion83.js';
import cardsNoImages85Parser from './parsers/cardsNoImages85.js';
import cards56Parser from './parsers/cards56.js';
import tableStripedBordered64Parser from './parsers/tableStripedBordered64.js';
import accordion84Parser from './parsers/accordion84.js';
import accordion87Parser from './parsers/accordion87.js';
import columns81Parser from './parsers/columns81.js';
import cards86Parser from './parsers/cards86.js';
import cards82Parser from './parsers/cards82.js';
import tableNoHeader43Parser from './parsers/tableNoHeader43.js';
import embedSocial75Parser from './parsers/embedSocial75.js';
import cardsNoImages76Parser from './parsers/cardsNoImages76.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import cleanupTransformer from './transformers/cleanup.js';
import imageTransformer from './transformers/images.js';
import linkTransformer from './transformers/links.js';
import { TransformHook } from './transformers/transform.js';
import {
  generateDocumentPath,
  handleOnLoad,
  TableBuilder,
  mergeInventory,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  embedVideo10: embedVideo10Parser,
  cardsNoImages7: cardsNoImages7Parser,
  hero3: hero3Parser,
  cards11: cards11Parser,
  cardsNoImages12: cardsNoImages12Parser,
  columns13: columns13Parser,
  accordion14: accordion14Parser,
  accordion15: accordion15Parser,
  columns2: columns2Parser,
  columns5: columns5Parser,
  columns18: columns18Parser,
  columns20: columns20Parser,
  columns16: columns16Parser,
  columns6: columns6Parser,
  accordion25: accordion25Parser,
  hero17: hero17Parser,
  columns26: columns26Parser,
  hero30: hero30Parser,
  cardsNoImages31: cardsNoImages31Parser,
  columns1: columns1Parser,
  columns33: columns33Parser,
  columns8: columns8Parser,
  video24: video24Parser,
  columns22: columns22Parser,
  columns35: columns35Parser,
  columns39: columns39Parser,
  cards34: cards34Parser,
  columns42: columns42Parser,
  embedSocial44: embedSocial44Parser,
  accordion45: accordion45Parser,
  columns48: columns48Parser,
  hero4: hero4Parser,
  accordion47: accordion47Parser,
  hero49: hero49Parser,
  columns53: columns53Parser,
  cards51: cards51Parser,
  columns52: columns52Parser,
  hero55: hero55Parser,
  columns46: columns46Parser,
  tableStripedBordered54: tableStripedBordered54Parser,
  columns29: columns29Parser,
  accordion59: accordion59Parser,
  accordion58: accordion58Parser,
  columns57: columns57Parser,
  hero62: hero62Parser,
  accordion63: accordion63Parser,
  accordion60: accordion60Parser,
  columns65: columns65Parser,
  hero67: hero67Parser,
  accordion68: accordion68Parser,
  columns69: columns69Parser,
  cardsNoImages70: cardsNoImages70Parser,
  columns71: columns71Parser,
  cardsNoImages72: cardsNoImages72Parser,
  tableNoHeader73: tableNoHeader73Parser,
  search32: search32Parser,
  columns21: columns21Parser,
  cards74: cards74Parser,
  columns78: columns78Parser,
  cards77: cards77Parser,
  accordion79: accordion79Parser,
  cards80: cards80Parser,
  embedSocial40: embedSocial40Parser,
  accordion83: accordion83Parser,
  cardsNoImages85: cardsNoImages85Parser,
  cards56: cards56Parser,
  tableStripedBordered64: tableStripedBordered64Parser,
  accordion84: accordion84Parser,
  accordion87: accordion87Parser,
  columns81: columns81Parser,
  cards86: cards86Parser,
  cards82: cards82Parser,
  tableNoHeader43: tableNoHeader43Parser,
  embedSocial75: embedSocial75Parser,
  cardsNoImages76: cardsNoImages76Parser,
};

const transformers = {
  cleanup: cleanupTransformer,
  images: imageTransformer,
  links: linkTransformer,
};

WebImporter.Import = {
  findSiteUrl: (instance, siteUrls) => (
    siteUrls.find(({ id }) => id === instance.urlHash)
  ),
  transform: (hookName, element, payload) => {
    // perform any additional transformations to the page
    Object.entries(transformers).forEach(([, transformerFn]) => (
      transformerFn.call(this, hookName, element, payload)
    ));
  },
  getParserName: ({ name, key }) => key || name,
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (
    { urls = [], fragments = [] },
    sourceUrl = '',
  ) => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => {
      // find url in urls array
      const siteUrl = WebImporter.Import.findSiteUrl(instance, urls);
      if (!siteUrl) {
        return false;
      }
      return siteUrl.url === sourceUrl;
    })
    .map(({ xpath }) => xpath)),
};

const pageElements = [{ name: 'metadata' }];

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { urls = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(inventory, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .flatMap((block) => block.instances
      .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
      .map((instance) => ({
        ...block,
        element: WebImporter.Import.getElementByXPath(document, instance.xpath),
      })))
    .filter((block) => block.element);

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // before page transform hook
  WebImporter.Import.transform(TransformHook.beforePageTransform, main, { ...source });

  const tableBuilder = TableBuilder(WebImporter.DOMUtils.createTable);
  // transform all block elements using parsers
  [...pageElements, ...blockElements].forEach(({ element = main, ...pageBlock }) => {
    const parserName = WebImporter.Import.getParserName(pageBlock);
    const parserFn = parsers[parserName];
    if (!parserFn) return;
    try {
      // before parse hook
      WebImporter.Import.transform(TransformHook.beforeParse, element, { ...source });
      // parse the element
      WebImporter.DOMUtils.createTable = tableBuilder.build(parserName);
      parserFn.call(this, element, { ...source });
      WebImporter.DOMUtils.createTable = tableBuilder.restore();
      // after parse hook
      WebImporter.Import.transform(TransformHook.afterParse, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${pageBlock.key}`, e);
    }
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    const tableBuilder = TableBuilder(WebImporter.DOMUtils.createTable);

    (fragment.instances || [])
      .filter((instance) => {
        const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
        if (!siteUrl) {
          return false;
        }
        return `${siteUrl.url}#${fragment.name}` === originalURL;
      })
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(({ instances }) => instances.find((instance) => {
            const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
            return `${siteUrl.url}#${fragment.name}` === originalURL && instance.xpath === xpath;
          }));

        if (!fragmentBlock) return;
        const parserName = WebImporter.Import.getParserName(fragmentBlock);
        const parserFn = parsers[parserName];
        if (!parserFn) return;
        try {
          WebImporter.DOMUtils.createTable = tableBuilder.build(parserName);
          parserFn.call(this, element, source);
          WebImporter.DOMUtils.createTable = tableBuilder.restore();
        } catch (e) {
          console.warn(`Failed to parse block: ${fragmentBlock.key}, with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, params: { originalURL } } = source;

    // sanitize the original URL
    /* eslint-disable no-param-reassign */
    source.params.originalURL = new URL(originalURL).href;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      const siteUrlsUrl = new URL('/tools/importer/site-urls.json', publishUrl);
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        // fetch and merge site-urls and inventory
        const siteUrlsResp = await fetch(siteUrlsUrl.href);
        const inventoryResp = await fetch(inventoryUrl.href);
        const siteUrls = await siteUrlsResp.json();
        inventory = await inventoryResp.json();
        inventory = mergeInventory(siteUrls, inventory, publishUrl);
      } catch (e) {
        console.error('Failed to merge site-urls and inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // before transform hook
    WebImporter.Import.transform(TransformHook.beforeTransform, main, { ...source, inventory });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source, inventory);
    }

    // after transform hook
    WebImporter.Import.transform(TransformHook.afterTransform, main, { ...source, inventory });

    return [{
      element: main,
      path,
    }];
  },
};
