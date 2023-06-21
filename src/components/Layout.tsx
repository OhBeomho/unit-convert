import { PropsWithChildren } from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Navbar = styled.nav`
  padding: 10px;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.15);
`

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Footer = styled.footer`
  text-align: center;
  padding: 10px;
  background-color: lightgray;
  color: gray;
`

export default function ({ children }: PropsWithChildren) {
  return (
    <Wrapper>
      <header>
        <Navbar>
          <a href="/" style={{ fontSize: 25, color: "black" }}>
            Unit Converter
          </a>
        </Navbar>
      </header>
      <Main>{children}</Main>
      <Footer>
        Made by <a href="https://github.com/OhBeomho">OhBeomho</a><br />
        Source on <a href="https://github.com/OhBeomho/unit-convert">GitHub</a>
      </Footer>
    </Wrapper>
  )
}
