import createError from 'http-errors';
import mongoose from 'mongoose';

import Bookmark from './bookmark.js';

/**
 * Parses the given body.
 * @param {object} body body to parse.
 * @returns {object} parsed body.
 * @throws {Error} Will throw an error if a required param is missing.
 */
function parseBodyParams(body) {
	const newBody = {};
	if (body.url === undefined) {
		throw new Error('missing required field: url');
	}

	newBody.url = body.url;
	if (body.type === undefined) {
		throw new Error('missing required field: type');
	}

	newBody.type = body.type.toLowerCase();
	Bookmark.isTypeValid(newBody.type);
	if (body.keywords === undefined) {
		return newBody;
	}

	newBody.keywords = body.keywords.split(',');
	return newBody;
}

async function get(req, res) {
	return res.send(new createError.NotImplemented());
}

async function getByID(req, res) {
  if (!mongoose.Types.ObjectId(req.params.id)) {
    return res.send(new createError.BadRequest(`id not valid, got ${req.params.id}, expected object id`));
  }

  let bookmark = {};
  try {
    bookmark = await Bookmark.getByID(req.params.id);
  } catch (err) {
    return res.send(err);
  }

  if (bookmark === null) {
    return res.send(new createError.NotFound(`bookmark not found`));
  }

  return res.code(200).send(bookmark);
}

async function create(req, res) {
	const parsedBody = parseBodyParams(req.body);
	try {
		await Bookmark.isURLValid(parsedBody.type, parsedBody.url);
	} catch (err) {
		return res.send(new createError.BadRequest(`url not valid: ${err.message}`));
	}

	let bookmark = {};
	try {
		bookmark = await Bookmark.create(parsedBody.type, parsedBody.url, parsedBody.keywords);
	} catch (err) {
		return res.send(new createError.InternalServerError(`creating bookmark: ${err.message}`));
	}

	return res.code(200).send({
    id: bookmark._id,
    url: bookmark.url,
    type: bookmark.type,
    keywords: bookmark.keywords,
  });
}

function update(req, res) {
	return res.send(new createError.NotImplemented());
}

function del(req, res) {
	return res.send(new createError.NotImplemented());
}

export {create, get, getByID, update, del};
