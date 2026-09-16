const imageRequests = new Map();

const normalizedSource = (source) => new URL(source, document.baseURI).href;

export const preloadImage = (source, fetchPriority = "auto") => {
  if (!source) return Promise.resolve();

  const cacheKey = normalizedSource(source);
  const existingRequest = imageRequests.get(cacheKey);

  if (existingRequest) {
    if (fetchPriority === "high") existingRequest.image.fetchPriority = "high";
    return existingRequest.promise;
  }

  const image = new Image();
  const request = new Promise((resolve) => {
    image.decoding = "async";
    image.fetchPriority = fetchPriority;

    image.addEventListener(
      "load",
      async () => {
        try {
          await image.decode();
        } catch {
          // A loaded image is still usable when a browser cannot decode it here.
        }

        resolve();
      },
      { once: true },
    );
    image.addEventListener("error", resolve, { once: true });
    image.src = source;
  });

  // Retain the decoded Image for the session so returning to a route does not
  // trigger another request or make the browser decode the asset from scratch.
  imageRequests.set(cacheKey, { image, promise: request });
  return request;
};

export const preloadImages = (sources, fetchPriority = "auto") =>
  Promise.all(sources.map((source) => preloadImage(source, fetchPriority)));
