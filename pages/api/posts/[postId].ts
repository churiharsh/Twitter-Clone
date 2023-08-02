import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
    if(req.method !=='GET'){
        return res.status(405).end();
    }
    try {
        // const {postId} = req.query;
        const postId =  req.query.postId
        console.log(`This is postId ${postId}`);
        


        if(!postId || typeof postId !=='string'){
            throw new Error('Invalid ID ')
        }

        const post = await prisma?.post.findUnique({
            where:{
                id:postId
            },
            include:{ 
                user:true,
                comments:{
                    include:{
                        user:true
                    },
                    orderBy:{
                        createdAt:'desc'
                    }

                }
            },
            
        });

        return res.status(200).json(post);         
        
    } catch (error) {
        console.log(error);
        return res.status(400).end();
        
    }
}