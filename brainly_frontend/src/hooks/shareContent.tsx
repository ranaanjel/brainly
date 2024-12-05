import axios from "axios";
import { useEffect, useState } from "react";
import { Location } from "react-router-dom";
import { backendURL } from "../config";

export function useShareContent(hashValue:Location) {
    const [elements, setElements] = useState([])

    const pathName = hashValue.pathname;

    const URL = backendURL+ "/user"+pathName;
    console.log(URL)

    useEffect(function() {

        axios.get(URL).then(m => {
            setElements(m.data.value.content)
            console.log(m.data.value.content)
        })

    },[])

    return elements;
}