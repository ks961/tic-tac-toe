import { resolveTwConflicts } from "@/utils";

export type ProfileImg = {
    src: string,
    alt: string,
    className?: string
} & React.ComponentPropsWithoutRef<"img">;

const defaultClasses = "cursor-pointer w-14 rounded-full border-4 border-text";

export default function ProfileImg({ src, alt, className, ...attribs }: ProfileImg) {

    const mergedClasses = resolveTwConflicts(defaultClasses, className);
    return(
        <>
            <img 
                className={mergedClasses}
                src={src} 
                alt={alt}
                {...attribs}
            />            
        </>
    );
}