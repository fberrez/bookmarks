class Flickr {
	/**
   * Builds an url to get the oembed data of a targetted link.
   * @param {string} url url used to get the oembed data.
   * @returns {string} built url.
   */
	static buildURL(url) {
		return `https://www.flickr.com/services/oembed/?format=json&url=${encodeURI(url)}`;
	}

	/**
   * Parses oembed data to extract the useful attributes.
   * @param {object} bookmark saved document.
   * @param {object} oembed oembed data to parse.
   * @returns {object} parsed data.
   */
	static parseOembed(bookmark, oembed) {
		return {
			id: bookmark._id,
			url: oembed.url,
			type: bookmark.type,
			title: oembed.title,
			author: oembed.author_name,
			createdAt: bookmark.createdAt,
			keywords: bookmark.keywords,
			height: oembed.height,
			width: oembed.width,
		};
	}
}

export default Flickr;
