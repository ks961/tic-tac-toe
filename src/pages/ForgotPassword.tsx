import { Form, useNavigate } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import FormInput from "@/components/FormInput/FormInput";
import { validateEmail, validateUsername } from "@/utils";
import ErrorModal from "@/components/ErrorModal/ErrorModal";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { useState, ChangeEvent, FormEvent, useCallback } from "react";
import { useVerificationContext } from "@/contexts/VerificationContext/VerificationContext";


export default function ForgotPassword() {

    const navigate = useNavigate();
    const { updateVContext } = useVerificationContext();
    const [ modalError, setModalError ] = useState<string | null>(null);
    const [ usernameOrEmail, setUsernameOrEmail ] = useState<string>("");

    const { isLoading, triggerFetch } = useFetch<string>("http://localhost:3000/login/forgot-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    }, undefined, { requestOnExplicitTrigger: true });
    
    async function handleOnSubmit(event: FormEvent) {
        event.preventDefault();
        
        if(!validateEmail(usernameOrEmail) || !validateUsername(usernameOrEmail)) {
            setModalError("Username or Email invalid.");
            return;
        }

        const sessionId = await triggerFetch({
            usernameOrEmail,
        });
        if(!sessionId)
            return setModalError("Session is invalid.");

        updateVContext(true);
        navigate(`/forgot-password/verification/${sessionId}`);
    }

    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
        setUsernameOrEmail(value);
    }

    const closeModal = useCallback(() => {
        setModalError(null);
    }, [modalError]);

    return(
        <div className="grid place-content-center mt-24">
            <Form onSubmit={handleOnSubmit} className="flex flex-col items-center gap-5 w-[20rem]">
                <FormInput
                    autoFocus
                    placeholder="knight@knight.co"
                    onChange={handleOnChange} 
                    type="text"
                    value={usernameOrEmail}
                    required 
                    id="emailOrUsername"
                    name="Email or Username" 
                />
                <PrimaryButton
                    as="input" 
                    type="submit" 
                    value={isLoading ? "Submitting..." : "Recover"} 
                    className="px-4 py-2 disabled:bg-gray-400 w-max"
                    disabled={isLoading} 
                />
            </Form>
        <ErrorModal error={modalError} closeModal={closeModal} />
    </div>
    );
}