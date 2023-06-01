const { Schema, model } = require('mongoose');

const stackOverFlowSchema = new Schema({
    blogId: {
        type: Number,
        required: true,
    },
    commentId: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        default: '',
    },
}, {
    collection: 'stackoverflow',
    timestamps: true,
})

const hacknewsSchema = new Schema({
    blogId: {
        type: Number,
        required: true,
    },
    commentId: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        default: '',
    },
}, {
    collection: 'hacknews',
    timestamps: true,
})

const bucketSchema = new Schema({
    blogId: {
        type: String,
        required: true,
        default: '',
    },
    count: {
        type: Number,
        required: true,
    }, // max 10
    comments: {
        blogId: {
            type: Number,
            required: true,
        },
        commentId: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: '',
        },
    }
})

module.exports = {
    stackOverFlowModel: model('stackoverflow', stackOverFlowSchema),
    hacknewsModel: model('hacknews', hacknewsSchema),
    bucketModel: model('bucket', bucketSchema),
}