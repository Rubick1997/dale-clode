const fetchSuggestionFromChatGPT = async () =>
  fetch(`/api/suggestion?timestamp=${new Date().getTime()}`, {
    headers: { "Content-Type": "application/json" },
    next: {
      revalidate: 0,
    },
  }).then((res) => res.json());

export default fetchSuggestionFromChatGPT;
