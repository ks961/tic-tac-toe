import Form from "@/components/Form/Form";
import FormInput from "@/components/FormInput/FormInput";
import useFetch from "@/hooks/useFetch";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { capitalCase, isObjectInvalid, validateForm } from "@/utils";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import usePersistentState from "@/hooks/usePersistentState";
import ErrorModal from "@/components/ErrorModal/ErrorModal";
import { SingupCredentialDTO, SingupFormDataDTO, formDataToCredentialMapper } from "@/model/DTOs/SignupDtos";
import { useVerificationContext } from "@/contexts/VerificationContext/VerificationContext";
import { BackendUrl } from "@/config";


export default function Signup() {

    const navigate = useNavigate();

    const { updateVContext } = useVerificationContext();
    const [ modalError, setModalError ] = useState<string | null>(null);

    const { error, isLoading, triggerFetch } = useFetch<string>(`${BackendUrl}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    }, undefined, { requestOnExplicitTrigger: true });

    const [ formState, setFormState, cleanup ] = usePersistentState<SingupFormDataDTO>("signup", {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
        const { id } = event.target;
        
        setFormState(prev => ({
            ...prev,
            [id]: value,
        }));
    }

    async function handleOnSubmit(event: FormEvent) {
        event.preventDefault();
        
        const objState = isObjectInvalid(formState);

        if(objState.isInvalid && typeof objState.key === "string") {
            setModalError(`${capitalCase(objState.key)} field cannot be empty!`);
            return;
        }

        const errorMsg = validateForm(formState);

        if(errorMsg) {
            setModalError(errorMsg);
            return;
        }
     
        const signupCred: SingupCredentialDTO = formDataToCredentialMapper(formState);
     
        const sessionId = await triggerFetch(signupCred);
        
        if(!sessionId) return;
        
        cleanup();
        updateVContext(true);
        navigate(`/signup/${sessionId}`);
    }

    function closeModal() {
        setModalError(null);
    }
    
    useEffect(() => {
        if(error === null) return;
        
        setModalError(error.error.toString());
    }, [error]);
    
    return(
        <div className="grid place-content-center mt-[5%]">
            <Form className="size-[22rem]" onSubmit={handleOnSubmit}>
                <div className="w-full flex flex-col gap-3">
                    <FormInput
                        required
                        id="username" 
                        name="Username" 
                        type="text"
                        value={formState.username}
                        placeholder="knight"
                        spellCheck={false}
                        autoFocus
                        onChange={handleOnChange}
                        />
                    <FormInput
                        required
                        id="email" 
                        name="Email" 
                        type="text"
                        value={formState.email}  
                        placeholder="knight@mail.co"
                        onChange={handleOnChange}
                        />
                    <FormInput
                        required
                        id="password" 
                        name="Password" 
                        type="password"
                        value={formState.password}  
                        placeholder="***************"
                        onChange={handleOnChange}
                        />
                    <FormInput
                        required
                        id="confirmPassword" 
                        name="Confirm Password" 
                        type="password"
                        value={formState.confirmPassword}
                        placeholder="***************"
                        onChange={handleOnChange}
                    />
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                    <Link to="/login" className="text-text underline">Already Registered?</Link>
                    <PrimaryButton
                        as="input" 
                        type="submit" 
                        className="px-4 py-2 disabled:bg-gray-400" 
                        disabled={isLoading} 
                        value={isLoading ? "Signing Up..." : "Signup"} 
                    />
                </div>
            </Form>
            <ErrorModal error={modalError} closeModal={closeModal} />
        </div>
    );
}