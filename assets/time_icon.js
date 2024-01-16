import * as React from "react"
import Svg, { Path } from "react-native-svg"

function TimeIcon(props) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" {...props}>
      <Path
        d="M9 0a9 9 0 109 9 9.01 9.01 0 00-9-9zm4.28 13.655a.749.749 0 01-1.06 0l-3.75-3.75a.747.747 0 01-.22-.53V4.5a.75.75 0 111.5 0v4.565l3.53 3.53a.749.749 0 010 1.06zm0 0"
        fill="#888"
      />
    </Svg>
  )
}

export default TimeIcon