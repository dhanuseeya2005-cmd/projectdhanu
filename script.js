const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const frameCount = 200;
const images = [];
const imageSeq = {
  frame: 0
};

/* Set canvas size */
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* Load images */
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  const frameNumber = i.toString().padStart(3, "0");
  img.src = `images/ezgif-frame-${frameNumber}.jpg`;
  images.push(img);
}

/* Draw image */
function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[imageSeq.frame], 0, 0, canvas.width, canvas.height);
}

/* Scroll animation */
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;

  const scrollFraction = scrollTop / maxScroll;

  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  imageSeq.frame = frameIndex;
  render();
});

/* First image */
images[0].onload = render;

/* Resize handling */
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});
