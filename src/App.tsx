import { useState } from "react"
import Layout from "./components/Layout"
import TempConvert from "./components/TempConvert"
import LengthConvert from "./components/LengthConvert"
import ButtonStyled from "./components/Button.styled"

export default function () {
  const [isTemp, setTemp] = useState(true)

  return (
    <Layout>
      <h1>Unit Converter</h1>
      <ButtonStyled onClick={() => setTemp((old) => !old)}>
        {isTemp ? "Convert Length Units" : "Convert Temperature Units"}
      </ButtonStyled>
      {isTemp ? <TempConvert /> : <LengthConvert />}
    </Layout>
  )
}
