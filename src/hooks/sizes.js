import { useState, useEffect, useRef} from "react";

export function useSizes(){
    const [targetWidth, setTargetWidth] = useState(0);
    const [targetHeight, setTargetHeight] = useState(0);

    const sourceDivRef = useRef(null);
    const targetDivRef = useRef(null);


    useEffect(() => {
        const updateTargetSize = () => {
        if (sourceDivRef.current && targetDivRef.current) {
            const sourceWidth = sourceDivRef.current.offsetWidth;
            const sourceHeight = sourceDivRef.current.offsetHeight;
            setTargetWidth(sourceWidth);
            setTargetHeight(sourceHeight);
        }
        };


        updateTargetSize();
        window.addEventListener("resize", updateTargetSize);

        return () => window.removeEventListener("resize", updateTargetSize);
    }, []);

    return {targetWidth, targetHeight, sourceDivRef, targetDivRef};
}
