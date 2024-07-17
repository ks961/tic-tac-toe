import useFetch from "@/hooks/useFetch";
import { useState, ChangeEvent, FormEvent, useCallback } from "react";
import { Form } from "react-router-dom";
import ErrorModal from "../ErrorModal/ErrorModal";
import FormInput from "../FormInput/FormInput";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { useVerificationContext } from "@/contexts/VerificationContext/VerificationContext";
import { BackendUrl } from "@/config";

export type OtpVerificationProps = {
    notify: (state: boolean) => void,
    verificationSessionId?: string,
}

export default function OtpVerification({ verificationSessionId, notify }: OtpVerificationProps) {

    const [ otp, setOtp ] = useState<string>("");
    const { updateVContext } = useVerificationContext();
    const [ modalError, setModalError ] = useState<string | null>(null);

    const { isLoading, triggerFetch } = useFetch<string>(`${BackendUrl}/otp/verify`, {
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
            sessionId: verificationSessionId,
        }

        const response = await triggerFetch(verificationCreds);
        if(!response) {
            setModalError("Invalid otp or Session Id");
            return;
        }
        
        if(response === "success") {
            updateVContext(false);
            notify(true);
            return;
        }
        
        notify(false);
        setModalError(response);
    }

    const closeModal = useCallback(() => {
        setModalError(null);
    }, [modalError]);

    return(
        <div className="grid place-content-center mt-24">
            <Form onSubmit={handleOnSubmit} className="flex flex-col items-center gap-5 w-[16rem]">
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