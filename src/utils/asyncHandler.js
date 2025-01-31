const asyncHandler = (fn)=>{
    return async (req,res,next)=>{
        try {
            await fn(req,res,next); 
        } catch (error) {
            console.log(`Error in Async Handler`,error);
            res.status(500).json({message:error.message});
        }
    }
}

export {asyncHandler}