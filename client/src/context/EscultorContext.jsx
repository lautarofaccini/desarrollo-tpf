import { useContext } from "react";
import { EscultorContext } from "./EscultorProvider";

export const useEscultores = () => {
    const context = useContext(EscultorContext);
    if (!context) {
        throw new Error("useEscultores must be used within an EscultorContextProvider");
    }
    return context;
};