import { useEffect, useState } from "react";
import { getAgrupations } from "./agrupaciones";

export function useAgrupations(){
    const [data, setData] = useState(null);

    useEffect(() => {
        async function cargarDatos(){
            const agrupaciones = await getAgrupations();
            setData(agrupaciones);
        }

        cargarDatos();
    }, [])

    const isLoading = data == null;

    return {data, isLoading};
}
