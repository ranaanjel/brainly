import axios from "axios";
import { useEffect, useState } from "react";
import { backendURL, userContentURL } from "../../config";

export function useContent() {
    const [contents, setContents] = useState<any>([]);

    useEffect(function () {

       try {
         axios.get(backendURL+userContentURL, {
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        }).then(m =>  {
           //console.log(m, "fetch items")
            setContents(m.data.contents)
        })  
        
       }catch(err) {
        console.log(err)
       }

    }, [])

    return contents;
}