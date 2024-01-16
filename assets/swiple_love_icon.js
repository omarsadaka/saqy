import * as React from "react"
import Svg, { Defs, G, Circle, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SwipleLoveIcon(props) {
  return (
    <Svg width={121} height={121} viewBox="0 0 121 121" {...props}>
      <Defs></Defs>
      <G data-name="Group 43535">
        <G
          transform="translate(44.969 35) translate(-44.97 -35)"
          filter="url(#a)"
        >
          <Circle
            data-name="Ellipse 11"
            cx={15.5}
            cy={15.5}
            r={15.5}
            transform="translate(45 35)"
            fill="#6984ff"
          />
        </G>
        <Path
          data-name="Icon heart"
          d="M13.582 3.148a4.018 4.018 0 00-5.482.4l-.579.6-.579-.6a4.018 4.018 0 00-5.482-.4 4.219 4.219 0 00-.291 6.108l5.685 5.87a.921.921 0 001.331 0l5.685-5.87a4.216 4.216 0 00-.288-6.108z"
          transform="translate(44.969 35) translate(8.159 5.547)"
          fill="#fafafa"
        />
      </G>
    </Svg>
  )
}

export default SwipleLoveIcon