const { default: axios } = require("axios");
const { insertComments, insertManyComments, list, list2 } = require("./service");

const controller = module.exports = {
    insertComments : async (req, res, next) => {
        try {
            const { blogId, commentId, email } = req.body;
            return res.status(200).json({
                status: "success",
                elements: await insertComments({
                    blogId,
                    commentId,
                    email
                })
            });

        } catch (error) {
            console.log(error);
        }
    },
    insertManyComments : async (req, res, next) => {
        try {
            const resp = await axios.get(`https://jsonplaceholder.typicode.com/comments`);
            // console.log(resp);
            const newArray = resp.data.map((item) => {
                return {
                    blogId: 1,
                    commentId: +item.id,
                    email: item.email
                }
            })
            await insertManyComments(newArray);
            return res.status(200).json({
                status: "success",
                elements: newArray
            })
        } catch (error) {
            console.log(error);
        }
    },
    list: async (req, res, next) => {
        try {
            const { blogId, page = 1, pageSize = 50 } = req.query;
            return res.status(200).json({
                status: "success",
                elements: await list({
                    blogId,
                    page,
                    pageSize
                }),
                meta: {
                    page,
                    pageSize
                }
            });
        } catch (error) {
            console.log(error);
        }
    },
    list2: async (req, res, next) => {
        try {
            const { blogId = 1, commentId = 0, pageSize = 50 } = req.query;
            console.log(blogId, commentId, pageSize);
            return res.status(200).json({
                status: "success",
                elements: await list2({
                    blogId,
                    commentId,
                    pageSize
                }),
                meta: {
                    pageSize,
                    blogId,
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
};