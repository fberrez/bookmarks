const conn = new Mongo('mongodb://root:example@localhost:27017');

// insert bookmarks
const bookmarksDB = conn.getDB('bookmarks'); 
bookmarksDB.getCollection('bookmarks').insertMany([
  {
    _id: ObjectId("61ccaf886cc94de7adf32faf"),
    type: 'vimeo',
    url: 'https://vimeo.com/659409353',
    keywords: ['life', 'ai', 'insurance', 'algorithm']
  },
  {
    _id: ObjectId("61ccaf911c1db63ccd104b6f"),
    type: 'flickr',
    url: 'https://flic.kr/p/2jz6N2S',
    keywords: ['running', 'late', 'train']
  }
]);

// create new user
bookmarksDB.createUser({
  user: "bookmarksUser",
  pwd: "mysecret",
  roles: ["readWrite"],
});
