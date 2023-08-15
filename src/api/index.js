import { API_URLS } from "../utils/constants.js";
// import { getFormBody } from "../utils";

const customFetch = async (API_URI, { body, ...customConfig }) => {
  const headers = {
    "Content-type": "application/json; charset=UTF-8",
    // "Content-type": "x-www-form-urlencoded",
  };

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
    // config.body = getFormBody(body);
  }

  try {
    const response = await fetch(API_URI, config);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const getAlbums = async () => {
  return customFetch(API_URLS.getAlbums(), { method: "GET" });
};

export const addAlbum = async (userId, title) => {
  return customFetch(API_URLS.getAlbums(), {
    method: "POST",
    body: { title, userId },
  });
};

export const updatedAlbum = async (id, title, userId) => {
  return customFetch(API_URLS.updateAlbum(id), {
    method: "PUT",
    body: { title, userId },
  });
};

export const removeAlbum = async (album) => {
  return customFetch(API_URLS.removeAlbum(album.id), {
    method: "DELETE",
    body: { userId: album.userId, title: album.title },
  });
};