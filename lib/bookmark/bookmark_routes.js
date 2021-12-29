import {get, getID, create, update, del} from './bookmark_controllers.js';

export default function router(fastify, opts, done) {
	/**
	 * @api {get} /bookmarks Get all bookmarks.
	 * @apiGroup Bookmarks
	 * @apiName GetBookmarks
	 * @apiVersion 1.0.0
	 *
	 * @apiParam (Query Params) {number[1-50]} limit=10 defines the number of bookmarks to return.
	 * @apiParam (Query Params) {number[1-]} page=1 defines the page to return.
	 *
	 * @apiSuccess (200) TODO
	 */
	fastify.get('/', get);

	/**
	 * @api {get} /bookmarks/:id Get bookmark by ID.
	 * @apiGroup Bookmarks
	 * @apiName GetBookmarkByID
	 * @apiVersion 1.0.0
	 *
	 * @apiParam (Path Params) {string} id Bookmark object ID.
	 *
	 * @apiSuccess (200) TODO
	 */
	fastify.get('/:id', getID);

	/**
	 * @api {post} /bookmarks Create bookmark.
	 * @apiGroup Bookmarks
	 * @apiName CreateBookmark
	 * @apiVersion 1.0.0
	 *
	 * @apiParam (Body Params) {string} url url to save.
	 * @apiParam (Body Params) {string="vimeo","flickr"} type url type.
	 * @apiParam (Body Params) {string} keywords list of keywords, separated by comas.
   * @apiExample {curl} Example usage:
   *  curl -XPOST -H 'Content-type: application/json' --data '{"url":"https://flic.kr/p/G482eb", "type":"flickr", "keywords":"a,b"}' localhost:3000/bookmarks
   *
   * @apiSuccess (200) {string} id bookmark object id.
   * @apiSuccess (200) {string} url bookmark url.
   * @apiSuccess (200) {string} type bookmark type.
   * @apiSuccess (200) {string[]} keywords bookmark keywords.
   * @apiSuccessExample {json} Success-Response:
   * {
   *  "id": "61cc9a7a8137bc7104719696",
   *  "url": "https://flic.kr/p/xxxx",
   *  "type": "flickr",
   *  "keywords": ["a","b"]
   * }
	 */
	fastify.post('/', create);

	/**
	 * @api {put} /bookmarks/:id Update an existing bookmark.
	 * @apiGroup Bookmarks
	 * @apiName UpdateBookmark
	 * @apiVersion 1.0.0
	 *
	 * @apiParam (Path Params) {string} id Bookmark object ID.
	 *
	 * @apiParam (Body Params) keywords list of keywords, separated by comas.
	 *
	 * @apiSuccess (200) TODO
	 */
	fastify.put('/:id', update);

	/**
	 * @api {delete} /bookmarks/:id Delete an existing bookmark.
	 * @apiGroup Bookmarks
	 * @apiName DeleteBookmark
	 * @apiVersion 1.0.0
	 *
	 * @apiParam (Path Params) {string} id Bookmark object ID.
	 *
	 * @apiSuccess (200) TODO
	 */
	fastify.delete('/:id', del);
	done();
}
