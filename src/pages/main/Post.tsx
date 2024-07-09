import {IPost} from "./Main";
import "./post.css"
import {addDoc, collection, query, where, getDocs, deleteDoc, doc} from "firebase/firestore";
import {db} from "../../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../config/firebase";
import {useEffect, useState} from "react";


interface Props {
    post: IPost
}

interface Like {
    likeId:string
    userId: string

}

export const Post = (props: Props) => {

    const {post} = props;
    const [user] = useAuthState(auth);
    const [like, setLike] = useState<Like[] | null>(null)
    //  const [amountLikes, setAmountLikes] = useState<number | null>(null)

    const likesRef = collection(db, "likes");

    const likesDoc = query(likesRef, where("postId", "==", post.id));

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLike(data.docs.map((doc) => ({userId: doc.data().userId, likeId:doc.id})));

    }

    const hasUserLiked = like?.find((l) => l.userId === user?.uid)

    useEffect(() => {
        getLikes();
    }, [])

    const addLike = async () => {
        try {
            const newDoc =await addDoc(likesRef, {
                userId: user?.uid, //userId и postId са полето във хайрбейс
                postId: post.id,
                title: post.title
            });

            if (user) {
                setLike((prev) => prev ? [...prev, {userId: user.uid,likeId:newDoc.id}] : [{userId: user.uid, likeId:newDoc.id}])
            }
        } catch (error) {
            console.log(error)
        }
    };

    const removeLike = async () => {
        try {
            const likeToDeleteQuery = query(
                likesRef,
                where("postId", "==", post.id),
                where("userId", "==", user?.uid)
            );

            const likeToDeleteData = await getDocs(likeToDeleteQuery)
            const likeId = likeToDeleteData.docs[0].id;
            const likeToDelete = doc(db, "likes", likeId);
            await deleteDoc(likeToDelete);
            if (user) {
                setLike((prev) =>
                    prev && prev.filter((like) => like.likeId!==likeId))
            }
        } catch (err) {
            console.log(err)

        }
    }


    return (
        <div className="postCard">

            <div className="title">
                <h1>{post.title}</h1>
            </div>
            <div className="editRemoveBtn">
                <button>Edit</button>
                <button>Remove</button>
            </div>

            <div>
                <p>{post.ingredients}</p>
            </div>
            <div className="body">
                <p>{post.description}</p>

                <p style={{cursor: "pointer"}}
                   onClick={hasUserLiked ? removeLike : addLike}>
                    {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
                </p>
                {like && <p onChange={getLikes}> Like: {like?.length}</p>}
            </div>

            <div className="foother">
                <p>@{post.username}</p>
            </div>

        </div>
    )
}