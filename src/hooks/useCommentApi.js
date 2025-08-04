import { useState, useEffect } from 'react';

const useCommentApi = (blogId) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log(blogId)
    useEffect(() => {
        if (!blogId) return;

        const fetchComments = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/comments?blogId=${blogId}`);
                const result = await res.json();
                setData(result);
            } catch (error) {
                setError(error?.message || 'Failed to load comments');
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [blogId]);

    return { data, loading, error };
};

export default useCommentApi;
