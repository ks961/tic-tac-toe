import { ReactNode } from "react";
import "./modal.styles.css";

export type ModalProps = {
    toShow: boolean,
    toggleModal: () => void,
    children: ReactNode | ReactNode[],
} & React.ComponentPropsWithoutRef<"div">

export default function Modal({ toShow, toggleModal, children, ...attribs }: ModalProps) {



    return(
        <div>
            <div className={`modal ${toShow ? "show" : ""}`} {...attribs}>
                {children}
            </div>
            <div className="modal-bg" onClick={toggleModal} />
        </div>
    );
}