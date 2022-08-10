import "./scss/main.scss";

import Carousel from "./components/Carousel";
const images = [
  "https://images.pexels.com/photos/13145853/pexels-photo-13145853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/12977998/pexels-photo-12977998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/12861655/pexels-photo-12861655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];
const carousel = new Carousel(images);
carousel.setWidth(1000);
carousel.addImages([
  "https://images.pexels.com/photos/13095218/pexels-photo-13095218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/13025682/pexels-photo-13025682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
]);
