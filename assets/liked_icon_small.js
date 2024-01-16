import * as React from "react"
import Svg, { Defs, G, Circle, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function LikedIconSmall(props) {
  return (
    <Svg width={45} height={45} viewBox="0 0 53 53" {...props}>
      <Defs></Defs>
      <G filter="url(#a)">
        <Circle
          data-name="Ellipse 11"
          cx={17.5}
          cy={17.5}
          r={17.5}
          transform="translate(9 6)"
          fill={"#6984FF"}
        />
      </G>
      <Path
        data-name="Icon heart"
        d="M15.048 3.245a4.451 4.451 0 00-6.074.443l-.641.661-.641-.661a4.451 4.451 0 00-6.074-.443 4.674 4.674 0 00-.318 6.767l6.3 6.5a1.02 1.02 0 001.475 0l6.3-6.5a4.671 4.671 0 00-.319-6.767z"
        transform="translate(18.001 13.752)"
        fill={"#FFFFFF"}
      />
    </Svg>
  )
}

export default LikedIconSmall