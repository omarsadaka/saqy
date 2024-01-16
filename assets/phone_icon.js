import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PhoneIcon(props) {
    return (
        <Svg width={13} height={22} viewBox="0 0 13 22" {...props}>
            <Path
                data-name="Path 3781"
                d="M15.5 1h-8A2.5 2.5 0 005 3.5v17A2.5 2.5 0 007.5 23h8a2.5 2.5 0 002.5-2.5v-17A2.5 2.5 0 0015.5 1zm-4 21a1.5 1.5 0 111.5-1.5 1.5 1.5 0 01-1.5 1.5zm4.5-4H7V4h9z"
                transform="translate(-5 -1)"
                fill="#363636"
            />
        </Svg>
    )
}

export default PhoneIcon