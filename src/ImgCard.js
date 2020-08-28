import React from "react";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";

function ImgCard(props) {
  return (
    <>
      <Card
        className="bg-dark text-white border-0 pointer"
        onClick={props.onClick}
        id={props.index}
      >
        <Card.Img
          src={props.thumbSrc}
          alt={props.alt}
          className="width-100 img-fluid"
        />
        <Card.ImgOverlay
          className="d-hidden align-items-end overlay"
          id={props.indexID}
        >
          <Card.Text
            className="d-flex justify-content-between width-100 pb-0"
            id={props.indexID}
          >
            <a
              href={"https://www.instagram.com/" + props.insta}
              className="text-light nameLink align-self-end"
              target="_blank"
            >
              {props.name}
            </a>
            <a href={props.download} className="btn btn-outline-light">
              <FontAwesomeIcon icon={faArrowDown} />
            </a>
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
    </>
  );
}

export default ImgCard;
