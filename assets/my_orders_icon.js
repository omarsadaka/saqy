import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MyOrdersIcon(props, { fill }) {
    return (
        <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
            <Path data-name="Path 4322" d="M0 0h24v24H0z" fill="none" />
            <Path
                data-name="Path 4323"
                d="M7 18a2 2 0 102 2 2 2 0 00-2-2zM1 2v2h2l3.6 7.59-1.35 2.45A1.933 1.933 0 005 15a2.006 2.006 0 002 2h12v-2H7.42a.248.248 0 01-.25-.25l.03-.12.9-1.63h7.45a1.991 1.991 0 001.75-1.03l3.58-6.49A.977.977 0 0021 5a1 1 0 00-1-1H5.21l-.94-2H1zm16 16a2 2 0 102 2 2 2 0 00-2-2z"
                fill={fill}
            />
        </Svg>
    )
}

export default MyOrdersIcon