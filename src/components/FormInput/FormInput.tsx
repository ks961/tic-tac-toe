import { resolveTwConflicts } from "@/utils";
import Text from "../Text/Text";

export type FormInputProps = {
    id: string,
    name: string,
    className?: string, 
    type: React.InputHTMLAttributes<HTMLInputElement>["type"],
} & React.ComponentPropsWithoutRef<"input">;

const defaultClasses = "bg-background selection:bg-primary border-2 border-accent focus:border-primary w-full h-10 px-2 py-1 font-medium text-text outline-none rounded-md";
export default function FormInput({ id, type, name, className, ...attibs }: FormInputProps) {

    
    const mergedClasses = resolveTwConflicts(defaultClasses, className);
    

    return(
        <div className="flex flex-col w-full gap-1.5">
            <Text as="label" className="text-text font-semibold" htmlFor={id}>{`${name}${attibs.required ? "*" : ""}`}</Text>
            <input
                className={mergedClasses} 
                type={type}
                id={id}
                name={id.toLowerCase()}
                {...attibs}
            />
        </div>
    );
}