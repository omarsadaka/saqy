import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BackBtn(props, { fill }) {
  return (
    <Svg width={12.033} height={21.033} viewBox="0 0 12.033 21.033" {...props}>
      <Path
        d="M3.621 10.533l7.939-7.939a1.427 1.427 0 000-2.121 1.427 1.427 0 00-2.121 0l-9 9a1.5 1.5 0 000 2.121l9 9a1.5 1.5 0 102.121-2.121z"
        transform="rotate(180 6.016 10.517)"
        fill={fill}
      />
    </Svg>
  )
}

export default BackBtn