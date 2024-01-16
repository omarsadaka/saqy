import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ProfileIcon(props, { fill }) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path data-name="Path 4320" d="M0 0h24v24H0z" fill="none" />
            <Path
                data-name="Path 4321"
                d="M12 12a4 4 0 10-4-4 4 4 0 004 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                fill={fill}
            />
        </Svg>
    )
}

export default ProfileIcon