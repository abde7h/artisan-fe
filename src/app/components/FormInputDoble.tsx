import React from "react";
import { useFormContext } from "react-hook-form";

type FormInputProps = {
    labelUno: string;
    nameUno: string;
    typeUno?: string;
    labelDos: string;
    nameDos: string;
    typeDos?: string;
};

const inputStyles = {
    height: "4vh",
};

const FormInputDoble: React.FC<FormInputProps> = ({
    labelUno,
    nameUno,
    typeUno = "text",
    labelDos,
    nameDos,
    typeDos = "text",
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <div className="mb-4">
            <div className="grid grid-flow-row sm:grid-flow-col gap-3">
                <div className="sm:col-span-4 justify-center">
                    <label htmlFor={nameUno} className="block text-sm font-bold mb-2">
                        {labelUno}
                    </label>
                    <input
                        type={typeUno}
                        placeholder=" "
                        className="block w-full rounded shadow appearance-none py-2 px-3 border border-black"
                        {...register(nameUno)}
                        style={inputStyles}
                    />
                    {errors[nameUno] && (
                        <span className="text-red-500 text-xs pt-1 block">
                            {errors[nameUno]?.message as string}
                        </span>
                    )}
                </div>

                <div className="sm:col-span-4 justify-center">
                    <label htmlFor={nameDos} className="block text-sm font-bold mb-2">
                        {labelDos}
                    </label>
                    <input
                        type={typeDos}
                        placeholder=" "
                        className="block w-full rounded shadow appearance-none py-2 px-3 border border-black"
                        {...register(nameDos)}
                        style={inputStyles}
                    />
                    {errors[nameDos] && (
                        <span className="text-red-500 text-xs pt-1 block">
                            {errors[nameDos]?.message as string}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FormInputDoble;
