import { useCallback, useState } from "react/cjs/react.development";



export const useHttp = () => {

    const [process, setProcess] = useState('waiting')

    const request = useCallback( async (url, method = 'GET', body = null, headers = {'Content-type': 'application/json'}) => {
        
        setProcess('loading')

        try {

            const res = await fetch(url, {method, body,headers});

            if(!res.ok) {
                throw new Error('Error')
            }

            const data = await res.json();

            return data

        } catch(e) {

            setProcess('error')
            throw e;
        }


    }, [])

    const clearError = useCallback(() => {
        setProcess('loading')
    }, [])

    return {request, clearError, process, setProcess}
}