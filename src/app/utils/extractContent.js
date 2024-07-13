// utils/extractContent.js
import cheerio from 'cheerio';

export const extractContent = (html) => {
  const $ = cheerio.load(html);
  const data = {
    videos: [],
    images: [],
    otherContent: []
  };

  // Extract videos
  $('iframe').each((i, el) => {
    const src = $(el).attr('src');
    data.videos.push(src);
  });

  // Extract images
  $('img').each((i, el) => {
    const src = $(el).attr('src');
    const alt = $(el).attr('alt') || '';
    data.images.push({ src, alt });
  });

  // Extract other content (example: extracting all text within divs)
  $('div').each((i, el) => {
    const content = $(el).text().trim();
    if (content) {
      data.otherContent.push(content);
    }
  });

  return data;
};


export const extractIframeFromMetaData = (metaData) => {
    const iframeMeta = metaData?.find(item => 
      item.key.startsWith('_oembed') && typeof item.value === 'string' && item.value.includes('<iframe')
    );
    if (iframeMeta) {
        const iframeTag = iframeMeta.value;
        const srcMatch = iframeTag.match(/src="([^"]+)"/);
        return srcMatch ? srcMatch[1] : null;
      }
  
    return null;
  };