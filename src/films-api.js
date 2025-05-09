import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const fetchFilms = async (path, params = {}) => {
  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjA5NjUzNTFhZGNiZTJmYzZkOWRmN2NiYjYxOTQzZCIsIm5iZiI6MS43NDY2MjAzNDI4ODYwMDAyZSs5LCJzdWIiOiI2ODFiNGZiNjVkZDgxMzY1MmY4MDk0NjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.53Zy50au1ZOF5ncqHyK6MHCaRHNUAomwPANOoYuiGSE",
    },
    params,
  };
  const response = await axios.get(path, options);
  return response.data;
};

export default fetchFilms;
