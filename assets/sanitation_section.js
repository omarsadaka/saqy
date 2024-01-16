import * as React from "react"
import Svg, {
    Defs,
    ClipPath,
    Path,
    LinearGradient,
    Stop,
    G,
    Image
} from "react-native-svg"


function SanitationSection(props) {
    return (
        <Svg width={379} height={156} viewBox="0 0 379 156" {...props}>
            <Defs>
                <ClipPath id="a">
                    <Path
                        data-name="Path 4465"
                        d="M466.446 609.893H715.47v98.113l-182.383-.136-62.412.13-21.37-.371-10.892-1.029-5.241-.367-6.253-.765S318.836 702.1 338.97 572.443c-2.52-8.05-3.643-25.525 3.834-18.935 13.06 11.511 49.531 56.385 123.642 56.385z"
                        transform="translate(-336.47 -552.053)"
                        fill="#888"
                    />
                </ClipPath>
                <LinearGradient
                    id="b"
                    x2={1}
                    y2={0.834}
                    gradientUnits="objectBoundingBox"
                >
                    <Stop offset={0} stopColor="#075e04" />
                    <Stop offset={1} stopColor="#57efc6" />
                </LinearGradient>
            </Defs>
            <G data-name="Group 43652">
                <G
                    data-name="Mask Group 11"
                    transform="translate(246.819 -680.489) translate(-246.819 680.536)"
                    clipPath="url(#a)"
                >
                    <Path
                        data-name="Path 4464"
                        d="M466.446 609.893H715.47v98.113l-182.383-.136-62.412.13-21.37-.371-10.892-1.029-5.241-.367-6.253-.765S318.836 702.1 338.97 572.443c-2.52-8.05-3.643-25.525 3.834-18.935 13.06 11.511 49.531 56.385 123.642 56.385z"
                        transform="translate(-336.47 -552.092)"
                        fill="#888"
                    />
                    <Image
                        data-name="pngegg (7)"
                        width={98.93}
                        height={90.741}
                        transform="translate(69.8 56.309)"
                    />
                </G>
                <Path
                    data-name="Path 4470"
                    d="M466.446 609.893H715.47v98.113l-182.383-.136-62.412.13-21.37-.371-10.892-1.029-5.241-.367-6.253-.765S318.836 702.1 338.97 572.443c-2.52-8.05-3.643-25.525 3.834-18.935 13.06 11.511 49.53 56.385 123.642 56.385z"
                    transform="translate(246.819 -680.489) translate(-583.289 128.436)"
                    fill="url(#b)"
                    style={{ mixBlendMode: "overlay", isolation: "isolate" }}
                />
            </G>
        </Svg>
    )
}


export default SanitationSection