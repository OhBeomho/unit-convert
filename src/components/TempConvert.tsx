import { useEffect, useState } from "react"
import InputStyled from "./Input.styled"
import SelectStyled from "./Select.styled"

type Unit = "celsius" | "kelvin" | "fahrenheit"
const units: Unit[] = ["celsius", "kelvin", "fahrenheit"]
const unitSymbols = ["℃", "℉", "K"]

function ctk(value: number) {
  return value + 273.15
}

function ctf(value: number) {
  return value * 1.8 + 32
}

function ktc(value: number) {
  return value - 273.15
}

function ktf(value: number) {
  return (value - 273.15) * 1.8 + 32
}

function ftc(value: number) {
  return (value - 32) * (5 / 9)
}

function ftk(value: number) {
  return ftc(value) + 273.15
}

const convertFuncs = [
  [
    { to: "kelvin", func: ctk },
    { to: "fahrenheit", func: ctf }
  ],
  [
    { to: "celsius", func: ktc },
    { to: "fahrenheit", func: ktf }
  ],
  [
    { to: "celsius", func: ftc },
    { to: "kelvin", func: ftk }
  ]
]

export default function () {
  const [fromUnit, setFromUnit] = useState<Unit>("celsius")
  const [toUnit, setToUnit] = useState<Unit>("fahrenheit")
  const [value, setValue] = useState(20)
  const [result, setResult] = useState(ctf(20))

  const makeOption = (value: Unit, index: number) => (
    <option key={index} value={value}>
      {value} ({unitSymbols[index]})
    </option>
  )
  const fromOptions = units.map(makeOption)
  const toOptions = units.map(makeOption)

  useEffect(() => {
    if (fromUnit === toUnit) {
      setResult(value)
      return
    }

    const funcIndex = units.indexOf(fromUnit)
    const { func } = convertFuncs[funcIndex].find((data) => data.to === toUnit) || {}

    func && setResult(Math.round(func(value || 0) * 1000) / 1000)
  }, [value, fromUnit, toUnit])

  return (
    <div>
      <p>
        <span>
          From{" "}
          <SelectStyled
            onChange={(e) => setFromUnit(e.target.value as Unit)}
            defaultValue={fromUnit}
          >
            {fromOptions}
          </SelectStyled>
        </span>
        <InputStyled
          type="number"
          id="input"
          onInput={(e) => {
            const target = e.target as HTMLInputElement
            let value = target.value

            if (value.startsWith("0") && value.length >= 2) {
              value = value.replace(/0/g, "")
              target.value = value
            }

            setValue(Number(value) || 0)
          }}
          value={value}
        />
      </p>
      <p>
        <span>
          To{" "}
          <SelectStyled onChange={(e) => setToUnit(e.target.value as Unit)} defaultValue={toUnit}>
            {toOptions}
          </SelectStyled>
        </span>
        <InputStyled type="number" id="output" value={result} disabled />
      </p>
    </div>
  )
}
