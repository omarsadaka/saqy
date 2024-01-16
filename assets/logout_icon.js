import * as React from "react"
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  G,
  Rect,
  Path
} from "react-native-svg"

function LogoutIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={36}
      height={36}
      viewBox="0 0 36 36"
      {...props}
    >
      <Defs>
        <LinearGradient
          id="a"
          x1={0.5}
          x2={0.5}
          y2={1}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#42b5d0" />
          <Stop offset={1} stopColor="#1579bb" />
        </LinearGradient>
      </Defs>
      <G data-name="Group 9905" transform="translate(-351 -442)">
        <Rect
          data-name="Rectangle 4157"
          width={36}
          height={36}
          rx={7}
          transform="translate(351 442)"
          fill="url(#a)"
        />
        <G
          data-name="Group 696"
          transform="rotate(-90 414.695 335.995) translate(282 281.3)"
          stroke="#fff"
          strokeWidth={0.5}
          fill="url(#a)"
        >
          <Path
            data-name="Path 2828"
            d="M296.6 300.652h-12.514a2.066 2.066 0 01-2.086-2.086v-9.18a2.066 2.066 0 012.086-2.086h3.338a.417.417 0 110 .835h-3.338a1.283 1.283 0 00-1.252 1.252v9.18a1.283 1.283 0 001.252 1.252H296.6a1.283 1.283 0 001.252-1.252v-9.18a1.283 1.283 0 00-1.252-1.252h-3.338a.417.417 0 110-.835h3.338a2.066 2.066 0 012.086 2.086v9.18a2.12 2.12 0 01-2.086 2.086z"
            transform="translate(-282 -282.293)"
          />
          <G data-name="Group 9865">
            <Path
              d="M292.335 291.732a.394.394 0 01-.417.417h0a.394.394 0 01-.417-.417v-10.015a.394.394 0 01.417-.417h0a.394.394 0 01.417.417z"
              transform="translate(-283.572 -281.3)"
            />
            <Path
              data-name="Path 2829"
              d="M293.782 283.325l-1.753-1.753a1.544 1.544 0 00-1 0l-1.752 1.753a.413.413 0 10.584.584l1.669-1.669 1.669 1.669a.413.413 0 10.584-.584z"
              transform="translate(-283.183 -281.322)"
            />
          </G>
        </G>
      </G>
    </Svg>
  )
}

export default LogoutIcon
