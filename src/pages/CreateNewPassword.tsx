import ErrorModal from "@/components/ErrorModal/ErrorModal";
import FormInput from "@/components/FormInput/FormInput";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { BackendUrl } from "@/config";
import { useVerificationContext } from "@/contexts/VerificationContext/VerificationContext";
import useFetch from "@/hooks/useFetch";
import { isObjectInvalid, capitalCase, validateForm } from "@/utils";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { Form, Navigate, useNavigate, useParams } from "react-router-dom";



export default function CreateNewPassword() {

    const navigate = useNavigate();
    const { updateToken } = useParams();
    const [ formState, setFormState ] = useState({
        password: "",
        confirmPassword: "",
    });

    const { isSessionActive, updateVContext } = useVerificationContext();

    if(!isSessionActive) {
        return <Navigate to="/login" replace />
    }

    const [ modalError, setModalError ] = useState<string | null>(null);

    const { isLoading, triggerFetch } = useFetch<string>(`${BackendUrl}/login/update-password`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
    }, undefined, { requestOnExplicitTrigger: true });

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

        const response = await triggerFetch({
            password: formState.password,
            updateToken,
        });

        if(!response) {
            return setModalError("Invalid update token");
        }

        if(response === "success") {
            updateVContext(false);
            navigate("/login", { replace: true });
        }
    }

    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        const { id } = event.target;
        const { value } = event.target;
        
        setFormState(prev => ({...prev, [id]: value}));
    }

    const closeModal = useCallback(() => {
        setModalError(null);
    }, [modalError]);

    return(
        <div className="grid place-content-center mt-[5%]">
            <Form className="size-[22rem] flex flex-col gap-5" onSubmit={handleOnSubmit}>
                <div className="w-full flex flex-col gap-3">
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
                <div className="w-full">
                    <PrimaryButton
                        as="input" 
                        type="submit" 
                        className="px-4 py-2 disabled:bg-gray-400 w-full" 
                        disabled={isLoading} 
                        value={isLoading ? "Updating..." : "Submit"} 
                    />
                </div>
            </Form>
            <ErrorModal error={modalError} closeModal={closeModal} />
        </div>
    );
}