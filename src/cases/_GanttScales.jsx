import { getData, complexScales } from "../data";
import { Gantt } from "wx-react-gantt";
import { useRef } from 'react';

export default function GanttComponent({ skinSettings }) {
	const apiRef = useRef(null);
	const data = getData();

	return (
		<Gantt
			{...skinSettings}
			tasks={data.tasks}
			links={data.links}
			scales={complexScales}
			start={new Date(2024, 3, 1)}
			end={new Date(2024, 4, 12)}
			cellWidth={60}
			api={apiRef}
		/>
	);
}