const axios = require('axios');
const cheerio = require('cheerio');

exports.fetchMetadata = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    return {
      title: $('title').text() || 'Untitled',
      description: $('meta[name="description"]').attr('content') || ''
    };
  } catch (err) {
    console.error('Error fetching metadata:', err.message);
    return { title: 'Untitled', description: '' };
  }
};