import React from "react";
import { twMerge } from "tailwind-merge";
import Spinner from "./Spinner";

type LoadingButtonProps = {
    loading: boolean;
    btnColor?: string;
    textColor?: string;
    children: React.ReactNode;
};

export const LoadingButton: React.FC<LoadingButtonProps> = ({
    textColor = "text-white",
    btnColor = "bg-primario",
    children,
    loading = false,
}) => {
    return (
        <button
            type="submit"
            className={twMerge(
                `w-full py-3 font-semibold rounded outline-none border-none flex justify-center bg-amber-900 hover:bg-amber-800`,
                `${loading && "bg-amber-800"}`
            )}
        >
            {loading ? (
                <div className="flex items-center gap-3">
                    <Spinner />
                    <span className="text-secundario inline-block">Cargando...</span>
                </div>
            ) : (
                <span className={`${textColor}`}>{children}</span>
            )}
        </button>
    );
};
