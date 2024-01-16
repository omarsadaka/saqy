import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Calendar(props) {
  return (
    <Svg width={17} height={17} viewBox="0 0 17 17" {...props}>
      <Path
        data-name="Path 4335"
        d="M4.25.531a.531.531 0 10-1.062 0v.531H2.125A2.125 2.125 0 000 3.188V4.25h17V3.188a2.125 2.125 0 00-2.125-2.125h-1.062V.531a.531.531 0 10-1.062 0v.531H4.25zM0 5.313h17v9.563A2.125 2.125 0 0114.875 17H2.125A2.125 2.125 0 010 14.875zm11.916 3.033a.455.455 0 11.415-.219.451.451 0 01-.415.219zm.357.6v4.362h-.714V8.944h.714zm-7.3 4.362v-2.446h2.4v-.648h-2.4V8.288h2.622V7.64H4.25v5.665zm3.5 0H9.2V10.6c0-.589.242-1.07 1.012-1.07a2.907 2.907 0 01.35.016V8.9a1.919 1.919 0 00-.27-.021 1.139 1.139 0 00-1.075.6h-.024v-.535h-.714v4.362z"
        fill="#888"
        fillRule="evenodd"
      />
    </Svg>
  )
}

export default Calendar