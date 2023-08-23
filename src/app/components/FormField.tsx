type Props = {
    type?: string;
    title: string;
    state: string | number;
    placeholder?: string;
    isTextArea?: boolean;
    setState: (value: string) => void;
}

const FormField = ({ type, title, state, placeholder, isTextArea, setState }: Props) => {
    return (
        <div>
            <label className="block font-medium">{title}</label>

            {isTextArea ? (
                <textarea
                    placeholder={placeholder}
                    value={state}
                    className="border rounded p-2 w-full"
                    onChange={(e) => setState(e.target.value)}
                />
            ) : (
                <input
                    type={type || "text"}
                    placeholder={placeholder}
                    required
                    value={state}
                    className="border rounded p-2 w-full"
                    onChange={(e) => setState(e.target.value)}
                />
            )}
        </div>
    )
}

export default FormField;