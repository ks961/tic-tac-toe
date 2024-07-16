import Modal from "../Modal/Modal";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import Text from "../Text/Text";


export type ErrorModalProps = {
    error: string | null,
    closeModal: () => void;
}

export default function ErrorModal({ error, closeModal }: ErrorModalProps) {
    
    return(
        <Modal toShow={error ? true : false} toggleModal={closeModal} className="flex flex-col gap-14 p-10 w-[25rem]">
            <Text as="h4" className="text-center text-text text-xl" >{error}</Text>
            <PrimaryButton as={"button"} className="px-2 py-2 text-text w-[20rem]" onClick={closeModal}>
                Close
            </PrimaryButton>
        </Modal>
    );
}