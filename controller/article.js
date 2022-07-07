const Article = require('../model/article')

module.exports = {
    createArticle: async (req, res, next) => {
        try {
            const { 
                name,
                message,
                email,
                role,
                location,
                pincode
            } = req.body
            const newArticle = await new Article({
                name,
                message,
                email,
                role,
                location,
                pincode,
                createdBy: 'Website'
            })
            await newArticle.save()
            return res.status(201).json({ success: true, message: "Article created successfully", response: newArticle })
        }
        catch (error) {
            console.log("errror", error)
            return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
        }
    },
    getArticle: async (req, res, next) => {
        try {
            const {id} = req.params
            const article = await Article.findById(id)
            if (! article){
                return res.status(404).json({success:false, message:"Invalid id, article not found", response:{}})
            }
            return res.status(200).json({success:true, message:"Article found", response:article})
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
        }
    },
    getArticles: async (req, res, next) => {
        try {
          const {id} = req.user
          const articles = await Article.find({createdBy:id})
          return res.status(200).json({success:true, message:`${articles.length} articles found`, response: articles})
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
        }
    }
}