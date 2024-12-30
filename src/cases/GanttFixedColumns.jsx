import { useRef } from 'react';
import { getData } from "../data";
import { Gantt } from "wx-react-gantt";

export default function GanttComponent({ skinSettings }) {
	const apiRef = useRef();
	const data = getData();

	const columns = [
		{ id: "text", header: "Task name", width: 120 },
		{
			id: "start",
			header: "Start date",
			width: 120,
			align: "center",
		},
		{
			id: "duration",
			header: "Duration",
			width: 80,
			align: "center",
		},
		{ id: "action", header: "", width: 50, align: "center" },
	];

	return (
		<Gantt
			{...skinSettings}
			tasks={data.tasks}
			links={data.links}
			scales={data.scales}
			columns={columns}
			api={apiRef}
		/>
	);
}