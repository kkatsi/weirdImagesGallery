import React, { useState, useEffect } from "react";
import "./App.css";
import "./css/masonry.css";
import Masonry from "react-masonry-css";
// import "./css/scrollbar.css";
import "./css/scroll-arrow.css";
import ImgCard from "./ImgCard.js";
import useImageSearch from "./useImageSearch.js";
import InfiniteScroll from "react-infinite-scroll-component";
import { Jumbotron, Container } from "react-bootstrap";
import ImgModal from "./ImgModal.js";

function App(props) {
  const [pageNumber, setPageNumber] = useState(1);
  const [currentIndexID, setCurrentIndexID] = useState(0);
  const [name, setName] = useState("");
  const [insta, setInsta] = useState("");
  const [description, setDescription] = useState("");
  const [download, setDownload] = useState("");
  const [modalSrc, setModalSrc] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  let i,
    j = 0;

  const { error, hasMore, data } = useImageSearch(pageNumber);

  const loadmore = pageNumber => {
    if (hasMore) setPageNumber(pageNumber => pageNumber + 1);
  };

  //set Card ID right before user clicks the card
  document.addEventListener(
    "click",
    function(e) {
      setCurrentIndexID(e.target.id.replace("card", ""));
    },
    true
  );

  //setting some fancy effect for navbar when scrolling
  // function handleScroll(e) {
  //   const navbar = document.getElementById("navbar");
  //   if (window.scrollY > navbar.clientHeight) navbar.classList.add("scrolled");
  //   else navbar.classList.remove("scrolled");
  // }

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  function onKeyDown(e) {
    if (e.keyCode === 39) {
      onRightClick();
    } else if (e.keyCode === 37) onLeftClick();
  }

  //Getting the clicked card's props to pass into Modal
  function handleClick(e) {
    console.log(e.target);
    setCurrentIndexID(e.target.id.replace("card", ""));
    setCurrentIndex(e.currentTarget.id);
    const currentData = data.find(d => d.id === currentIndexID);
    setModalSrc(currentData.urls.regular);
    setName(currentData.user.name);
    setDescription(currentData.description);
    setInsta(currentData.user.instagram_username);
    setDownload(currentData.links.download + "?force=true");
    handleShow();
  }

  //updating Modal's props when user clicks or presses left and right button
  function onRightClick() {
    const nextIndex = Number(currentIndex) + 1;
    if (nextIndex === data.length) loadmore(pageNumber);
    if (nextIndex < data.length) {
      setModalSrc(data[nextIndex].urls.regular);
      setName(data[nextIndex].user.name);
      setDescription(data[nextIndex].description);
      setInsta(data[nextIndex].user.instagram_username);
      setDownload(data[nextIndex].links.download + "?force=true");
      setCurrentIndex(nextIndex);
    }
  }

  function onLeftClick() {
    const prevIndex = Number(currentIndex) - 1;
    if (prevIndex >= 0) {
      setModalSrc(data[prevIndex].urls.regular);
      setName(data[prevIndex].user.name);
      setDescription(data[prevIndex].description);
      setInsta(data[prevIndex].user.instagram_username);
      setDownload(data[prevIndex].links.download + "?force=true");
      setCurrentIndex(prevIndex);
    }
  }

  return (
    <div className="App" onKeyDown={onKeyDown} tabIndex="0">
      <Jumbotron fluid>
        <Container className="text-center">
          <h1 className="display-1 pt-5 px-5 px-sm-0">
            The weird images gallery
          </h1>
          <p className="lead montserrat">
            Here you can find some of the most weird images around the world!
          </p>
          <div className="wrap pt-2">
            <img
              src="http://image.flaticon.com/icons/svg/3/3907.svg"
              alt="arrow down"
              id="arrow"
              className="animated bounce"
            />
          </div>
        </Container>
      </Jumbotron>

      <section id="mainContent">
        <Container>
          <InfiniteScroll
            dataLength={data.length}
            next={() => loadmore(pageNumber)}
            hasMore={hasMore}
          >
            <Masonry
              breakpointCols={{ default: 3, 1200: 2, 767: 1 }}
              className="masonry-grid"
              columnClassName="masonry-grid_column"
            >
              {data.map((d, i) => {
                return (
                  <ImgCard
                    key={d.id}
                    index={i}
                    thumbSrc={d.urls.small}
                    name={d.user.name}
                    download={d.links.download + "?force=true"}
                    insta={d.user.instagram_username}
                    indexID={"card" + d.id}
                    modalSrc={d.urls.regular}
                    alt={d.alt_description}
                    description={d.description}
                    onClick={handleClick}
                  />
                );
              })}
            </Masonry>
          </InfiniteScroll>
        </Container>
      </section>
      <ImgModal
        show={show}
        handleClose={handleClose}
        modalSrc={modalSrc}
        name={name}
        description={description}
        insta={insta}
        download={download}
        onLeftClick={onLeftClick}
        onRightClick={onRightClick}
      />
    </div>
  );
}

export default App;
