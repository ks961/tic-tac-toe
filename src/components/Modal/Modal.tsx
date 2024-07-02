import { ReactNode, useRef } from "react";
import "./modal.styles.css";

export type ModalProps = {
    toShow: boolean,
    children: ReactNode | ReactNode[],
} & React.ComponentPropsWithoutRef<"div">

export default function Modal({ toShow, children, ...attribs }: ModalProps) {

    const modalRef = useRef<HTMLDivElement>(null);

    function handleToggleModal() {
        modalRef.current?.classList.toggle("show");
    }

    return(
        <div>
            <div ref={modalRef} className={`modal ${toShow ? "show" : ""}`} {...attribs}>
                {children}
            </div>
            <div className="modal-bg" onClick={handleToggleModal} />
        </div>
    );
}