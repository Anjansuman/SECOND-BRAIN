

export function Input(/*{onChange}: {onChange: () => void}, */ {placeholder}: {placeholder: string}) {
    return <div>
        <input placeholder={placeholder} type="text" className="px-4 py-2 border rounded m-1.5" /*onChange={onChange}*/ />
    </div>
}