import { useEffect, useState } from 'react';

const usePolling = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    console.log(url)
    useEffect(() => {
        let ignore = false;
        fetch(url)
            .then(response => response.json())
            .then(json => {
                
                    if (!ignore) {
                        setData(json);
                        setLoading(false);
                    } 
            })
            .catch(error => {
                if (!ignore) {
                    setError(error.message);
                    setLoading(false);
                }
            })

        return () => {
            ignore = true;
        };
    }, [url]);

    return { data, isLoading, error };
};

export default usePolling;
