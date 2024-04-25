
import{useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../Config/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

interface FormData{
    title:string;
    description:string;
}

export const CreateForm = ()=>{
    
    const [user]=useAuthState(auth);

    const schema = yup.object().shape({
        title: yup.string().required("you must add a title."),
        description: yup.string().max(6000).required("Add a Description"),
        })
        

    const {register,handleSubmit, formState: {errors}} =useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate();
    const postRef = collection(db,"posts");

    const submitUser = async (data:FormData)=>{
 await addDoc(postRef,{
    ...data,
    username: user?.displayName,
    userId: user?.uid,
 })
 navigate("/");

}
 
 

return <form  onSubmit={handleSubmit(submitUser)}>
    
    <input placeholder='Title...' {...register('title')}/>
    <p>{errors.title?.message}</p>
    
    <textarea placeholder='Description...'{...register('description')}/>
    <p>{errors.description?.message}</p>
   
    <input type='submit'/>
    
</form>
};