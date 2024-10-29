import { useContext } from "react";
import { ObraContext } from "./ObraProvider";

export const useObra = () => {
    const context = useContext(ObraContext);
    if (!context) {
        throw new Error("useObra must be used within an ObraContextProvider");
    }
    return context;
};