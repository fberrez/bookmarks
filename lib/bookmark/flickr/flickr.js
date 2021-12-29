class Flickr {
	/**
   * Builds an url to get the oembed data of a targetted link.
   * @param {string} url url used to get the oembed data.
   * @returns {string} built url.
   */
	static buildURL(url) {
		return `https://www.flickr.com/services/oembed/?format=json&url=${encodeURI(url)}`;
	}
}

export default Flickr;
