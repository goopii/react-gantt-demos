import { useRef } from 'react';
import { getData } from "../data";
import { Gantt } from "wx-react-gantt";

export default function GanttComponent({ skinSettings }) {
	const apiRef = useRef(null);
	const data = getData();

	const columns = [
		{ id: "text", header: "Task name", flexgrow: 2 },
		{
			id: "start",
			header: "Start date",
			flexgrow: 1,
			align: "center",
		},
		{
			id: "duration",
			header: "Duration",
			align: "center",
			flexgrow: 1,
		},
		{
			id: "action",
			header: "",
			width: 50,
			align: "center",
		},
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