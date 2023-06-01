const { stackOverFlowModel, hacknewsModel, bucketModel } = require("./model");

const service = module.exports = {
    insertComments : async ({
        blogId,
        commentId,
        email,
    }) => {
        try {
            return await hacknewsModel.create({
                blogId,
                commentId,
                email,
            })
        } catch (error) {
            console.log(error);
        }
    },
    insertManyComments : async (arrItems) => {
        return await hacknewsModel.insertMany(arrItems);
    },
    list: async ({ blogId, page = 1, pageSize = 50 }) => {
        return await stackOverFlowModel.find({ blogId }).skip((page - 1) * pageSize).limit(pageSize);
    },
    list2: async ({ blogId, commentId, pageSize = 50 }) => {
        return await hacknewsModel.find({ blogId, commentId: { $gt: commentId}}).select({ commentId: 1}).limit(pageSize);
    },
    insertBucket : async ({ blogId, commentId, name, body, email }) => {
        try {
            const _blogId = new RegExp(`^${blogId}_`);
            console.log(_blogId);
            console.log(body);
            return await bucketModel.findOneAndUpdate({
                blogId: _blogId, // blogId must be string unique
                count: { $lt: 10 }
            }, {
                $push: {
                    comments: {
                        commentId,
                        email,
                        name,
                        body
                    }
                },
                $inc: {
                    count: 1
                },
                $setOnInsert: {
                    blogId: `${blogId}_${new Date().getTime()}`,
                }
            }, {
                upsert: true, // must be true
                new: true
            });
        } catch (error) {
            console.log(error);
        }
    },
    listPaging: async ({ blogId, page = 1, limit = 1 }) => {
        const _blogId = new RegExp(`^${blogId}_`);

        return await bucketModel.find({
            blogId: _blogId,
        }).sort({ _id: 1 }).skip((page - 1) * limit).limit(limit);
    }
};