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
   * @apiExample {curl} Example usage:
   * curl -XGET "localhost:3000/bookmarks?page=1&limit=10"
	 *
	 * @apiSuccess (200) {object[]} bookmarks list of bookmarks.
   * @apiSuccess (200) {string} bookmarks.id bookmark object id.
   * @apiSuccess (200) {string} bookmarks.url bookmark url.
   * @apiSuccess (200) {string} bookmarks.type bookmark type.
   * @apiSuccess (200) {string[]} bookmarks.keywords bookmark keywords.
   * @apiSuccess (200) {string} bookmarks.title bookmark media title.
   * @apiSuccess (200) {string} bookmarks.author bookmark media author.
   * @apiSuccess (200) {string} bookmarks.createdAt date of creation of the bookmark.
   * @apiSuccess (200) {number} bookmarks.height bookmark media height.
   * @apiSuccess (200) {number} bookmarks.width bookmark media width.
   * @apiSuccess (200) {number} bookmarks.duration bookmark media duration (only exists if it is relevant).
   * @apiSuccess (200) {number} count number of bookmarks returned.
   * @apiSuccess (200) {number} total total number of existing bookmarks.
   * @apiSuccess (200) {number} first first bookmark index.
   * @apiSuccess (200) {number} last last bookmark index.
   * @apiSuccessExample {json} Success-Response:
   * {
   *  "bookmarks":[
   *  {
   *    "id":"61ccaf886cc94de7adf32faf",
   *    "type":"vimeo",
   *    "title":"Forever",
   *    "author":"Mitch McGlocklin",
   *    "keywords":["life","ai","insurance","algorithm"],
   *    "height":240,
   *    "width":426,
   *    "duration":442
   *  },
   *  {
   *    "id":"61ccaf911c1db63ccd104b6f",
   *    "url":"https://live.staticflickr.com/65535/50257689148_7dfba87562_b.jpg",
   *    "type":"flickr",
   *    "title":"Running Late",
   *    "author":"marc.barrot",
   *    "keywords":["running","late","train"],
   *    "height":682,
   *    "width":1024
   *  },
   *  {
   *    "id":"61cdb4867e525e22ca64c18b",
   *    "url":"https://live.staticflickr.com/7038/6859124373_380365dd41_b.jpg",
   *    "type":"flickr",
   *    "title":"mountain",
   *    "author":"barnyz",
   *    "keywords":["mountain","sun","water"],
   *    "height":681,
   *    "width":1024
   *  }],
   *  "count":3,
   *  "total":15,
   *  "first":0,
   *  "last":2
   *  }
   *
   * @apiError (400) BadRequest Limit not valid
   * @apiError (400) BadRequest Page not valid
   * @apiError (404) NotFound Bookmark not found
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
   *
   * @apiError (400) BadRequest Id not valid
   * @apiError (404) NotFound Bookmark not found
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
   *
   * @apiError (400) BadRequest Missing required field: url
   * @apiError (400) BadRequest Missing required field: type
   * @apiError (400) BadRequest Url not valid
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
	 * @apiParam (Body Params) {string[]} keywords list of keywords, separated by comas.
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
	 * @apiExample {curl} Example usage:
   *  curl -XDELETE localhost:3000/bookmarks/61ccaf886cc94de7adf32faf
   *
	 * @apiSuccess (204) NoContent No content
   *
   * @apiError (400) BadRequest Id not valid
	 */
	fastify.delete('/:id', del);
	done();
}
