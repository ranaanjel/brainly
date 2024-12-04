import { ReactElement } from "react";

type Variant = "primary"|"secondary";

type ButtonSize = "sm"| "lg" | "md";

interface ButtonProps {
    variant : Variant,
    text : string,
    startIcon?:ReactElement,
    size?: ButtonSize,
    handlerClick?:() => void;
}

let variantStyles:{primary:string, secondary:string} = {
    primary:'bg-cs-purple-600 text-white',
    secondary:'bg-cs-purple-200  text-cs-purple-600'
}

let defaultStyles = "px-4 py-2 rounded-sm font-light flex items-center gap-2 h-10"

export function Button({variant, text, startIcon, size, handlerClick}:ButtonProps) {
    return <button className={`${variantStyles[variant]} ${defaultStyles}`} onClick={handlerClick}>
        {startIcon}
        {text}
    </button>
}