import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import { Blog } from "../models/blogSchema.js";
import cloudinary from "cloudinary";

export const blogPost = catchAsyncError(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Blog Main Image is Required!", 400));
    }

    const { mainImage, paraOneImage, paraTwoImage, paraThreeImage } = req.files;

    if (!mainImage) {
        return next(new ErrorHandler("Blog Main Image is Required!", 400));
    }

    const allowedFormats = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(mainImage.mimetype)
        || (paraOneImage && !allowedFormats.includes(paraOneImage.mimetype))
        || (paraTwoImage && !allowedFormats.includes(paraTwoImage.mimetype))
        || (paraThreeImage && !allowedFormats.includes(paraThreeImage.mimetype))
    ) {
        return next(new ErrorHandler("Invalid File Format. Only PNG, JPG, JPEG, WEBP are allowed", 400));
    }

    const {
        title,
        intro,
        paraOneDescription,
        paraOneTitle,
        paraTwoDescription,
        paraTwoTitle,
        paraThreeDescription,
        paraThreeTitle ,
        category,
        published
    } = req.body;
    const createdBy = req.user._id;
    
    const authorName = req.user.name;
    const authorAvatar = req.user.avatar.url;

    if(!title || !intro || !category){
        return next(new ErrorHandler("Title, Intro and Category are required", 400));
    }

    const uploadPromises = [
        cloudinary.uploader.upload(mainImage.tempFilePath),
        paraOneImage 
        ? cloudinary.uploader.upload(paraOneImage.tempFilePath) 
        : Promise.resolve(null),
        paraTwoImage 
        ? cloudinary.uploader.upload(paraTwoImage.tempFilePath) 
        : Promise.resolve(null),
        paraThreeImage 
        ? cloudinary.uploader.upload(paraThreeImage.tempFilePath) 
        : Promise.resolve(null),
    ];

    const [mainImageRes,paraOneImageRes,paraTwoImageRes,paraThreeImageRes] 
    = await Promise.all(uploadPromises);

    if(!mainImageRes || mainImageRes.error 
        || (paraOneImageRes &&(!paraOneImageRes || paraOneImageRes.error))
        || (paraTwoImageRes &&(!paraTwoImageRes || paraTwoImageRes.error))
        || (paraThreeImageRes &&(!paraThreeImageRes || paraThreeImageRes.error))
        )
    {
        return next(new ErrorHandler("Error occured while uploading images", 500)); //500 is internal server error
    }

    const blogData = {
        title,
        intro,
        paraOneDescription,
        paraOneTitle,
        paraTwoDescription,
        paraTwoTitle,
        paraThreeDescription,
        paraThreeTitle,
        category,
        createdBy,
        authorName,
        authorAvatar,
        published,
        mainImage: {
            public_id: mainImageRes.public_id,
            url: mainImageRes.secure_url
        },
    };
    if(paraOneImageRes){
        blogData.paraOneImage = {
            public_id: paraOneImageRes.public_id,
            url: paraOneImageRes.secure_url
        }
    }

    if(paraTwoImageRes){
        blogData.paraTwoImage = {
            public_id: paraTwoImageRes.public_id,
            url: paraTwoImageRes.secure_url
        }
    }   

    if(paraThreeImageRes){ 
        blogData.paraThreeImage = {
            public_id: paraThreeImageRes.public_id,
            url: paraThreeImageRes.secure_url
        }
    }

    const blog = await Blog.create(blogData);

    res.status(200).json({
        success: true,
        message: "Blog Uploaded Successfully",
        blog
    });

});

export const deleteBlog = catchAsyncError( async(req, res, next) => {
    const { id } = req.params;
    const blog  = await Blog.findById(id);

    if(!blog){ 
        return next(new ErrorHandler("Blog not found", 404));
    }   
    await blog.deleteOne();

    res.status(200).json({
        success: true,
        message: "Blog Deleted Successfully",
    });
});

export const getAllBlogs = catchAsyncError( async(req, res, next) => {
    const allBlogs = await Blog.find({published:true});
    res.status(200).json({
        success: true,
        allBlogs,
    });
})

export const getSingleBlog = catchAsyncError( async(req, res, next) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if(!blog){
        return next(new ErrorHandler("Blog not found", 404));
    }
    res.status(200).json({
        success: true,
        blog
    });
});

export const getMyBlogs = catchAsyncError( async(req, res, next) => {
    const blogs = await Blog.find({createdBy: req.user._id});
    res.status(200).json({
        success: true,
        blogs
    });
});

export const updateBlog = catchAsyncError( async(req, res, next) => {
    const { id } = req.params;
    let blog = await Blog.findById(id);
    if(!blog){
        return next(new ErrorHandler("Blog not found", 404));
    }
    
    const newBlogData = {
        title: req.body.title,
        intro: req.body.intro,
        paraOneDescription: req.body.paraOneDescription,
        paraOneTitle: req.body.paraOneTitle,
        paraTwoDescription: req.body.paraTwoDescription,
        paraTwoTitle: req.body.paraTwoTitle,
        paraThreeDescription: req.body.paraThreeDescription,
        paraThreeTitle: req.body.paraThreeTitle,
        category: req.body.category,
        published: req.body.published,
    };

    if(req.files){
        const { mainImage, paraOneImage, paraTwoImage, paraThreeImage } = req.files;
        const allowedFormats = ["image/png", "image/jpg", "image/jpeg", "image/webp"];

        if((mainImage && !allowedFormats.includes(mainImage.mimetype))
            || (paraOneImage && !allowedFormats.includes(paraOneImage.mimetype))
            || (paraTwoImage && !allowedFormats.includes(paraTwoImage.mimetype))
            || (paraThreeImage && !allowedFormats.includes(paraThreeImage.mimetype)))
            {
                return next( new ErrorHandler("Invalid File Format. Only PNG, JPG, JPEG, WEBP are allowed", 400));
            }

        if(req.files && mainImage){
            const blogMainImageId = blog.mainImage.public_id;
            await cloudinary.uploader.destroy(blogMainImageId);

            const newMainImage = await cloudinary.uploader.upload(mainImage.tempFilePath);
            newBlogData.mainImage = {
                public_id: newMainImage.public_id,
                url: newMainImage.secure_url
            }

        }

        if(req.files && paraOneImage){
            const blogParaOneImageId = blog.paraOneImage.public_id;
            await cloudinary.uploader.destroy(blogParaOneImageId);  

            const newParaOneImage = await cloudinary.uploader.upload(paraOneImage.tempFilePath);
            newBlogData.paraOneImage = {
                public_id: newParaOneImage.public_id,
                url: newParaOneImage.secure_url
            }
        }

        if(req.files && paraTwoImage){
            const blogParaTwoImageId = blog.paraTwoImage.public_id;
            await cloudinary.uploader.destroy(blogParaTwoImageId);

            const newParaTwoImage = await cloudinary.uploader.upload(paraTwoImage.tempFilePath);
            newBlogData.paraTwoImage = {
                public_id: newParaTwoImage.public_id,
                url: newParaTwoImage.secure_url
            }
        }

        if(req.files && paraThreeImage){
            const blogParaThreeImageId = blog.paraThreeImage.public_id;
            await cloudinary.uploader.destroy(blogParaThreeImageId);

            const newParaThreeImage = await cloudinary.uploader.upload(paraThreeImage.tempFilePath);
            newBlogData.paraThreeImage = {
                public_id: newParaThreeImage.public_id,
                url: newParaThreeImage.secure_url
            }
        }
    }

    blog = await Blog.findByIdAndUpdate(id, newBlogData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        message: "Blog Updated Successfully",
        blog,
    });

});