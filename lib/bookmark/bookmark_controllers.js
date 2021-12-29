import createError from 'http-errors';

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

function get(req, res) {
	return res.send(new createError.NotImplemented());
}

function getID(req, res) {
	return res.send(new createError.NotImplemented());
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

	return res.code(200).send(bookmark);
}

function update(req, res) {
	return res.send(new createError.NotImplemented());
}

function del(req, res) {
	return res.send(new createError.NotImplemented());
}

export {create, get, getID, update, del};
