import {get, getByID, create, update, del} from './bookmark_controllers.js';

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
   * @apiExample {curl} Example usage:
   * curl -XGET localhost:3000/bookmarks/61ccaf911c1db63ccd104b6f
   * 
   * @apiSuccess (200) {string} id bookmark object id.
   * @apiSuccess (200) {string} url bookmark url.
   * @apiSuccess (200) {string} type bookmark type.
   * @apiSuccess (200) {string[]} keywords bookmark keywords.
   * @apiSuccess (200) {string} title bookmark media title.
   * @apiSuccess (200) {string} author bookmark media author.
   * @apiSuccess (200) {string} createdAt date of creation of the bookmark.
   * @apiSuccess (200) {number} height bookmark media height.
   * @apiSuccess (200) {number} width bookmark media width.
   * @apiSuccess (200) {number} duration bookmark media duration (only exists if it is relevant).
   * @apiSuccessExample {json} Success-Response:
   * {
   *  "id": "61ccaf911c1db63ccd104b6f",
   *  "url": "https://live.staticflickr.com/65535/50257689148_7dfba87562_b.jpg",
   *  "type": "flickr",
   *  "keywords": ["running","late","train"],
   *  "title": "Running Late", 
   *  "author": "marc.barrot", 
   *  "createdAt": "2021-12-29T18:49:19.783Z",
   *  "height": 682, 
   *  "width": 1024 
   * }
	 */
	fastify.get('/:id', getByID);

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
