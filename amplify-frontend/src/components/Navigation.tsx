// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from "react";
import {Navbar, Button} from "react-bootstrap";
import { JWT, signOut } from "aws-amplify/auth";

type NavigationProps = {
  token: JWT | null;
};

function Navigation(props: Readonly<NavigationProps>) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>
        &nbsp; AWS Amplify Blogpost
      </Navbar.Brand>
      {props.token ? (
        <Button style={{textAlign: "right"}} onClick={() => signOut()}>
          Sign Out
        </Button>
      ) : null}
    </Navbar>
  );
}

export default Navigation;
