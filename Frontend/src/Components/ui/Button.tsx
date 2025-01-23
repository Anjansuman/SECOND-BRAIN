
export interface ButtonProps {
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: any;
    endIcon?: any;
    onClick: () => void;
}

export const Button = (props: ButtonProps) => {
    return <button onClick={props.onClick} className={`h-${props.size} w-${props.size} bg-${props.variant}`}>{props.startIcon}{props.text}{props.endIcon}</button>
}