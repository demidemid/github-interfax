import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Header, Item, Segment, Table } from "semantic-ui-react";
import ErrorCustom from "../../components/ErrorCustom";
import UserCard from "../../components/UserCard";
import useFetch from "../../hooks/useFetch";
import { IRepoGH } from "../../interface/github";
import { RouteTypes } from "../../interface/routes";
import { isLoginState } from "../../redux/auth/auth-action";

const ProfileDetailPage = (props: any) => {
  const isLogin = useSelector(isLoginState);
  const userLogin = props.match.params.id || ``;
  const [{ response, isLoading, error }, doFetch] = useFetch(
    `/users/${userLogin}/repos`
  );
  const repoList = ((response as unknown) as IRepoGH[]) || [];
  const errorMessage = ((error as unknown) as { message: string })?.message;

  useEffect(() => {
    if (userLogin) {
      doFetch();
    }
  }, [doFetch, userLogin]);

  if (!isLogin) {
    return <Redirect to={RouteTypes.LOGIN} />;
  }

  if (errorMessage) {
    return <ErrorCustom errorText={errorMessage} />;
  }

  return (
    <Segment
      padded="very"
      textAlign="center"
      style={{ position: "relative", maxWidth: "1000px", margin: "0 auto" }}
    >
      {!isLoading ? (
        <>
          <Header>Profile Detail Page</Header>
          <Item.Group
            style={{
              maxWidth: "1000px",
              margin: "40px auto",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <UserCard
              login={repoList[0]?.owner.login}
              avatar_url={repoList[0]?.owner.avatar_url}
              linkUrl={`/users/${repoList[0]?.owner.login}`}
              imageSize="small"
              buttonName="Back to users"
            />
          </Item.Group>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Language</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Star count</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {repoList.map((item: IRepoGH) => (
                <Table.Row key={item.id}>
                  <Table.Cell>
                    <Link to={`repos/${item.name}/commits`}>{item.name}</Link>
                  </Table.Cell>
                  <Table.Cell>{item.language}</Table.Cell>
                  <Table.Cell>{item.description}</Table.Cell>
                  <Table.Cell>{item.stargazers_count}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </>
      ) : (
        <div>Loading...</div>
      )}

    </Segment>
  );
};

export default ProfileDetailPage;
