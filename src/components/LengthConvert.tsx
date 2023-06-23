import { useEffect, useState } from "react"
import SelectStyled from "./Select.styled"
import InputStyled from "./Input.styled"

type Metric = "mm" | "cm" | "m" | "km"
type Imperial = "in" | "ft" | "yd" | "mi"
type Unit = Metric | Imperial

const metricUnits: Unit[] = ["mm", "cm", "m", "km"]
const metricChanges = [10, 100, 1000]
const imperialUnits: Unit[] = ["in", "ft", "yd", "mi"]
const imperialChanges = [12, 3, 1760]
const units: Unit[] = [...metricUnits, ...imperialUnits]

function toFeet(value: number, unit: Metric) {
  if (unit === "mm") value /= 10 * 100
  else if (unit === "cm") value /= 100
  else if (unit === "km") value *= 1000

  return value * 3.28
}

function toMeters(value: number, unit: Imperial) {
  if (unit === "in") value /= 12
  else if (unit === "yd") value *= 3
  else if (unit === "mi") value *= 3 * 1760

  return value / 3.28
}

export default function () {
  const [fromUnit, setFromUnit] = useState<Unit>("m")
  const [toUnit, setToUnit] = useState<Unit>("ft")
  const [value, setValue] = useState(10)
  const [result, setResult] = useState(toFeet(value, "m"))

  const makeOption = (value: Unit, index: number) => <option key={index}>{value}</option>
  const fromOptions = units.map(makeOption)
  const toOptions = units.map(makeOption)

  useEffect(() => {
    if (fromUnit === toUnit) {
      setResult(value)
      return
    }

    let result
    const isMetric = (unit: Unit) => metricUnits.includes(unit)
    const fromList = isMetric(fromUnit) ? metricUnits : imperialUnits
    const toList = isMetric(toUnit) ? metricUnits : imperialUnits

    if (fromList === toList) {
      const fromIndex = fromList.indexOf(fromUnit)
      const toIndex = toList.indexOf(toUnit)
      const changeList = isMetric(fromUnit) ? metricChanges : imperialChanges

      let changes
      let change = 1

      if (fromIndex < toIndex) {
        changes = changeList.slice(fromIndex, toIndex)
        for (let c of changes) change /= c
      } else {
        changes = changeList.slice(toIndex, fromIndex)
        for (let c of changes) change *= c
      }

      result = value * change
    } else {
      if (metricUnits.includes(fromUnit)) {
        result = toFeet(value, fromUnit as Metric)

        if (toUnit === "in") result *= 12
        else if (toUnit === "yd") result /= 3
        else if (toUnit === "mi") result /= 3 * 1760
      } else {
        result = toMeters(value, fromUnit as Imperial)

        if (toUnit === "mm") result *= 10 * 100
        else if (toUnit === "cm") result *= 100
        else if (toUnit === "km") result /= 1000
      }
    }

    setResult(Math.round(result * 1000) / 1000)
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
          value={value}
          onInput={(e) => {
            const target = e.target as HTMLInputElement
            let value = target.value

            if (value.startsWith("0") && value.length >= 2) {
              value = value.replace(/0/g, "")
              target.value = value
            }

            setValue(Number(value) || 0)
          }}
        />
      </p>
      <p>
        <span>
          To{" "}
          <SelectStyled onChange={(e) => setToUnit(e.target.value as Unit)} defaultValue={toUnit}>
            {toOptions}
          </SelectStyled>
        </span>
        <InputStyled value={result} disabled />
      </p>
    </div>
  )
}
