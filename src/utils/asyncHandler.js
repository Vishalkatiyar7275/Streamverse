//Approach 1: Using an promise-based async handler

const asyncHandler = (requestHandler) => {
     (req,res,next) => {
        Promise.resolve(requestHandler( )).catch((err)=>next(err));
     }
}

export {asyncHandler}








//Approach 2: Using a custom async handler function

// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next);
        
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message || "Internal Server Error"
//         })
//     }
// }; 

