import * as React from "react"
import Svg, { Defs, ClipPath, Path, G, Ellipse, Rect } from "react-native-svg"

function SearchIcon(props) {
  return (
    <Svg width={21.957} height={21.223} viewBox="0 0 21.957 21.223" {...props}>
      <Defs>
        <ClipPath id="a">
          <Path fill="none" d="M0 0H21.255V20.494H0z" />
        </ClipPath>
      </Defs>
      <G
        data-name="Component 1"
        transform="rotate(-2 21.194 .371)"
        opacity={0.77}
        clipPath="url(#a)"
      >
        <G data-name="Ellipse 14" fill="none" stroke="#363636" strokeWidth={2}>
          <Ellipse cx={9.727} cy={9.597} rx={9.727} ry={9.597} stroke="none" />
          <Ellipse cx={9.727} cy={9.597} rx={8.727} ry={8.597} />
        </G>
        <Rect
          data-name="Rectangle 40"
          width={5}
          height={2}
          rx={0.5}
          transform="rotate(45 -9.904 29.16)"
          fill="#212121"
        />
      </G>
    </Svg>
  )
}

export default SearchIcon