import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Header, Item, Segment, Table } from "semantic-ui-react";
import ErrorCustom from "../../components/ErrorCustom";
import UserCard from "../../components/UserCard";
import useFetch from "../../hooks/useFetch";
import { ICommitItemGH } from "../../interface/github";
import { RouteTypes } from "../../interface/routes";
import { isLoginState } from "../../redux/auth/auth-action";
import { convertDataToIco } from "../../utils/utils";

const RepoCommitDetailPage = (props: any) => {
  const isLogin = useSelector(isLoginState);
  const { login, repo } = props?.match?.params;
  const [{ response, isLoading, error }, doFetch] = useFetch(
    `/repos/${login}/${repo}/commits`
  );
  const commitList = ((response as unknown) as ICommitItemGH[]) || [];
  const authorAvatar =
    commitList?.find((item: ICommitItemGH) => item?.author?.login === login)
      ?.author?.avatar_url || ``;
  const avatarFallback = `https://i.stack.imgur.com/frlIf.png`;
  const errorMessage = ((error as unknown) as { message: string })?.message;

  useEffect(() => {
    doFetch();
  }, [doFetch]);

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
          <Header>Repositories Commit Detail Page</Header>
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
              login={login}
              avatar_url={authorAvatar || avatarFallback}
              linkUrl={`/users/${login}/repos`}
              repo={repo}
              imageSize="small"
              buttonName="Back to repos"
            />
          </Item.Group>

          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Author</Table.HeaderCell>
                <Table.HeaderCell>Commit hash</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {commitList.map((item: ICommitItemGH) => (
                <Table.Row key={item.node_id}>
                  <Table.Cell>{item.commit.author.name}</Table.Cell>
                  <Table.Cell>{item.commit.tree.sha}</Table.Cell>
                  <Table.Cell>
                    {convertDataToIco(item.commit.author.date)}
                  </Table.Cell>
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

export default RepoCommitDetailPage;
