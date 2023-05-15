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

module.exports = {
    stackOverFlowModel: model('stackoverflow', stackOverFlowSchema),
    hacknewsModel: model('hacknews', hacknewsSchema),
}