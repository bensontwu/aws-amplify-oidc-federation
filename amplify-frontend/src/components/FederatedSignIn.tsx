// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from "react";
import {Card, Row, Col, Button} from "react-bootstrap";
import { signInWithRedirect } from "aws-amplify/auth";

type FederatedSignInProps = {
  federatedIdName: string;
};

function FederatedSignIn(props: Readonly<FederatedSignInProps>) {
  return (
    <Row>
      <Col sm={3}></Col>
      <Col sm={6}>
        <Card style={{width: "100%"}}>
          <Card.Body>
            <Card.Title>
              <h3 style={{textAlign: "center"}}>Welcome</h3>
            </Card.Title>
            <Card.Text style={{textAlign: "center"}}>
              In order to proceed please click to authenticate
            </Card.Text>
            <Row>
              <Col sm={3}></Col>
              <Col sm={6}>
                {" "}
                <Button
                  block
                  variant="success"
                  onClick={() => signInWithRedirect({
                    provider: {
                      "custom": props.federatedIdName
                    }
                  })}
                >
                  Federated Sign In
                </Button>
              </Col>
              <Col sm={3}> </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col sm={3}></Col>
    </Row>
  );
}

export default FederatedSignIn;
