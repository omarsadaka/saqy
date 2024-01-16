import * as React from "react"
import Svg, { Defs, G, Circle, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function NotificationStatusIcon(props) {
  return (
    <Svg width={52} height={52} viewBox="0 0 52 52" {...props}>
      <Defs></Defs>
      <G data-name="Group 43480">
        <G transform="translate(15 13) translate(-15 -13)" filter="url(#a)">
          <Circle
            data-name="Ellipse 12"
            cx={11}
            cy={11}
            r={11}
            transform="translate(15 13)"
            fill="#42b5d0"
          />
        </G>
        <Path
          d="M7.817 13.333A1.137 1.137 0 008.95 12.2H6.683a1.137 1.137 0 001.134 1.133zm3.683-3.4V6.817a3.647 3.647 0 00-2.833-3.57v-.4a.85.85 0 10-1.7 0v.4a3.647 3.647 0 00-2.833 3.57v3.116L3 11.067v.567h9.633v-.567zm-1.133.567h-5.1V6.817a2.55 2.55 0 115.1 0z"
          transform="translate(15 13) translate(3.467 3.333)"
          fill="#fafafa"
        />
      </G>
    </Svg>
  )
}

export default NotificationStatusIcon