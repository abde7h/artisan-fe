import React from "react";
import { useFormContext } from "react-hook-form";

type FormInputProps = {
    label: string;
    name: string;
    type?: string;
};

const inputStyles = {
    height: "4vh",
  };

const FormInput: React.FC<FormInputProps> = ({
    label,
    name,
    type = "text",
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-bold mb-3">
                {label}
            </label>
            <input
                type={type}
                placeholder=" "
                className="block w-full rounded-xl shadow appearance-none focus:outline-none focus:border-primario py-2 px-3 border border-black"
                {...register(name)}
                style={inputStyles}
            />
            {errors[name] && (
                <span className="text-red-500 text-xs pt-1 block">
                    {errors[name]?.message as string}
                </span>
            )}
        </div>
    );
};

export default FormInput;
