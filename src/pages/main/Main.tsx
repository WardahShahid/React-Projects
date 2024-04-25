import{getDocs,collection} from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { db } from '../../Config/Firebase';
import { Post } from './Post';

export interface Post{
    id:string;
    userId:string;
    username: string;
    title: string;
    description: string;
}

export const Home =()=>{

const [postsList,setPostsList]=useState<Post [] | null>(null);
const postRef= collection(db,"posts");

const getPost = async()=>{
const data = await getDocs(postRef);
setPostsList(
    data.docs.map((doc)=> ({...doc.data(), id: doc.id}))  as Post[]
    ) ;
}



useEffect(()=>{
    getPost();
},[])


    return(
        <div>
        {postsList?.map((post)=>
    <Post post={post} />
        )}
        </div>

    )
};


