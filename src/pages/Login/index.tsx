import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { ReactComponent as GithubLogo } from "../../images/github-logo.svg";
import { isLoginState, loginAction } from "../../redux/auth/auth-action";
import { ADMIN_USER } from "../../utils/consts";

const LoginPage = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector(isLoginState);
  const [, setIsLoginLocal] = useLocalStorage(`isLogin`);

  const [login, setLogin] = useState(``);
  const [password, setPassword] = useState(``);
  const [validationError, setValidationError] = useState(``);

  const handleLoginClick = () => {
    if (ADMIN_USER.login === login && ADMIN_USER.password === password) {
      setIsLoginLocal(`true`);
      dispatch(loginAction());
    } else {
      setValidationError(`Wrong login or password`);
    }
  };

  useEffect(() => {
    setValidationError(``);
  }, [login, password]);

  if (isLogin) {
    return <Redirect to="/" />;
  }

  return (
    (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 350 }}>
          <Header as="h2">
            <Image as={GithubLogo} />
            Log-in to your account
          </Header>
          <Form size="large">
            <Segment stacked style={{ background: "#f6f8fa" }}>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Login"
                value={login}
                onChange={(evt) => setLogin(evt.target.value.trim())}
              />
              <Form.Input
                style={{ marginBottom: "30px" }}
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(evt) => setPassword(evt.target.value.trim())}
              />

              <Button
                fluid
                size="large"
                onClick={handleLoginClick}
                style={{backgroundColor: `#2ea44f`, color: `white`}}
              >
                Login
              </Button>
            </Segment>
          </Form>

          {validationError && (
            <Message negative>
              <p>{validationError}</p>
            </Message>
          )}
        </Grid.Column>
      </Grid>
    )
  );
};

export default LoginPage;
