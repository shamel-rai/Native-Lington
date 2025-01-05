import * as React from "react";
import Svg, { Path } from "react-native-svg";

const InterestIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={props.size || 24}
        height={props.size || 24}
        color={props.color || "#000"}
        fill="none"
        {...props}
    >
        {/* Heart Shape (Interest / Passion) */}
        <Path
            d="M12 21C-8 10 6-4 12 4C18-4 32 10 12 21Z"
            stroke="currentColor"
            strokeWidth={props.strokeWidth || 2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />

        {/* Star Shape (Favorite Interest) */}
        <Path
            d="M12 2.5L14.09 8.26L20.18 8.91L15.45 12.97L16.91 19.02L12 15.77L7.09 19.02L8.55 12.97L3.82 8.91L9.91 8.26L12 2.5Z"
            stroke="currentColor"
            strokeWidth={props.strokeWidth || 2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />

        {/* Circle (Interest Focus) */}
        <Path
            d="M12 15.5C15.0376 15.5 17.5 13.0376 17.5 10C17.5 6.96243 15.0376 4.5 12 4.5C8.96243 4.5 6.5 6.96243 6.5 10C6.5 13.0376 8.96243 15.5 12 15.5Z"
            stroke="currentColor"
            strokeWidth={props.strokeWidth || 2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default InterestIcon;
