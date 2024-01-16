import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

function EditProfileIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={30}
            height={30}
            viewBox="0 0 40 40"
            {...props}
        >
            <G data-name="Group 43500" transform="translate(-198.5 -165.393)">
                <Circle
                    cx={20}
                    cy={20}
                    r={20}
                    transform="translate(198.5 165.393)"
                    fill="#fff"
                />
                <G data-name="Icons / pencil (1)" transform="translate(208.5 175.393)">
                    <G data-name="pencil (1)" fill="#1579bb">
                        <Path
                            d="M.244.244a.833.833 0 011.1-.069l.079.069 4.166 4.167a.833.833 0 01-1.1 1.248L4.41 5.59.244 1.423a.833.833 0 010-1.179z"
                            transform="translate(.833 .834) translate(10.273 2.226)"
                        />
                        <Path
                            data-name="Path"
                            d="M.012 17.362l.833-5a.828.828 0 01.232-.452L12.256.732a2.5 2.5 0 013.535 0l1.809 1.81a2.5 2.5 0 010 3.535L6.423 17.255a.834.834 0 01-.452.233l-5 .833a.849.849 0 01-.139.012.833.833 0 01-.82-.971z"
                            transform="translate(.833 .834)"
                        />
                    </G>
                    <Path fill="none" d="M0 0H20V20H0z" />
                </G>
            </G>
        </Svg>
    )
}

export default EditProfileIcon
