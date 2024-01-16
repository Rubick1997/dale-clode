import axios from "axios";

const fetchImages = async () =>
  axios.get("/api/getImages").then((res) => res.data);

export default fetchImages;
