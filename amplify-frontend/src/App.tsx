// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, {useEffect, useState, Fragment} from "react";
import {Amplify} from "aws-amplify";
import {Container} from "react-bootstrap";

import Navigation from "./components/Navigation.tsx";
import FederatedSignIn from "./components/FederatedSignIn.tsx";
import MainRequest from "./components/MainRequest.tsx";
import "./App.css";
import { fetchAuthSession, JWT } from "aws-amplify/auth";


Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-west-2_43knpCqQW",
      userPoolClientId: "2hlbmaa8eop42nt3qlccdvbi5j",
      userPoolEndpoint: "test-diode-2.auth.us-west-2.amazoncognito.com",
      loginWith: {
        oauth: {
          domain: "test-diode-2.auth.us-west-2.amazoncognito.com",
          scopes: ["email", "openid", "arn:aws:execute-api:us-west-2:713750136540:szfkqs4ijd/user"],
          redirectSignIn: ["http://localhost:3000"],
          redirectSignOut: ["http://localhost:3000"],
          responseType: "code"
        }
      },
    },
  },
  API: {
    REST: {
      MyBlogPostApi: {
          endpoint: "https://szfkqs4ijd.execute-api.us-west-2.amazonaws.com/dev"
      }
    }
  }
});

async function getToken() {
  try {
    const session = await fetchAuthSession();
    return session.tokens ? session.tokens : null;
  } catch (err) {
    return console.log(err);
  }
}

const federatedIdName = "mock-saml-provider";

function App() {
  const [token, setToken] = useState<JWT | null>(null);

  useEffect(() => {
    getToken().then(tokens => setToken(tokens ? tokens.accessToken : null));
  }, []);

  return (
    <Fragment>
      <Navigation token={token} />
      <Container fluid>
        <br />
        {token !== null ? (
          <MainRequest token={token.toString()} />
        ) : (
          <FederatedSignIn federatedIdName={federatedIdName} />
        )}
      </Container>
    </Fragment>
  );
}

export default App;
