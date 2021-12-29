const conn = new Mongo('mongodb://root:example@localhost:27017');

// insert bookmarks
const bookmarksDB = conn.getDB('bookmarks'); 
bookmarksDB.getCollection('bookmarks').insertMany([
  {
    type: 'vimeo',
    url: 'https://vimeo.com/659409353',
    keywords: ['life', 'ai', 'insurance', 'algorithm']
  },
  {
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
