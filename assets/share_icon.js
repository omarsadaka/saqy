import * as React from "react"
import Svg, { Defs, G, Circle, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function ShareIcon(props) {
    return (
        <Svg width={53} height={53} viewBox="0 0 53 53" {...props}>
            <Defs></Defs>
            <G data-name="Group 3940">
                <G transform="translate(-559 -124) translate(559 124)" filter="url(#a)">
                    <Circle
                        data-name="Ellipse 11"
                        cx={17.5}
                        cy={17.5}
                        r={17.5}
                        transform="translate(9 6)"
                        fill="#fff"
                    />
                </G>
                <Path
                    data-name="Icon awesome-share-alt"
                    d="M9.494 8.631a2.578 2.578 0 00-1.613.564L5.117 7.467a2.6 2.6 0 000-1.124l2.765-1.728a2.585 2.585 0 10-.915-1.464L4.2 4.879a2.589 2.589 0 100 4.052l2.764 1.728a2.59 2.59 0 102.53-2.028z"
                    transform="translate(-559 -124) translate(579.182 140.595)"
                    fill="#adb5bd"
                />
            </G>
        </Svg>
    )
}

export default ShareIcon