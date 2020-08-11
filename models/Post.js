const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    creator_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    image: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: Text,
        required: true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    material_ids: [
        {
            type: Schema.Types.ObjectId,
            ref: 'materials',
            required: true
        }
    ],
    location_id: {
        type: Schema.Types.ObjectId,
        ref: 'locations',
        required: true
    },
    timeCreated: {
        type: Date,
        default: new Date()
    }
});

module.export = Post = mongoose.model('posts', PostSchema);