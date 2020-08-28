import React from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import {
  faShare,
  faChevronLeft,
  faChevronRight,
  faArrowDown
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swipeable } from "react-swipeable";

function ImgModal(props) {
  function handleClick() {
    document
      .getElementsByClassName("modal-body")[0]
      .getElementsByTagName("img")[0]
      .classList.toggle("fullsize");
    document
      .getElementsByClassName("modal-body")[0]
      .getElementsByTagName("img")[0]
      .classList.toggle("size");
    document
      .getElementsByClassName("modal-body")[0]
      .getElementsByTagName("img")[0]
      .classList.toggle("zoom-in");
    document
      .getElementsByClassName("modal-body")[0]
      .getElementsByTagName("img")[0]
      .classList.toggle("zoom-out");
  }

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      id="mainModal"
    >
      <Container fluid>
        <Row>
          <Col>
            <div className="modal-arrow-left" onClick={props.onLeftClick}>
              <a href="#" className="btn btn-outline-light border-0">
                <FontAwesomeIcon icon={faChevronLeft} size="3x" />
              </a>
            </div>
          </Col>
          <Col xs="12" className="p-0">
            <Modal.Header closeButton className="border-bottom-0 px-4 pb-3">
              <Modal.Title className="artistInfo">
                <p className="lead pb-0 mb-0">{props.name}</p>
                <a
                  href={"https://www.instagram.com/" + props.insta}
                  className="text-dark nameLink"
                  target="_blank"
                >
                  {props.insta ? "@" + props.insta : ""}
                </a>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              className="modal-body text-center p-0"
              id="modalBody"
              onClick={handleClick}
            >
              <Swipeable
                onSwipedLeft={props.onRightClick}
                onSwipedRight={props.onLeftClick}
              >
                <img
                  src={props.modalSrc}
                  alt=""
                  className="img-fluid size zoom-in"
                />
                <div className=" align-items-end overlay">
                  <p className="d-flex justify-content-between width-100 pb-0">
                    <Button
                      href={props.download}
                      variant="secondary"
                      className="btn-md-sm"
                    >
                      Download
                    </Button>
                  </p>
                </div>
              </Swipeable>
            </Modal.Body>
            <Modal.Footer className="border-top-0 px-4">
              <Container fluid className="pl-0">
                <Row>
                  <Col className="align-self-center width-md-100" xs="9">
                    <p className=" mb-0">{props.description}</p>
                  </Col>
                  <Col className="text-right align-self-center p-0">
                    <Button
                      href={props.download}
                      variant="outline-secondary"
                      className="btn-md-sm hide-md"
                    >
                      Download
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Modal.Footer>
          </Col>
          <Col>
            <div className="modal-arrow-right" onClick={props.onRightClick}>
              <a href="#" className="btn btn-outline-light border-0">
                <FontAwesomeIcon icon={faChevronRight} size="3x" />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </Modal>
  );
}

export default ImgModal;
