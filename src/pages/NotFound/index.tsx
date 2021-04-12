import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Header } from "semantic-ui-react";

const NotFoundPage = () => (
  <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h1">404 - Not Found!</Header>
      <Button as={Link} to="/">
        Go Home
      </Button>
    </Grid.Column>
  </Grid>
);

export default NotFoundPage;
