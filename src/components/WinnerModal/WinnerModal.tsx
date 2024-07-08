import Modal from "../Modal/Modal";
import Text from "../Text/Text";
import { PlayItem } from "../../App.types";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

export type WonModalProps = {
    player: PlayItem,
    modalShow: boolean,
    toggleModal: () => void,
}

export default function WinnerModal({ player, modalShow, toggleModal }: WonModalProps) {
    
    return(
        <Modal toShow={modalShow} toggleModal={toggleModal}>
            <div className="w-[300px] h-[250px] grid place-content-center">
                <div className="flex flex-col items-center gap-8">
                    <Text as="h2" className="text-black">Player {player.toUpperCase()} won!</Text>
                    <PrimaryButton as="button" onClick={toggleModal}>Close</PrimaryButton>
                </div>
            </div>
        </Modal>
    );
}