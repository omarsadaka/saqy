import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function ForwardIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={27}
      viewBox="0 0 22 27"
      {...props}
    >
      <G data-name="icons/dark/next" transform="translate(.026 .479)">
        <Path
          transform="translate(-.026 -.479)"
          fill="none"
          d="M0 0H22V27H0z"
        />
        <Path
          d="M5.7.243L.274 6.788a.749.749 0 00-.074.077.969.969 0 000 1.182.748.748 0 00.073.077L5.7 14.67a.607.607 0 00.97 0 .953.953 0 000-1.171L1.66 7.456l5.007-6.043a.952.952 0 000-1.17.606.606 0 00-.97 0z"
          transform="translate(6.839 5.773)"
        />
      </G>
    </Svg>
  )
}

export default ForwardIcon
