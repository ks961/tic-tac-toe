import Modal from "../Modal/Modal";
import { PlayItem } from "../../App.types";

export type WonModalProps = {
    modalShow: boolean,
    toggleModal: () => void,
    player: PlayItem,
}

const modalInnerWrapper = { 
    width: "300px", 
    height: "250px", 
    display: "grid", 
    placeContent: "center"
}

const modalContentContainer: React.CSSProperties = { 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center", 
    gap: "2rem"
};

const modalButtonStyle = {
    padding: "10px 30px", 
    fontWeight: "600", 
    color: "#f7f7f5"
};

export default function WinnerModal({ modalShow, toggleModal, player }: WonModalProps) {

    return(
        <Modal toShow={modalShow}>
            <div style={modalInnerWrapper}>
                <div style={modalContentContainer}>
                    <h2>Player {player.toUpperCase()} won!</h2>
                    <button style={modalButtonStyle} onClick={toggleModal}>Close</button>
                </div>
            </div>
        </Modal>
    );
}