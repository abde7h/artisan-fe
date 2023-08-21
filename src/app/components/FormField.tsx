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
        <div className="flex items-center justify-start flex-col w-full gap-4">
            <label className="w-full text-gray-[#3d3d4e]">{title}</label>

            {isTextArea ? (
                <textarea
                    placeholder={placeholder}
                    value={state}
                    className="w-full outline-0 bg-indigo-300 rounded-xl p-4"
                    onChange={(e) => setState(e.target.value)}
                />
            ) : (
                <input
                    type={type || "text"}
                    placeholder={placeholder}
                    required
                    value={state}
                    className="w-full outline-0 bg-indigo-300 rounded-xl p-4"
                    onChange={(e) => setState(e.target.value)}
                />
            )}
        </div>
    )
}

export default FormField;