import * as React from "react"
import Svg, { Path } from "react-native-svg"

function NotificationsIcon(props, { fill }) {
  return (
    <Svg width={16} height={19.5} viewBox="0 0 16 19.5" {...props}>
      <Path
        d="M12 22a2.006 2.006 0 002-2h-4a2 2 0 002 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4a1.5 1.5 0 00-3 0v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1z"
        transform="translate(-4 -2.5)"
        fill={fill}
      />
    </Svg>
  )
}

export default NotificationsIcon