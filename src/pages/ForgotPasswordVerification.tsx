import useFetch from "@/hooks/useFetch";
import Form from "@/components/Form/Form";
import FormInput from "@/components/FormInput/FormInput";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ErrorModal from "@/components/ErrorModal/ErrorModal";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useVerificationContext } from "@/contexts/VerificationContext/VerificationContext";

export default function ForgotPasswordVerification() {
    
    const navigate = useNavigate();
    const { isSessionActive } = useVerificationContext();

    if(!isSessionActive) {
        return <Navigate to="/login" replace />
    }

    const { sessionId } = useParams();
    
    const [ otp, setOtp ] = useState<string>("");
    const [ modalError, setModalError ] = useState<string | null>(null);

    const { isLoading, triggerFetch } = useFetch<string>("http://localhost:3000/login/forgot-password/verification", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    }, undefined, { requestOnExplicitTrigger: true })

    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
        const integer = parseInt(value);
        
        if((value.length > 0 && isNaN(integer)) || value.length > 6) return;

        setOtp(value);        
    }

    async function handleOnSubmit(event: FormEvent) {
        event.preventDefault();

        if(otp.length < 6) return;

        const verificationCreds = {
            otp,
            sessionId: sessionId,
        }

        const token = await triggerFetch(verificationCreds);
        if(!token) {
            setModalError("Invalid otp or Session Id");
            return;
        }
        
        navigate(`/forgot-password/create-password/${token}`);
        return;
    }

    const closeModal = useCallback(() => {
        setModalError(null);
    }, [modalError]);

    return(
        <div className="grid place-content-center mt-24">
            <Form onSubmit={handleOnSubmit}>
                <FormInput
                    autoFocus
                    className="text-center text-text tracking-wider" 
                    onChange={handleOnChange} 
                    type="text" 
                    value={otp}
                    required 
                    id="otpValue"
                    name="OTP" 
                />
                <PrimaryButton 
                    as="input" 
                    type="submit" 
                    value={isLoading ? "Submitting..." : "Submit"} 
                    className="px-4 py-2 disabled:bg-gray-400"
                    disabled={isLoading} 
                />
            </Form>
            <ErrorModal error={modalError} closeModal={closeModal} />
        </div>
    );
}