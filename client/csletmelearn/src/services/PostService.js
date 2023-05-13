import api from "../http";

export default class PostService {
    
    static fetchPosts = async (setLoading, setAllPosts, setSortedPosts, isAuth, user) => {
        setLoading(true);
      
        try {
          if (isAuth && user) {
            if (user.postsSaved && user.postsSaved.length > 0) {
              const lastSavedPost = await api.get(`/post/${user.postsSaved[user.postsSaved.length-1]}`);
              const preference = lastSavedPost.data.prompt.split(',')[lastSavedPost.data.prompt.split(',').length - 1]?.trim();
              const response = await api.post('/posts', {preference}, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              if (response) {
                const result = await response.data;
                setSortedPosts(result.data);
              }
            }
            else{
              const response = await api.post('/posts', { preference: '' }, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              if (response) {
                const result = await response.data;
                setSortedPosts(result.data.reverse());
              }
            }
          } else {
            const response = await api.post('/posts', { preference: '' }, {
              headers: {
                'Content-Type': 'application/json'
              }
            });
            if (response) {
              const result = await response.data;
              setAllPosts(result.data.reverse());
            }
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      };
}


