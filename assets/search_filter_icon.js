import * as React from "react"
import Svg, { G, Path, Circle, Rect } from "react-native-svg"

function SearchFilterIcon(props) {
  return (
    <Svg width={55} height={38} viewBox="0 0 55 38" {...props}>
      <G data-name="Group 3963" stroke="#42b5d0">
        <G data-name="Group 35" strokeWidth={1.5}>
          <Path
            data-name="Path 4"
            d="M307.941 78.441v15.255"
            fill="none"
            strokeLinecap="round"
            transform="translate(-16 -207) translate(-271.5 140)"
          />
          <Path
            data-name="Path 5"
            d="M314.653 78.441v15.255"
            fill="none"
            strokeLinecap="round"
            transform="translate(-16 -207) translate(-271.5 140)"
          />
          <Path
            data-name="Path 6"
            d="M321.365 78.441v15.255"
            fill="none"
            strokeLinecap="round"
            transform="translate(-16 -207) translate(-271.5 140)"
          />
          <G
            data-name="Ellipse 16"
            transform="translate(-16 -207) translate(-271.5 140) translate(305.5 83.933)"
            fill="#fff"
          >
            <Circle cx={2.441} cy={2.441} r={2.441} stroke="none" />
            <Circle cx={2.441} cy={2.441} r={1.691} fill="none" />
          </G>
          <G
            data-name="Ellipse 17"
            transform="translate(-16 -207) translate(-271.5 140) translate(312.212 76)"
            fill="#fff"
          >
            <Circle cx={2.441} cy={2.441} r={2.441} stroke="none" />
            <Circle cx={2.441} cy={2.441} r={1.691} fill="none" />
          </G>
          <G
            data-name="Ellipse 18"
            transform="translate(-16 -207) translate(-271.5 140) translate(318.924 91.255)"
            fill="#fff"
          >
            <Circle cx={2.441} cy={2.441} r={2.441} stroke="none" />
            <Circle cx={2.441} cy={2.441} r={1.691} fill="none" />
          </G>
        </G>
        <G
          data-name="Rectangle 1208"
          transform="translate(-16 -207) translate(16 207)"
          fill="none"
          strokeWidth={1}
        >
          <Rect width={55} height={38} rx={5} stroke="none" />
          <Rect x={0.5} y={0.5} width={54} height={37} rx={4.5} />
        </G>
      </G>
    </Svg>
  )
}

export default SearchFilterIcon