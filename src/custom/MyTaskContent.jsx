import React from "react";

const MyComponent = ({ data }) => {
	return (
		<>
			{data.type === "milestone" ? (
				<span style={{ "margin-left": "40px" }}>{data.text || ""}</span>
			) : (
				<span style={{ "color":"yellow" }}>Custom: {data.text || ""}</span>
			)}
		</>
	);
};

export default MyComponent;