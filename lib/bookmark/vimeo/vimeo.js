class Vimeo {
	/**
   * Builds an url to get the oembed data of a targetted link.
   * @param {string} url url used to get the oembed data.
   * @returns {string} built url.
   */
	static buildURL(url) {
		return `https://vimeo.com/api/oembed.json?url=${encodeURI(url)}`;
	}
}

export default Vimeo;
