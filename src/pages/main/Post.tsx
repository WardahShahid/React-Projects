import { addDoc, collection,deleteDoc,query, where,getDocs, doc } from "firebase/firestore";
import { Post as IPost} from "./Main";
import { auth, db } from "../../Config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
interface Props{
    post: IPost;
}

interface Like{
    userId:string;
    likeId:string;
}
export const Post =(props: Props)=>{
    
    const {post} = props;

    const likesRef= collection(db,"likes");

    const likesQuery=query(likesRef,where ("postId", "==" ,post.id));

    const[user]=useAuthState(auth);

    const[likes,setlikes]= useState <Like [] |null>(null);

    const getLikes=async()=>{
        const data= await getDocs(likesQuery);
        setlikes(data.docs.map((doc)=> ({userId: doc.data().userId, likeId: doc.id })));
    }
    

const addLike = async()=>{
try{

  const newDoc= await addDoc(likesRef,{userId:user?.uid ,postId: post.id})

if (user){
  setlikes(
    (prev)=> prev ? [...prev, {userId: user.uid ,likeId: newDoc.id}] : [{userId: user.uid , likeId: newDoc.id}]);
  }
  }catch(err){
    console.log(err);
  }
}

const removeLike = async()=>{
  try{
    const likesToDelQuery = query(likesRef,where ("postId", "==" ,post.id), where ("userId", "==" , user?.uid));
const likeToDelData = await getDocs(likesToDelQuery);
  const delLikeID =likeToDelData.docs[0].id
    const likeToDel = doc(db,"likes",delLikeID);
    await deleteDoc(likeToDel);
  
  if (user){
    setlikes(
      (prev)=> prev && prev.filter((like)=> like.likeId !== delLikeID));
    }
    }catch(err){
      console.log(err);
    }
  }

const hasUserLiked=likes?.find((like)=> (like.userId === user?.uid));

useEffect(()=>{
    getLikes();
},[])


    return(
        <div className="post-container">
            <div className="title">
        <h1>{post.title}</h1>
         </div>

            <div className="body">
        <p>{post.description}</p>
         </div>

            <div className="footer">
        <p>@{post.username}</p>
        </div>
        <div className="like-post">
        <button onClick={hasUserLiked ? removeLike : addLike}> 
        {hasUserLiked ? <>&#128078;</> : <>&#128077;</>} {" "}
        </button>
        {likes && <p className="likes-count">{likes?.length}</p>}
        </div>

             </div>
    )
}