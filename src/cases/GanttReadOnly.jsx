import { useRef } from 'react';
import { getData } from "../data";
import { Gantt } from "wx-react-gantt";

export default function GanttComponent({ skinSettings }) {
	const apiRef = useRef(null);
	const data = getData();

	return (
		<Gantt
			readonly={true}
			{...skinSettings}
			tasks={data.tasks}
			links={data.links}
			scales={data.scales}
			api={apiRef}
		/>
	);
}