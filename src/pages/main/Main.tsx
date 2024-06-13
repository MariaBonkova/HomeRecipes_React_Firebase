import { getDocs, collection  } from 'firebase/firestore'
import {db} from "../../config/firebase";
import {useEffect, useState} from "react";
import {Post} from "./Post";

export interface IPost {
    id:string,
    username:string,
    title:string,
    ingredients:string,
    description:string
}
export const Main=()=>{

    const [postsList,setPostsList]=useState<IPost[] | null>(null);

    const postsREf = collection(db,"posts")

    const getPosts= async ()=>{
        const data=await getDocs(postsREf);

        setPostsList(data.docs.map((doc)=>
            ({
                ...doc.data(),id:doc.id}))as IPost[]);
    }
    useEffect(()=>{
        getPosts().then();
    },[])


    return (

        <div>{postsList?.map((eachPost)=><Post post={eachPost} />)}</div>
    )
}