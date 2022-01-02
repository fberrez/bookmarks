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
	const limit = req.query.limit === undefined ? undefined : parseInt(req.query.limit, 10);
	const page = req.query.page === undefined ? undefined : parseInt(req.query.page, 10);
	if (limit !== undefined && (limit < 1 || limit > 50)) {
		return res.send(new createError.BadRequest(`limit not valid, got '${limit}', expected value in [1-50]`));
	}

	if (page !== undefined && page < 1) {
		return res.send(new createError.BadRequest(`page not valid, got '${page}', expect value in [1-]`));
	}

	let result = {};
	try {
		result = await Bookmark.get(limit, page);
	} catch (err) {
		return res.send(err);
	}

	return res.code(200).send(result);
}

async function getByID(req, res) {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.send(new createError.BadRequest(`id not valid, got ${req.params.id}, expected object id`));
	}

	let bookmark = {};
	try {
		bookmark = await Bookmark.getByID(req.params.id);
	} catch (err) {
		return res.send(err);
	}

	if (bookmark === null) {
		return res.send(new createError.NotFound('bookmark not found'));
	}

	return res.code(200).send(bookmark);
}

async function create(req, res) {
	let parsedBody = {};
	try {
		parsedBody = parseBodyParams(req.body);
	} catch (err) {
		return res.send(new createError.BadRequest(err.message));
	}

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

async function update(req, res) {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.send(new createError.BadRequest(`id not valid, got ${req.params.id}, expected object id`));
	}

	if (req.body.keywords === undefined) {
		return res.send(new createError.BadRequest('missing required field: keywords'));
	}

	try {
		const result = await Bookmark.update(req.params.id, req.body.keywords.split(','));
		if (result.modifiedCount === 0) {
			return res.send(new createError.NotFound('bookmark not found'));
		}
	} catch (err) {
		return res.send(new createError.InternalServerError(`updating bookmark: ${err.message}`));
	}

	let bookmark = {};
	try {
		bookmark = await Bookmark.getByID(req.params.id);
	} catch (err) {
		return res.send(err);
	}

	if (bookmark === null) {
		return res.send(new createError.NotFound('bookmark not found'));
	}

	return res.code(200).send(bookmark);
}

async function del(req, res) {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.send(new createError.BadRequest(`id not valid, got ${req.params.id}, expected object id`));
	}

	try {
		await Bookmark.del(req.params.id);
	} catch (err) {
		return res.send(new createError.InternalServerError(`deleting bookmark: ${err.message}`));
	}

	return res.code(204).send();
}

export {create, get, getByID, update, del};
