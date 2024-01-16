import * as React from "react"
import Svg, { G, Path, Circle } from "react-native-svg"

function FilterIcon(props) {
  return (
    <Svg width={18.306} height={20.136} viewBox="0 0 18.306 20.136" {...props}>
      <G data-name="Group 35" stroke="#000" strokeWidth={1.5}>
        <Path
          data-name="Path 4"
          d="M307.941 78.441v15.255"
          fill="none"
          strokeLinecap="round"
          transform="translate(-305.5 -76)"
        />
        <Path
          data-name="Path 5"
          d="M314.653 78.441v15.255"
          fill="none"
          strokeLinecap="round"
          transform="translate(-305.5 -76)"
        />
        <Path
          data-name="Path 6"
          d="M321.365 78.441v15.255"
          fill="none"
          strokeLinecap="round"
          transform="translate(-305.5 -76)"
        />
        <G
          data-name="Ellipse 16"
          transform="translate(-305.5 -76) translate(305.5 83.933)"
          fill="#fff"
        >
          <Circle cx={2.441} cy={2.441} r={2.441} stroke="none" />
          <Circle cx={2.441} cy={2.441} r={1.691} fill="none" />
        </G>
        <G
          data-name="Ellipse 17"
          transform="translate(-305.5 -76) translate(312.212 76)"
          fill="#fff"
        >
          <Circle cx={2.441} cy={2.441} r={2.441} stroke="none" />
          <Circle cx={2.441} cy={2.441} r={1.691} fill="none" />
        </G>
        <G
          data-name="Ellipse 18"
          transform="translate(-305.5 -76) translate(318.924 91.255)"
          fill="#fff"
        >
          <Circle cx={2.441} cy={2.441} r={2.441} stroke="none" />
          <Circle cx={2.441} cy={2.441} r={1.691} fill="none" />
        </G>
      </G>
    </Svg>
  )
}

export default FilterIcon