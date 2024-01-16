import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function CartIcon(props) {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" {...props}>
      <G data-name="shopping-cart" fill="#fafafa">
        <Path
          d="M1.952 0A1.952 1.952 0 103.9 1.952 1.952 1.952 0 001.952 0z"
          transform="translate(3.81 18.095)"
        />
        <Path
          data-name="Oval"
          d="M1.952 0A1.952 1.952 0 103.9 1.952 1.952 1.952 0 001.952 0z"
          transform="translate(17.143 18.095)"
        />
        <Path d="M5.762 16.285a1 1 0 01-.969-.755l-.022-.113L2.981 2H1a1 1 0 01-.994-.883L0 1A1 1 0 01.884.006L1 0h2.857a1 1 0 01.969.755l.022.113.518 3.893H21a1 1 0 011 1.081l-.016.115-1.905 9.524a1 1 0 01-.862.8l-.118.006z" />
      </G>
    </Svg>
  )
}

export default CartIcon