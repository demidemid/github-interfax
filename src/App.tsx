import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import NotFoundPage from "./pages/NotFound";
import ProfilePage from "./pages/Profile";
import "semantic-ui-css/semantic.min.css";
import useLocalStorage from "./hooks/useLocalStorage";
import { useDispatch } from "react-redux";
import { loginAction, logoutAction } from "./redux/auth/auth-action";
import { convertStringToBoolean } from "./utils/utils";
import { RouteTypes } from "./interface/routes";
import ProfileDetailPage from "./pages/ProfileDetail";
import RepoCommitDetailPage from "./pages/RepoCommitDetail";

function App() {
  const [isLogin] = useLocalStorage(`isLogin`);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(convertStringToBoolean(isLogin) ? loginAction() : logoutAction());
  }, [dispatch, isLogin]);

  return (
    <Router>
      <Switch>
        <Route path={RouteTypes.LOGIN} component={LoginPage} />
        <Route path={RouteTypes.PROFILE} exact component={ProfilePage} />
        <Route
          path={RouteTypes.PROFILE_DETAIL}
          component={ProfileDetailPage}
          exact
        />
        <Route path={RouteTypes.COMMIT_DETAIL} exact component={RepoCommitDetailPage} />
        <Route path={RouteTypes.ROOT} exact component={ProfilePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
