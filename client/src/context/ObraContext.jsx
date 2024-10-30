import { useContext } from "react";
import { ObraContext } from "./ObraProvider";

export const useObras = () => {
    const context = useContext(ObraContext);
    if (!context) {
        throw new Error("useObras must be used within an ObraContextProvider");
    }
    return context;
};