import mongoose , { Schema } from "mongoose";   
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema({
    videoFile: {
        type: String, // Cloudinary URL
        required: true
    },
    thumbnail: {
        type: String, // Cloudinary URL
        required: true
    }, 
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number, // Duration in seconds
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
},
    {
    timestamps: true
    }  
)
// Adds pagination capabilities to the Video schema for aggregation queries.
// This plugin enables easy pagination when using MongoDB aggregation pipelines,
// allowing you to get paged results with metadata like total pages, current page, etc.
videoSchema.plugin(mongooseAggregatePaginate);

// Creates and exports the Mongoose model named "Video" based on the videoSchema.
// This model represents the "videos" collection in MongoDB and provides
// methods to create, read, update, delete, and aggregate video documents.
export const Video = mongoose.model("Video", videoSchema);
