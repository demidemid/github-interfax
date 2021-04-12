/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Button,
  Header,
  Icon,
  Item,
  Message,
  Search,
  Segment,
} from "semantic-ui-react";
import ErrorCustom from "../../components/ErrorCustom";
import UserCard from "../../components/UserCard";
import useDebounce from "../../hooks/useDebounce";
import useFetch from "../../hooks/useFetch";
import useLocalStorage from "../../hooks/useLocalStorage";
import { IProfileGH } from "../../interface/github";
import { RouteTypes } from "../../interface/routes";
import { isLoginState, logoutAction } from "../../redux/auth/auth-action";

const ProfilePage = (props: any) => {
  const isLogin = useSelector(isLoginState);
  const userLogin = props.match.params.login || ``;
  const [searchValue, setSearchValue] = useState(userLogin);
  const debouncedSearchValue = useDebounce(searchValue, 700);
  const dispatch = useDispatch();
  const [, setIsLogin] = useLocalStorage(`isLogin`);
  const [{ response, isLoading, error }, doFetch] = useFetch(`/search/users`);
  const [emptyList, setEmptyList] = useState(false);
  const errorMessage = ((error as unknown) as { message: string })?.message;
  let userList = response ? ((response as unknown) as IProfileGH).items : [];

  useEffect(() => {
    if (debouncedSearchValue) {
      doFetch({
        params: {
          q: debouncedSearchValue,
        },
      });
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    setEmptyList(!userList.length && searchValue.length > 0);

    if (searchValue.length === 0) {
      setEmptyList(false);
    }
  }, [userList.length]);

  if (!isLogin) {
    return <Redirect to={RouteTypes.LOGIN} />;
  }

  if (errorMessage) {
    return <ErrorCustom errorText={errorMessage} />;
  }

  const handleLogoutClick = () => {
    dispatch(logoutAction());
    setIsLogin(`false`);
  };

  return (
    <Segment padded="very" textAlign="center" style={{ position: "relative" }}>
      <Header icon>
        <Icon name="search" />
        Find GitHub User
      </Header>

      <Search
        className="search-custom"
        size="large"
        style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
        placeholder="Search by username..."
        loading={isLoading}
        value={searchValue}
        onSearchChange={(evt, data) => setSearchValue(data.value || ``)}
      />
      <Button
        basic
        color="red"
        icon="sign-out"
        content="log out"
        onClick={handleLogoutClick}
        style={{ position: "absolute", top: "3em", right: "3em" }}
      />

      <Item.Group
        style={{
          maxWidth: "1000px",
          margin: "40px auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {searchValue.length
          ? userList?.map((item) => (
              <UserCard
                key={item.id}
                avatar_url={item.avatar_url}
                login={item.login}
                linkUrl={`/users/${item.login}/repos`}
                buttonName="View"
                style={{ maxWidth: "30%" }}
              />
            ))
          : ``}

        {emptyList && (
          <Message
            info
            style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
          >
            <Message.Header>
              The user you are looking for does not exist, try changing your
              query
            </Message.Header>
          </Message>
        )}
      </Item.Group>
    </Segment>
  );
};

export default ProfilePage;
