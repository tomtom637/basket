const imagesURL = [
    'https://freesvg.org/img/1502840681.png',
    'https://static.vecteezy.com/system/resources/thumbnails/000/184/453/small/Basketball-court-01.jpg',
];

function loadImage(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener('load', resolve(image));
    image.src = url;
  });
}

export const promisedImgs = imagesURL.map((promisedImg) => loadImage(promisedImg));

