import styled from "styled-components"

export default styled.input`
  padding: 3px;
  margin: 2px;
  border: 2px solid transparent;
  border-bottom-color: gray;
  transition: all 0.2s;
  outline: none;

  &:focus {
    border-color: gray;
  }

  &:disabled {
    border-color: lightgray;
    color: black;
  }
`
