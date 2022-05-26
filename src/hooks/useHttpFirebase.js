import { useState, useCallback } from "react";

const useHttpFirebase = () => {
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


            const data = await response.json();
            console.log(data);

            // firebase error handling
            if (data.error) {
                setIsLoading(false);
                throw new Error(data.error.message);
            }

            applyData(data);
            setIsLoading(false);

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

export default useHttpFirebase;