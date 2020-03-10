import axios from "axios";

const Params = {
  api_key: "bd68c0f633b46e6bb0a0ed111952b60f",
  language: "en-US"
};

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/"
});

export const moviesApi = {
  nowPlaying: () => api.get("movie/now_playing", { params: Params }),
  upcoming: () => api.get("movie/upcoming", { params: Params }),
  popular: () => api.get("movie/popular", { params: Params }),
  movieDetail: id =>
    api.get(`movie/${id}`, {
      params: { ...Params, append_to_response: "videos" }
    }),
  search: term =>
    api.get("search/movie", {
      params: { ...Params, query: encodeURIComponent(term) }
    })
};
export const tvApi = {
  topRated: () => api.get("tv/top_rated", { params: Params }),
  popular: () => api.get("tv/popular", { params: Params }),
  airingToday: () => api.get("tv/airing_today", { params: Params }),
  showDetail: id =>
    api.get(`tv/${id}`, {
      params: {
        ...Params,
        append_to_response: "videos"
      }
    }),
  search: term =>
    api.get("search/tv", {
      params: { ...Params, query: encodeURIComponent(term) }
    })
};
