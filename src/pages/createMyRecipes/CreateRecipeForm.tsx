import {useForm} from "react-hook-form"
import *as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {addDoc, collection } from "firebase/firestore"
import {db,auth} from "../../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom";
import "./createRecipesForm.css"

interface CreateFormData {
    title: string,
    ingredients:string
    description: string,
    image:string

}
export const CreateRecipeForm = () => {
   const [user]=useAuthState(auth);
   const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        ingredients: yup.string().required("Ingredients is required"),
        description: yup.string().required("Description is required"),
        image:yup.string().required("Image is needed"),


    })

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<CreateFormData> ({resolver: yupResolver(schema)});

    const recipesRef = collection(db,'posts')


    const onCreateRecipe = async (data: CreateFormData) => {

        await addDoc(recipesRef,{
           /* title:data.title,
            description:data.description, или маже да се ползам спред оператор с дата*/
            ...data,
            username:user?.displayName,
            userId:user?.uid
        });
        navigate("/")

    }
    return (
        <div className="postCard">
            <form onSubmit={handleSubmit(onCreateRecipe)}>
                <input className="titleInput" placeholder="Title..." {...register("title")}/>
                <p style={{color:"deeppink"}}>{errors.title?.message}</p>
                <textarea className="titleInput" placeholder="Ingredients..." {...register("ingredients")}/>
                < p style={{color:"deeppink"}}>{errors.ingredients?.message}</p>
                <textarea  placeholder="Description..." {...register("description")}/>
                < p style={{color:"deeppink"}}>{errors.description?.message}</p>
                <button style={{margin:10}} type="submit">Submit</button>

            </form>
        </div>
    )
}