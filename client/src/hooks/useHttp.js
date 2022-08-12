import { useState, useCallback } from "react";

// save

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [responseData,setResponseData] = useState(null);


    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(requestConfig.url, {
                method: requestConfig.method,
                headers: {
                    ...requestConfig.headers,
                },
                credentials : requestConfig.credentials || 'omit',
                body: requestConfig.body
            });


            const data = await response.json();

            // setTimeout(() => {
                // for loading purpose
                setResponseData(data);
                applyData(data);
                setIsLoading(false);
            // },5000)

        } catch (error) {
            setIsLoading(false);
            setError(error.message || 'Something went wrong');
        }
    }, [])

    return {
        isLoading,
        error,
        sendRequest,
        responseData
    }
};

export default useHttp;