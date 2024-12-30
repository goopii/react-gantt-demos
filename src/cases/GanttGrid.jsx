import React, { useRef } from 'react';
import { getData, simpleColumns } from "../data";
import { Gantt } from "wx-react-gantt";

export default function GanttComponent({ skinSettings }) {
	const apiRef = useRef(null);
	const data = getData();

	return (
		<Gantt
			{...skinSettings}
			tasks={data.tasks}
			links={data.links}
			scales={data.scales}
			columns={simpleColumns}
			api={apiRef}
		/>
	);
}