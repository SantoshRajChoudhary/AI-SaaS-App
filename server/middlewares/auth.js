import { clerkClient } from "@clerk/express";

/**
 * Middleware that checks whether the user has free plan or premium. Also if the metadata free_usage is available then we'll add it to the req else if not even then we add it but with value 0. 
 */

export const auth = async (req, res, next) => {
    try {
        const { userId, has } = await req.auth();
        
        const hasPremiumPlan = await has({plan: 'premium'});
        
        const user = await clerkClient.users.getUser(userId);
        
        
        //This if says if the uesr doesn't have a premium plan but he's used some of his limit say 1 or 2 times an not a new comer. 
        if(!hasPremiumPlan && user.privateMetadata.free_usage) {
            req.free_usage = user.privateMetadata.free_usage;
        } else {//This else block says the user doesn't have an premium plan and the user is using this api for the first time that's why it's free_uage is 0. 
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: 0
                }
            })
            req.free_usage = 0;
            /* i think here we are trying to first update the metadata and then sotring the same info into our request as well. */
        }
        req.plan = hasPremiumPlan ? 'premium': 'free'
        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }

}