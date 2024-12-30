import { apiCalling } from "../api/apiCalling.api";
import { setAllBlogs, setMyCreatedBlogs, setMySavedBlogs } from "../store/slices/blog.slice";

export const fetchAllBlogs = async ({dispatch}) => {
    const options = {
        url: `http://localhost:2000/api/v2/user/blog/get-all`,
        method: "GET",
      };
      const response = await dispatch(apiCalling(options));
      if (response?.success) {
        dispatch(setAllBlogs(response?.data.reverse()));
      } else {
        console.log("We get error during fetching wishlist item from database !");
      }

}

export const fetchMySavedBlogs = async ({dispatch}) => {
    const options = {
        url: `http://localhost:2000/api/v2/user/blog/get-saved`,
        method: "GET",
      };
      const response = await dispatch(apiCalling(options));
      if (response?.success) {
        dispatch(setMySavedBlogs(response?.data.reverse()));
      } else {
        console.log("We get error during fetching wishlist item from database !");
      }
}

export const fetchMyLikedBlogs = async ({dispatch}) => {
    const options = {
        url: `http://localhost:2000/api/v2/user/blog/get-liked`,
        method: "GET",
      };
      const response = await dispatch(apiCalling(options));
      if (response?.success) {
        dispatch(setMySavedBlogs(response?.data.reverse()));
      } else {
        console.log("We get error during fetching wishlist item from database !");
      }
}

export const fetchMyCreatedBlogs = async ({dispatch}) => {
    const options = {
        url: `http://localhost:2000/api/v2/user/blog/get-created`,
        method: "GET",
      };
      const response = await dispatch(apiCalling(options));
      if (response?.success) {
        dispatch(setMyCreatedBlogs(response?.data.reverse()));
      } else {
        console.log("We get error during fetching wishlist item from database !");
      }
}

