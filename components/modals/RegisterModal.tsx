'use client';
import Input from "@/components/Input";
import useLoginModal from  "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { Passero_One } from "next/font/google";
import {toast} from 'react-hot-toast';
import { signIn } from "next-auth/react";
 
const RegisterModal=()=>{
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();


    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [name,setName] = useState('');
    const [username , setUserame] = useState('');

    const [isLoading , setIsLoading]= useState(false);

    const onSubmit = useCallback(async()=>{
        try{
            setIsLoading(true);
            // TO APP LOGIN 
             await axios.post( '/api/register',{
                email,
                password,
                username,
                name
             });
             toast.success('Account Created');
             signIn('credentials',{
                email,
                password
             })
            registerModal.onClose();
        }
        catch(error){
            console.log(error)

        }finally{
            setIsLoading(false);

        }
    },[registerModal,email,password,username,name]);

    const onToggle  = useCallback(()=>{ 
        if(isLoading){
            return;
        }
        registerModal.onClose();
        loginModal.onOpen();


		
            
                        

         
    },[registerModal,loginModal,isLoading]);
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input 
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            disabled={isLoading}
            
            />
            <Input 
            placeholder="Name"
            onChange={(e)=>setName(e.target.value)}
            value={name}
            disabled={isLoading}
            
            />
            <Input 
            placeholder="username"
            onChange={(e)=>setUserame(e.target.value)}
            value={username}
            disabled={isLoading}
            
            />
            <Input 
            placeholder="Password"
            type="password"
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            disabled={isLoading}
            
            />

        </div>
    )

 const footerContent =(
    <div className="text-neutral-400 text-center mt-4">
        <p>
            Already have an Account ?   
            <span
            onClick={onToggle}
            
            className="
            text-white
            cursor-pointer
            hover:underline
            
            ">
                Sign In
            </span>
        </p>

    </div>
 )   
    return(
       <Modal
       disabled={isLoading}
       isOpen={registerModal.isOpen}
       title="Register"
       actionLabel="Register"
       onClose={registerModal.onClose}
       onSubmit={onSubmit}
       body={bodyContent}
       footer={footerContent}
       
       />
    )
};

export default RegisterModal;