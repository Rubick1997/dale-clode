import axios from "axios";

const fetchSuggestionFromChatGPT = async () =>
  axios.get("/api/suggestion").then((res) => res.data);

export default fetchSuggestionFromChatGPT;
