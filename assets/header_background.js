import * as React from "react";
import { Dimensions } from 'react-native';
import Svg, {
    Defs,
    LinearGradient,
    Stop,
    G,
    Path,
    Ellipse
} from "react-native-svg";

const { width, height } = Dimensions.get('window');

function HeaderBackground(props) {
    return (
        <Svg width={width} height={width} viewBox="0 0 375 207.261" {...props}>
            <Defs>
                <LinearGradient
                    id="a"
                    x1={1.534}
                    y1={-3.094}
                    x2={0.438}
                    y2={0.781}
                    gradientUnits="objectBoundingBox"
                >
                    <Stop offset={0} stopColor="#cce8ed" />
                    <Stop offset={0.46} stopColor="#88c9de" />
                    <Stop offset={1} stopColor="#5293ca" />
                </LinearGradient>
                <LinearGradient
                    id="b"
                    x1={0.46}
                    y1={0.559}
                    x2={-0.263}
                    y2={1.994}
                    xlinkHref="#a"
                />
                <LinearGradient
                    id="c"
                    x1={1.17}
                    y1={-0.103}
                    x2={0.079}
                    y2={0.936}
                    xlinkHref="#a"
                />
                <LinearGradient
                    id="d"
                    x1={-0.551}
                    y1={-6.083}
                    x2={1.263}
                    y2={5.244}
                    xlinkHref="#a"
                />
                <LinearGradient
                    id="e"
                    x1={0.806}
                    y1={-1.366}
                    x2={-1.111}
                    y2={12.111}
                    xlinkHref="#a"
                />
                <LinearGradient
                    id="f"
                    x1={0.782}
                    y1={-0.185}
                    x2={0.161}
                    y2={1.013}
                    xlinkHref="#a"
                />
                <LinearGradient
                    id="g"
                    x1={-1.201}
                    y1={-0.453}
                    x2={1.81}
                    y2={1.217}
                    xlinkHref="#a"
                />
                <LinearGradient
                    id="h"
                    x1={0.737}
                    y1={0.14}
                    x2={-0.279}
                    y2={1.968}
                    xlinkHref="#a"
                />
                <LinearGradient
                    id="i"
                    x1={-0.94}
                    y1={4.999}
                    x2={-4.983}
                    y2={17.881}
                    xlinkHref="#a"
                />
                <LinearGradient
                    id="j"
                    x1={1.854}
                    y1={-1.926}
                    x2={0.084}
                    y2={1.333}
                    xlinkHref="#a"
                />
                <LinearGradient
                    id="k"
                    x1={-1.002}
                    y1={-0.471}
                    x2={10.027}
                    y2={6.663}
                    xlinkHref="#a"
                />
                <LinearGradient
                    id="l"
                    x1={-3.853}
                    y1={-1.194}
                    x2={5.948}
                    y2={2.507}
                    xlinkHref="#a"
                />
                <LinearGradient
                    id="m"
                    x1={0.237}
                    y1={-0.156}
                    x2={0.824}
                    y2={1.197}
                    gradientUnits="objectBoundingBox"
                >
                    <Stop offset={0} stopColor="#1579bb" />
                    <Stop offset={0.523} stopColor="#1579bb" stopOpacity={0.769} />
                    <Stop offset={1} stopColor="#42b5d0" />
                </LinearGradient>
            </Defs>
            <G data-name="Group 43641" transform="translate(390 247.983)">
                <G data-name="Layer 2">
                    <G
                        data-name="Layer 1"
                        transform="rotate(-57 -279.767 243.208)"
                        opacity={0.5}
                    >
                        <Path
                            data-name="Path 44"
                            d="M5.137.067c8.283-1 11.585 9.327 26.076 22.393s40.92 19.529 40.92 19.529-33.526 1.044-54.367-10.963S-3.131 1.069 5.137.067z"
                            transform="translate(11.813 124.625)"
                            fill="url(#a)"
                        />
                        <Path
                            data-name="Path 45"
                            d="M47.849 7.365C70.425 18.922 75.068 41 66.474 42.345c-8.89 1.411-6.138-13.49-17.215-23.988C36.715 6.533 21.73.536 0 1.256c.042.056 25.272-5.433 47.849 6.109z"
                            transform="translate(90.452 30.279)"
                            fill="url(#b)"
                        />
                        <Path
                            data-name="Path 46"
                            d="M16 37.024c.381-.564 9.68-10.71 21.9-14.209 13.983-4.007 27.769-2.371 28.291-12.7S33.7-2.528 16 37.024zm8.071 21.928c-20.471 39.932-4.232 78.51 26.247 97.742C20.573 144.263-19.529 92.971 10.809 34.4 31.353-5.322 67.815-7.057 72.3 11.074c2.782 21.688-26.244 7.013-48.228 47.877z"
                            transform="translate(15.455)"
                            fill="url(#c)"
                        />
                        <Path
                            data-name="Path 47"
                            d="M8 .013a8.466 8.466 0 11-5.867 2.835A8.466 8.466 0 018 .013z"
                            transform="translate(0 105.39)"
                            fill="url(#d)"
                        />
                        <Path
                            data-name="Path 48"
                            d="M34.9 11.761c5.052 2.159 10.117-7.3 2.3-10.16C26.358-2.448 11.9 1.348 0 11.112c0 0 20.15-5.644 34.9.649z"
                            transform="translate(88.773 10.912)"
                            fill="url(#e)"
                        />
                        <Path
                            data-name="Path 49"
                            d="M125.69 33.371c7.747 19.515-13.814 32.666-24.75 17.836s-34.9-30.1-62.185-17.271C-1.784 53-3.815 123.071 77.489 135.4c-18.061 2.681-56.442-3.33-72.6-41.725C-13.594 42.656 23.94 5.771 57.015.818c35.262-5.277 62.142 16.072 68.675 32.553zm-6.872 11.994c7.591-1.411 4.318-22.817-18.344-34.359S51.766 4.445 51.766 4.445c21.73-.72 36.222 4.332 49.683 17.031C112.6 31.9 109.943 47 118.818 45.365z"
                            transform="translate(38.234 27.217)"
                            fill="url(#f)"
                        />
                        <Path
                            data-name="Path 50"
                            d="M1.243.116c5.531-.988 5.207 4.445 8.466 11.8a26.641 26.641 0 0011.486 12.809C5.024 21.31-3.329.949 1.243.116z"
                            transform="translate(14.748 130.573)"
                            fill="url(#g)"
                        />
                        <Path
                            data-name="Path 51"
                            d="M50.191 6.416c-.522 10.258-14.308 8.621-28.291 12.7C9.68 22.615.381 32.761 0 33.325 17.694-6.3 50.727-3.771 50.191 6.416z"
                            transform="translate(31.456 3.769)"
                            fill="url(#h)"
                        />
                        <Path
                            data-name="Path 52"
                            d="M8.847.875c2.554.621 4.233 1.693 3.64 3.076-.734 1.707-2.441.31-4.854-1.411S0 0 0 0a44.18 44.18 0 018.847.875z"
                            transform="translate(113.931 12.965)"
                            fill="url(#i)"
                        />
                        <Path
                            data-name="Path 53"
                            d="M7.072.007C20.293.7 8.976 16.757 20.053 33.6s24.623 16.119 24.623 16.119c.409-.127-20.912 3.4-34.7-13.08C-4.132 19.762-1.55-.444 7.072.007z"
                            transform="translate(58.137 99.85)"
                            fill="url(#j)"
                        />
                        <Ellipse
                            data-name="Ellipse 6"
                            cx={2.893}
                            cy={2.893}
                            rx={2.893}
                            ry={2.893}
                            transform="translate(2.798 110.2)"
                            fill="url(#k)"
                        />
                        <Path
                            data-name="Path 54"
                            d="M5.641 2.107c.564 1.919-4.148 4.12-2.822 16.933 0 0-3.33-8.043-2.752-14.421C.321 1.7 1.281.385 2.523.131a2.356 2.356 0 013.118 1.976z"
                            transform="translate(59.835 103.875)"
                            fill="url(#l)"
                        />
                    </G>
                </G>
                <Path
                    transform="translate(-390 -231.722)"
                    fill="url(#m)"
                    d="M0 0H375V191H0z"
                />
            </G>
        </Svg>
    )
}

export default HeaderBackground