import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HomeIcon(props, { fill }) {
    return (
        <Svg width={20} height={17} viewBox="0 0 20 17" {...props}>
            <Path
                data-name="Path 4319"
                d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
                transform="translate(-2 -3)"
                fill={fill}
            />
        </Svg>
    )
}

export default HomeIcon