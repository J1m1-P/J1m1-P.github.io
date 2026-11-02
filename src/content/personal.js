import photoDimensions from "virtual:personal-photo-dimensions";

// Add photos from public/images/personal here and keep hover captions short.
// Dimensions are read automatically from the image files by Vite.
export const personalPhotos = [
  {
    src: "/images/personal/great-trek-relay.jpg",
    alt: "Friends posing together at the Great Trek relay",
    caption: "UBC Great Trek Relay 🏃",
  },
  {
    src: "/images/personal/nerdy-jimmy.jpg",
    alt: "Jimmy smiling and raising a finger outdoors",
    caption: "☝️🤓",
  },
  {
    src: "/images/personal/gaming-cat.png",
    alt: "A kitten with its paws on a game controller",
    caption: "Me in my spare time 🎮",
  },
  {
    src: "/images/personal/biking-with-friends.jpg",
    alt: "Friends wearing bicycle helmets during a break on a wooded trail",
    caption: "Biking with friends 🚴",
  },
  {
    src: "/images/personal/friends-birthday.jpg",
    alt: "Friends making peace signs around a birthday candle",
    caption: "Birthday dinner 🎂",
  },
  {
    src: "/images/personal/tofu.jpg",
    alt: "Tofu the cat sitting inside a green bag",
    caption: "Tofu (my friends cat) 🐱",
  },
  {
    src: "/images/personal/halloween-aura-farm.JPG",
    alt: "Jimmy in a Halloween costume outdoors at night",
    caption: "Halloween aura farming 👻",
  },
  {
    src: "/images/personal/potluck.jpg",
    alt: "A potluck table covered with homemade dishes and desserts",
    caption: "Potluck 🍲",
  },
  {
    src: "/images/personal/godzilla-cloud.jpg",
    alt: "A cloud shaped like Godzilla above the trees beside the water",
    caption: "Godzilla 🐉",
  },
  {
    src: "/images/personal/meteor-shower.jpg",
    alt: "Friends sitting together by the water at night to watch a meteor shower",
    caption: "Meteor shower 🌠",
  },
  {
    src: "/images/personal/halloween-pne.jpg",
    alt: "Friends posing in bumper cars at the PNE on Halloween",
    caption: "Halloween at PNE 🎃",
  },
  {
    src: "/images/personal/beginner-band-flute.jpg",
    alt: "Jimmy holding a flute for beginner band",
    caption: "Beginner band 🎷",
  },
  {
    src: "/images/personal/supersizing.jpg",
    alt: "A restaurant table filled with small dessert bowls",
    caption: "Growing horizontally 🍽️",
  },
  {
    src: "/images/personal/cairn-graffiti.jpg",
    alt: "A collage of friends gathered around the painted engineering cairn",
    caption: "Cairn graffiti (it's legal) 🎨",
  },
  {
    src: "/images/personal/got-caught-slacking.jpg",
    alt: "A friend taking a selfie beside someone resting their head on a desk",
    caption: "Caught slacking 😴",
  },
].map((photo) => {
  const dimensions = photoDimensions[photo.src];
  if (!dimensions) throw new Error(`Personal photo not found: ${photo.src}`);
  return { ...photo, ...dimensions };
});
