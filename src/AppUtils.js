const getImages = async (page, setLoading, updateImages) => {
    const apiUrl = `https://foto-soppi-731ee922966d.herokuapp.com/images/all?page=${page}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data._embedded || !data._embedded.imageList) {
            console.warn("No more images found in response.");
            setLoading(false);
            return;
        }

        const fetchedImages = data._embedded.imageList;
        if (page === 0) updateImages([]); // Reset the array if reloading the first page
        updateImages((images) => [...images, ...fetchedImages]);
        setLoading(false);
    }
    catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
    }
};

const setLoadingIfScrollAtBottom = (boxRef, loading, setLoading) => {
    const box = boxRef.current;
    if (!box) return;

    const isAtBottom = box.scrollHeight - box.scrollTop === box.clientHeight;

    if (isAtBottom && !loading) {
        setLoading(true);
    }
};

const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

export {getImages, setLoadingIfScrollAtBottom, debounce};