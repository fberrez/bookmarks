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
  },
  {
    type: 'flickr',
    url: 'https://flic.kr/p/bs7NH4',
    keywords: ['mountain', 'sun', 'water']
  },
  {
    type: 'flickr',
    url: 'https://flic.kr/p/quRVQM',
    keywords: ['mountain', 'sun', 'snow', 'house']
  },
  {
    type: 'flickr',
    url: 'https://flic.kr/p/2mhvEjU',
  },
  {
    type: 'flickr',
    url: 'https://flic.kr/p/2mGaRZ6',
    keywords: ['lake', 'house', 'mountain', 'morning']
  },
  {
    type: 'flickr',
    url: 'https://flic.kr/p/2mQ9Yvs',
    keywords: ['christmas', 'coffee']
  },
  {
    type: 'vimeo',
    url: 'https://vimeo.com/653826310',
  },
  {
    type: 'vimeo',
    url: 'https://vimeo.com/652039454',
    keywords: ['facility']
  },
  {
    type: 'vimeo',
    url: 'https://vimeo.com/660521773',
    keywords: ['straight', 'robot']
  },
  {
    type: 'vimeo',
    url: 'https://vimeo.com/646793833',
    keywords: ['paving', 'toundra']
  },
  {
    type: 'vimeo',
    url: 'https://vimeo.com/659409353',
    keywords: ['forever']
  },
  {
    type: 'vimeo',
    url: 'https://vimeo.com/658911809',
    keywords: ['happinness','journey']
  },
  {
    type: 'flickr',
    url: 'https://flic.kr/p/2kGkvAv',
    keywords: ['fox']
  },
  {
    type: 'flickr',
    url: 'https://flic.kr/p/2kMtzJj',
    keywords: ['desert','mountain']
  },
]);

// create new user
bookmarksDB.createUser({
  user: "bookmarksUser",
  pwd: "mysecret",
  roles: ["readWrite"],
});
