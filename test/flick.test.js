import Flickr from '../lib/bookmark/provider/flickr/flickr';

test('url valid', async () => {
	const isValid = await Flickr.isURLValid('http://www.flickr.com/photos/bees/2341623661/');
	expect(isValid).toBeTruthy();
});

test('url not valid', async () => {
	let error = '';
	try {
		await Flickr.isURLValid('http://www.flickr.com/photos/bees/aaa/');
	} catch (err) {
		error = err;
	}

	expect(error).toBeInstanceOf(Error);
});
