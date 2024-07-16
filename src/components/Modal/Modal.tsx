import { ReactNode } from "react";
import { Card } from "../Card/Card";
import { resolveTwConflicts } from "@/utils";

export type ModalProps = {
    toShow: boolean,
    toggleModal?: () => void,
    className?: string,
    children: ReactNode | ReactNode[],
} & React.ComponentPropsWithoutRef<"div">

export default function Modal({ toShow, toggleModal, className, children, ...attribs }: ModalProps) {

    const defaultClasses = `absolute bg-accent left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 ${toShow ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-50"} transition duration-250 ease-in-out`;
    const mergedClasses = resolveTwConflicts(defaultClasses, className);

    return(
        <div>
            <Card className={mergedClasses} {...attribs}>
                {children}
            </Card>
            <div 
                className={`absolute top-0 left-0 cursor-pointer w-full h-full bg-black bg-opacity-50 z-5 ${toShow ? "opacity-100 visible" : "opacity-0 invisible"} transition duration-300 ease-in-out`} 
                onClick={toggleModal ?? (() => {return;})} 
            />
        </div>
    );
}