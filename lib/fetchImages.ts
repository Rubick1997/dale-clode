const fetchImages = async () =>
  fetch(`/api/getImages?timestamp=${new Date().getTime()}`, {
    headers: { "Content-Type": "application/json" },

    next: {
      revalidate: 0,
    },
  })
    .then((res) => res.json())
    .then((data) => data);

export default fetchImages;
