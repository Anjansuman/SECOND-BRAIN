import { ReactElement } from "react";

export interface ButtonProps {
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: any;
    endIcon?: ReactElement;
    onClick: () => void;
}

const variantStyles = {
    "primary": "bg-black text-white",
    "secondary": "bg-gray-300 text-black"
}

const defaultStyles = "rounded-md flex";

const sizeStyles = {
    "sm": "text-sm px-2 py-1",
    "md": "text-md px-4 py-2",
    "lg": "text-xl px-6 py-2"
}

export const Button = (props: ButtonProps) => {
    return <button className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`}>
        {(props.startIcon) ? <div className="mr-1 my-auto">{props.startIcon}</div> : null }
        {props.text}
        {(props.endIcon) ? <div className="ml-1 my-auto">{props.endIcon}</div> : null }
    </button>
}