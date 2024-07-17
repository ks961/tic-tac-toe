import ErrorModal from "@/components/ErrorModal/ErrorModal";
import Form from "@/components/Form/Form";
import FormInput from "@/components/FormInput/FormInput";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { BackendUrl } from "@/config";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { PlayerInfo, usePlayerContext } from "@/contexts/PlayerContext/PlayerContext";
import useFetch from "@/hooks/useFetch";
import usePersistentState from "@/hooks/usePersistentState";
import { errorString, LoginSuccessPayload } from "@/model/Request";
import { capitalCase, isObjectInvalid } from "@/utils";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export type LoginFormData = {
    password: string,
    usernameOrEmail: string,
}

export default function Login() {

    const navigate = useNavigate();

    const { isAuthenticated, login } = useAuth();
    const { updatePlayerInfo } = usePlayerContext();

    const [ modalData, setModalData ] = useState<string | null>(null);
    const [ formState, setFormState, cleanup ] = usePersistentState<LoginFormData>("login", {
        password: "",
        usernameOrEmail: "",
    });

    const { error, isLoading, triggerFetch } = useFetch<LoginSuccessPayload | errorString>(`${BackendUrl}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    }, undefined, { requestOnExplicitTrigger: true });

    function handleOnInputChange(event: ChangeEvent<HTMLInputElement>) {
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
            setModalData(`${capitalCase(objState.key)} field cannot be empty!`);
            return;
        }

        const respPayload = await triggerFetch(formState);

        if(typeof respPayload === "string" || respPayload === undefined) return;

        const token: string = respPayload.token;

        const playerInfo: PlayerInfo = respPayload.playerInfo;

        updatePlayerInfo(playerInfo);
        login(token);
        cleanup();
    }

    function closeModal() {
        setModalData(null);
    }
    
    useEffect(() => {
        if(error === null) return;
        
        setModalData(error.error.toString());
    }, [error]);
    
    useEffect(() => {

        if(!isAuthenticated) return;
        
        navigate("/", { replace: true });
        cleanup();
    }, [isAuthenticated]);

    return(
        <div className="grid place-content-center mt-[5%]">
            <Form className="size-[22rem]" onSubmit={handleOnSubmit}>
                <div className="w-full flex flex-col gap-3">
                    <FormInput
                        autoFocus
                        required
                        type="text"
                        spellCheck={false}
                        id="usernameOrEmail" 
                        name="Username or Email" 
                        onChange={handleOnInputChange}
                        value={formState.usernameOrEmail}
                        placeholder="knight or knight@mail.co"
                    />
                    <FormInput
                        required
                        id="password" 
                        name="Password" 
                        type="password"
                        value={formState.password}
                        placeholder="***************"
                        onChange={handleOnInputChange}
                    />
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                    <Link to="/forgot-password" className="text-text underline">Forgot Password?</Link>
                    <PrimaryButton as="input" type="submit" className="px-4 py-2" disabled={isLoading} value={"Login"} />
                </div>
            </Form>
            <ErrorModal error={modalData} closeModal={closeModal} />
        </div>
    );
}