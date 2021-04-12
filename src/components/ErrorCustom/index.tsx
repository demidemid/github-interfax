import React from "react"
import { Message, Segment } from "semantic-ui-react"

const ErrorCustom = ({errorText = ``}) => {
  return (
    <Segment
        padded="very"
        textAlign="center"
        style={{
          position: "relative",
          maxWidth: "1000px",
          margin: "0 auto",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center"
        }}
      >
        <Message negative>
          <Message.Header>{errorText}</Message.Header>
        </Message>
      </Segment>
  )
}

export default ErrorCustom;