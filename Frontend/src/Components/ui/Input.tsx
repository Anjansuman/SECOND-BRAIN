

interface InputProps {
    placeholder: string;
    inputRef?: any;
}

export function Input({ placeholder, inputRef }: InputProps) {
    return <div>
        <input ref={inputRef} placeholder={placeholder} type="text" className="px-4 py-2 border rounded m-1.5"/>
    </div>
}