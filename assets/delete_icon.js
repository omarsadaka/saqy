import * as React from "react"
import Svg, { Path } from "react-native-svg"

function DeleteIcon(props) {
  return (
    <Svg width={15.573} height={20} viewBox="0 0 15.573 20" {...props}>
      <Path
        d="M1.094 17.761V4.427h13.333v13.334a2.16 2.16 0 01-.651 1.588 2.1 2.1 0 01-1.537.651H3.333a2.16 2.16 0 01-1.588-.651 2.164 2.164 0 01-.651-1.588zM15.573 1.094v2.239H0V1.094h3.906L5 0h5.573l1.094 1.094z"
        fill="#fafafa"
      />
    </Svg>
  )
}

export default DeleteIcon