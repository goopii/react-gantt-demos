import { useRef } from 'react';
import { getData } from "../data";
import { Gantt, Tooltip } from "../../src/";
import MyTooltipContent from "../custom/MyTooltipContent.jsx";

export default function MyComponent({ skinSettings }) {
	const apiRef = useRef();
	const data = getData();

	return (
		<Tooltip api={apiRef} content={MyTooltipContent}>
			<Gantt
				{...skinSettings}
				tasks={data.tasks}
				links={data.links}
				scales={data.scales}
				api={apiRef}
			/>
		</Tooltip>
	);
}