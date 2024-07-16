import Modal from "../Modal/Modal";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import React from "react";
import Text from "../Text/Text";


export type ConfigModalProps = {
    modalShow: boolean,
    boardSize: number,
    incSize: () => void;
    decSize: () => void;
    handleAny: () => void;
    closeModal: () => void,
    toggleModal: () => void,
}

function ConfigModal({ modalShow, boardSize, incSize, decSize, handleAny, toggleModal, closeModal }: ConfigModalProps) {
    

    return(
        <Modal toShow={modalShow} toggleModal={closeModal}>
            <div className="w-[300px] h-[250px] grid place-content-center">
                <div className="flex flex-col items-center gap-10">
                    <div>
                        <Text as="h4">Select Board Size</Text>
                    </div>
                    <div className="flex items-center gap-5">
                        <PrimaryButton as="button" className="px-4 py-2 text-base" onClick={decSize}>
                            -
                        </PrimaryButton>
                        <input 
                            type="text" 
                            value={boardSize} 
                            onChange={() => {}}
                            className="text-center w-10 font-semibold text-lg" 
                        />
                        <PrimaryButton as="button" className="px-4 py-2 text-base" onClick={incSize}>
                            +
                        </PrimaryButton>
                    </div>
                    <div className="flex items-center gap-5">
                        <PrimaryButton as="button" onClick={toggleModal}>Find</PrimaryButton>
                        <PrimaryButton as="button" onClick={handleAny}>Any</PrimaryButton>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default React.memo(ConfigModal);