import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

export const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    perPage: 30,
    page: 1,
  });
  const unsplashResults = photos?.response?.results;
  return unsplashResults?.map((res) => res.urls["small"]);
};

export const fetchCoffeeStore = async () => {
  const photos = await getListOfCoffeeStorePhotos();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores(
      "43.653833032607096%2C-79.37896808855945",
      "coffee",
      16
    ),
    options
  );
  const data = await response.json();
  return data.results.map((res, idx) => {
    const neighborhood = res.location.neighborhood;
    return {
      id: res.fsq_id,
      address: res.location.address,
      name: res.name,
      neighborhood:
        neighborhood && neighborhood.length > 0 ? neighborhood[0] : "",
      imgUrl: photos && photos.length > 0 ? photos[idx] : null,
    };
  });
};
