import { useState, useCallback } from "react";

// save

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(requestConfig.url, {
                method: requestConfig.method,
                headers: requestConfig.headers,
                body: requestConfig.body
            });

            if (!response.ok) {
                throw new Error('Request failed');
            }

            const data = await response.json();
            console.log(data);

            // setTimeout(() => {
                // for loading purpose
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
        sendRequest
    }
};

export default useHttp;