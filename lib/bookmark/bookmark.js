import axios from 'axios';

import bookmarkTypes from '../../config/enum/bookmark_types.js';
import bookmarkModel from './bookmark_model.js';
import Flickr from './flickr/flickr.js';
import Vimeo from './vimeo/vimeo.js';
import {mongo} from '../backend/mongo.js';

/**
 * Throws an error if the bookmark type is not implemented/handled.
 * @param {string} type bookmark type.
 * @throws {TypeError} Type not implemented
 */
function throwTypeNotImplemented(type) {
	throw new TypeError(`type not implemented, got '${type}', expected '${Object.values(bookmarkTypes)}'.`);
}

/**
 * Throws a request failed error with the given data.
 * @param {string} type bookmark type.
 * @param {string} url bookmark url.
 * @param {string} type bookmark type.
 * @throws {Error} Request failed.
 */
function throwRequestFailed(type, url, err) {
  throw new Error(`request: ${err.message}, url '${url}' (${type})`);
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
   * Parses oembed data. It only returns useful attributes, depending on the type.
   * @param {object} bookmark saved bookmark document.
   * @param {object} oembed data given by the provider to parse.
   * @returns {object} parsed data
   */
  static parseOembed(bookmark, oembed) {
    switch (bookmark.type) {
			case bookmarkTypes.FLICKR:
				return Flickr.parseOembed(bookmark, oembed);
			case bookmarkTypes.VIMEO:
				return Vimeo.parseOembed(bookmark, oembed);
			default:
				return throwTypeNotImplemented(type);
    }
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
      return throwRequestFailed(type, url, err);
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

  /**
   * Gets the saved bookmark corresponding to the given id.
   * @param {string} id bookmark object id.
   * @returns {object|null} found bookmark.
   */
  static async getByID(id) {
		const Model = mongo.getConn().model('bookmark', bookmarkModel);
    let bookmark = {};
    try {
      bookmark = await Model.findById(id, '-__v').lean();
    } catch(err) {
      throw new Error(`getting document by id: ${err.message}`);
    }

    if (bookmark === null) {
      return null;
    }
    
    let oembed = {}
    try {
      oembed = await Bookmark.getOembed(bookmark.type, bookmark.url);
    } catch(err) {
      return throwRequestFailed(type, url, err);
    }

    return Bookmark.parseOembed(bookmark, oembed.data);
  }
}

export default Bookmark;
