class Vimeo {
	/**
   * Builds an url to get the oembed data of a targetted link.
   * @param {string} url url used to get the oembed data.
   * @returns {string} built url.
   */
	static buildURL(url) {
		return `https://vimeo.com/api/oembed.json?url=${encodeURI(url)}`;
	}

  /**
   * Parses oembed data to extract the useful attributes.
   * @param {object} oembed oembed data to parse.
   * @returns {object} parsed data.
   */
  static parseOembed(oembed) {
    return {
      height: oembed.height,
      width: oembed.width,
      duration: oembed.duration,
    }  
  }
}

export default Vimeo;
