const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    creator_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
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
        type: String,
        required: true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: false
    },
    material_ids: [
        {
            type: Schema.Types.ObjectId,
            ref: 'materials',
            required: false
        }
    ],
    location_id: {
        type: Schema.Types.ObjectId,
        ref: 'locations',
        required: false
    },
    upcycler_ids: [
        {
          type: Schema.Types.ObjectId,
          ref: 'users',
          required: false
        }
    ],
    upcycle_ids: [
        {
          type: Schema.Types.ObjectId,
          ref: 'upcycles',
          required: false
        }
    ],
    upcycle_amount: {
          type: Number,
          required: false,
          default: 0
    },
    timeCreated: {
        type: Date,
        default: () => { return new Date() }
    },
});

module.exports = Post = mongoose.model('posts', PostSchema);
