import React from "react";
import { Link } from "react-router-dom";
import { Button, Item, SemanticSIZES } from "semantic-ui-react";

interface IUserCardProps {
  avatar_url: string;
  login: string;
  repo?: string;
  linkUrl: string;
  buttonName: string;
  imageSize?: SemanticSIZES;
  style?: {
    [n: string]: string;
  };
}

const UserCard = ({
  avatar_url,
  login,
  linkUrl,
  buttonName,
  style,
  repo,
  imageSize = `tiny`,
}: IUserCardProps) => {
  return (
    <Item style={style}>
      <Item.Image size={imageSize} src={avatar_url} />

      <Item.Content
        style={{
          display: `flex`,
          flexDirection: `column`,
          justifyContent: `space-between`,
        }}
      >
        <Item.Header as="h2" style={{ width: "100%", textAlign: "left" }}>
          {login}
        </Item.Header>
        {repo && (
          <Item.Description as="p" style={{ width: "100%", textAlign: "left" }}>
            {repo}
          </Item.Description>
        )}
        <Item.Group style={{ marginTop: `auto` }}>
          <Button
            fluid
            as={Link}
            to={linkUrl}
            style={{
              backgroundColor: `#2ea44f`,
              color: `white`,
              marginRight: "auto",
              maxWidth: "150px",
            }}
          >
            {buttonName}
          </Button>
        </Item.Group>
      </Item.Content>
    </Item>
  );
};

export default React.memo(UserCard);
