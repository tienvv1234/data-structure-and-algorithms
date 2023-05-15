const { stackOverFlowModel, hacknewsModel } = require("./model");

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
    }
};