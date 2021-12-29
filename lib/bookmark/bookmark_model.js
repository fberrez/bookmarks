import mongoose from 'mongoose';

import bookmarkTypes from '../../config/enum/bookmark_types.js';

const bookmark = new mongoose.Schema({
	url: {type: String, required: true},
	type: {type: String, required: true, enum: Object.values(bookmarkTypes), lowercase: true},
	keywords: [{type: String, required: true, lowercase: true}],
});

export default bookmark;