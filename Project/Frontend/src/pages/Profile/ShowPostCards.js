import React from "react";
import Navbar from "../../components/Navbar";
import PostCards from "../../components/PostCards";

const DUMMY_DATA = [
  {
    name: "Om",
    source: "https://source.unsplash.com/random",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Harsh",
    source: "https://source.unsplash.com/random",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Priyanshi",
    source: "https://source.unsplash.com/random",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Kaushal",
    source: "https://source.unsplash.com/random",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Devdeep",
    source: "https://source.unsplash.com/random",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Achyut",
    source: "https://source.unsplash.com/random",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
];

const ShowPostCards = () => {
  return (
    <>
      <h1>hellop</h1>
      <Navbar />
      <PostCards items={DUMMY_DATA} />
    </>
  );
};

export default ShowPostCards;
