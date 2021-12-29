import axios from 'axios';

import bookmarkTypes from '../../config/enum/bookmark_types.js';
import bookmarkModel from './bookmark_model.js';
import Flickr from './flickr/flickr.js';
import Vimeo from './vimeo/vimeo.js';
import {mongo} from '../backend/mongo.js';

function throwTypeNotImplemented(type) {
	throw new TypeError(`type not implemented, got '${type}', expected '${Object.values(bookmarkTypes)}'.`);
}

class Bookmark {
	/**
   * Checks the bookmark type validity.
   * @param {string} type bookmark type to check.
   * @returns {boolean} true if the given type is valid.
   */
	static isTypeValid(type) {
		if (!Object.values(bookmarkTypes).includes(type)) {
			return throwTypeNotImplemented(type);
		}

		return true;
	}

	/**
   * Gets oembed data from provider.
   * @param {string} type boomark type.
   * @param {string} url bookmark url.
   * @param {Promise} axios query.
   */
	static async getOembed(type, url) {
		let oembedURL = '';
		switch (type) {
			case bookmarkTypes.FLICKR:
				oembedURL = Flickr.buildURL(url);
				break;
			case bookmarkTypes.VIMEO:
				oembedURL = Vimeo.buildURL(url);
				break;
			default:
				return throwTypeNotImplemented(type);
		}

		return axios({
			method: 'get',
			url: oembedURL,
		});
	}

	/**
   * Returns true if the given url is valid (returns 200 OK).
   * @param {string} type bookmark type.
   * @param {string} url url to test.
   * @returns {boolean} true if the given url is valid.
   */
	static async isURLValid(type, url) {
		let response = {};
		try {
			response = await Bookmark.getOembed(type, url);
		} catch (err) {
			throw new Error(`request: ${err.message}, url '${url}' (${type})`);
		}

		return response.status === 200;
	}

	/**
   * Creates a new bookmark and insert it in the database.
   * @param {string} type bookmark type.
   * @param {string} url bookmark url.
   * @param {string[]} keywords bookmark keywords.
   * @returns {object} saved bookmark (_id included).
   */
	static async create(type, url, keywords) {
		const Model = mongo.getConn().model('bookmark', bookmarkModel);
		const bookmark = await new Model({type, url, keywords}).save();
		return bookmark.toObject();
	}
}

export default Bookmark;
