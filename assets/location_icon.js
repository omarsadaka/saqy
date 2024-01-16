import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LocationIcon(props) {
  return (
    <Svg
      data-name="favourite icon"
      width={18.766}
      height={18.766}
      viewBox="0 0 18.766 18.766"
      {...props}
    >
      <Path
        data-name="Path 2427"
        d="M9.383 0A9.383 9.383 0 110 9.383 9.383 9.383 0 019.383 0z"
        fill="#233b5d"
        opacity={0.2}
      />
      <Path
        data-name="Path 2428"
        d="M13.649 4A3.65 3.65 0 0010 7.649c0 2.737 3.649 6.777 3.649 6.777s3.651-4.04 3.651-6.777A3.65 3.65 0 0013.649 4zm0 4.952a1.3 1.3 0 111.3-1.3 1.3 1.3 0 01-1.3 1.3z"
        transform="translate(-4.266 .909)"
        fill="#233b5d"
      />
    </Svg>
  )
}

export default LocationIcon