import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { useState } from 'react';

export default function Home() {
  const [decimalValue, setDecimalValue] = useState(null)
  const [redValue, setRedValue] = useState(null)
  const [greenValue, setGreenValue] = useState(null)
  const [blueValue, setBlueValue] = useState(null)
  const [hexValue, setHexValue] = useState(null)

  const decimalToHex = (decimal) => {
    return decimal.toString(16).padStart(2, '0')
  }

  const hexToDecimal = (hex) => {
    return parseInt(hex, 16)
  }

  const isHexColor = hex => typeof hex === 'string' && hex.length === 7 &&  hex.startsWith('#')
  const isNumeric = val => typeof val === 'string' && /^\d+$/.test(val)

  const changeColorValue = (e) => {
    const value = e.target.value
    if (isHexColor(value)) {
      changeHexValue(value)
    }
    else if (isNumeric(value)) {
      changeDecimalValue(value)
    }
    else {
      setDecimalValue(null)
      setHexValue(null)
      setRedValue(null)
      setGreenValue(null)
      setBlueValue(null)
    }
  }

  const changeDecimalValue = (val) => {
    setDecimalValue(val)

    setRedValue(val & 0xFF)
    setGreenValue(val >> 8 & 0xFF)
    setBlueValue(val >> 16 & 0xFF)

    const hexColor = `#${decimalToHex(val & 0xFF)}${decimalToHex(val >> 8 & 0xFF)}${decimalToHex(val >> 16 & 0xFF)}`
    setHexValue(hexColor)

    document.getElementById("color-preview").style.backgroundColor = hexColor;
  }

  const changeHexValue = (val) => {
    setHexValue(val)

    const red = hexToDecimal(val.substring(1, 3))
    const green = hexToDecimal(val.substring(3, 5))
    const blue = hexToDecimal(val.substring(5))

    setRedValue(red)
    setGreenValue(green)
    setBlueValue(blue)

    const decimalColor = 1
    decimalColor <<= 8
    decimalColor += blue
    decimalColor <<= 8
    decimalColor += green
    decimalColor <<= 8
    decimalColor += red
    setDecimalValue(decimalColor)

    document.getElementById("color-preview").style.backgroundColor = val;
  }

  return (
    <div className="main-container">
      <Head>
        <title>Gran Turismo Colors</title>
        <link rel="icon" href="/favicon.ico" />
        // Responsive meta tag
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        //  bootstrap CDN
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossorigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
          crossorigin="anonymous"></script>
      </Head>

      <main>
        <Header title="Gran Turismo Colors" />

        <div className="row">
          <div className="col">
            <div className="container">
              <div className="row">
                <div class="form-floating mb-3">
                  <input id="floatingInput" className="form-control" type="text" onChange={changeColorValue} />
                  <label for="floatingInput">Hex or Dec color</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-auto">
            <div className="container">
              <div className="row">
                <p className="red-value">
                  R: {redValue} G: {greenValue} B: {blueValue} | Hex: {hexValue} | Dec: {decimalValue}
                </p>
              </div>
              <div className="row">
                <div id="color-preview" className="col color-preview"></div>
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}
