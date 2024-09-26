// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, {useState} from "react";
import {Card, Row, Col, Button, Modal, Spinner} from "react-bootstrap";
import {get} from "aws-amplify/api";


type MainRequestProps = {
  token: string
}

function MainRequest(props: Readonly<MainRequestProps>) {
  const [json, setJson] = useState<any | null>(null);
  const [show, setShow] = useState(false);

  async function handleSubmit() {
    setShow(true);
    const response = getData().response.then(response => response.body.json().then(json => json));
    response.then(response => setJson(response));
  }

  function handleClose() {
    setJson(null);
    setShow(!show);
  }

  function getData() {
    const apiName = "MyBlogPostApi";
    const path = "/test";
    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: props.token
      }
    };
    return get({
      apiName, path, options
    });
  }

  return (
    <>
      <Row>
        <Col sm={3}></Col>
        <Col sm={6}>
          <Card style={{width: "100%"}}>
            <Card.Body>
              <Card.Title>
                <h3 style={{textAlign: "center"}}>Hello </h3>
              </Card.Title>
              <Row>
                <Col sm={2}></Col>
                <Col sm={8}>
                  {" "}
                  <Button
                    variant="outline-success"
                    onClick={handleSubmit}
                    block
                  >
                    Call my mock API
                  </Button>
                </Col>
                <Col sm={2}> </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={3}></Col>
      </Row>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <h3 style={{textAlign: "center"}}>Response</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {json ? (
            <p>Here is the response: {json.message}</p>
          ) : (
            <h3 style={{textAlign: "center"}}>
              <Spinner animation="border" variant="primary" />
            </h3>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MainRequest;
