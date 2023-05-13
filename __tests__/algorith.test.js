import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import postService from '../services/PostsService';

describe('fetchPosts', () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should fetch posts and set sorted posts when user is authenticated with saved posts', async () => {
    const setLoading = jest.fn();
    const setAllPosts = jest.fn();
    const setSortedPosts = jest.fn();
    const isAuth = true;
    const user = {
      postsSaved: [1, 2, 3],
    };
    const lastSavedPost = {
      data: {
        prompt: 'Lorem ipsum, dolor sit amet',
      },
    };
    const postsResponse = {
      data: {
        data: [4, 5, 6],
      },
    };

    mockAxios.onGet(`/post/${user.postsSaved[user.postsSaved.length - 1]}`).reply(200, lastSavedPost);
    mockAxios.onPost('/posts').reply(200, postsResponse);

    await PostService.fetchPosts(setLoading, setAllPosts, setSortedPosts, isAuth, user);

    expect(setLoading).toHaveBeenCalledWith(true);
    expect(setSortedPosts).toHaveBeenCalledWith(postsResponse.data.data);
    expect(setAllPosts).not.toHaveBeenCalled();
  });

  it('should fetch posts and set sorted posts when user is authenticated without saved posts', async () => {
    const setLoading = jest.fn();
    const setAllPosts = jest.fn();
    const setSortedPosts = jest.fn();
    const isAuth = true;
    const user = {
      postsSaved: [],
    };
    const postsResponse = {
      data: {
        data: [1, 2, 3],
      },
    };

    mockAxios.onPost('/posts').reply(200, postsResponse);

    await PostService.fetchPosts(setLoading, setAllPosts, setSortedPosts, isAuth, user);

    expect(setLoading).toHaveBeenCalledWith(true);
    expect(setSortedPosts).toHaveBeenCalledWith(postsResponse.data.data.reverse());
    expect(setAllPosts).not.toHaveBeenCalled();
  });

  it('should fetch posts and set all posts when user is not authenticated', async () => {
    const setLoading = jest.fn();
    const setAllPosts = jest.fn();
    const setSortedPosts = jest.fn();
    const isAuth = false;
    const user = null;
    const postsResponse = {
      data: {
        data: [1, 2, 3],
      },
    };

    mockAxios.onPost('/posts').reply(200, postsResponse);

    await PostService.fetchPosts(setLoading, setAllPosts, setSortedPosts, isAuth, user);

    expect(setLoading).toHaveBeenCalledWith(true);
    expect(setAllPosts).toHaveBeenCalledWith(postsResponse.data.data.reverse());
    expect(setSortedPosts).not.toHaveBeenCalled();
  });
});
