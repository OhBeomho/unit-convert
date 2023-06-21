import styled from "styled-components"

export default styled.button`
  padding: 3px;
  margin: 2px;
  background-color: rgb(240, 240, 240);
  border: 2px solid gray;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 1.5px 0 0 rgba(0, 0, 0, 0.2);
  }

  &:active {
    box-shadow: 0 0 0 1.5px gray;
  }
`
