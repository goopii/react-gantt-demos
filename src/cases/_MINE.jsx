import { getData } from "../data";
import { Gantt } from "wx-react-gantt";
import { useRef } from 'react';

export default function MyComponent({ skinSettings }) {
	const apiRef = useRef(null);
	const data = getData();

	const editorShape = [
		{
			key: "text",
			type: "text",
			label: "Name",
			config: {
				placeholder: "Add task name",
				focus: true,
			},
		},
		{
			key: "type",
			type: "select",
			label: "Type",
			options: [
				{ id: "task", label: "Task" },
				{ id: "summary", label: "Summary task" },
				{ id: "milestone", label: "Milestone" },
			],
		},
		{
			key: "start",
			type: "date",
			label: "Start date",
		},
		{
			key: "end",
			type: "date",
			label: "End date",
		},
		{
			key: "progress",
			type: "slider",
			label: "Fishing amount",
		},
		{
			key: "links",
			type: "links",
		},
	];

	return (
		<Gantt
			{...skinSettings}
			tasks={data.tasks} // The blocks of the chart
			links={data.links} // The connections between the blocks
			scales={data.scales} // The scales of the chart
			editorShape={editorShape}
			api={apiRef}
		/>
	);
}
/*
const {
	taskTemplate,
	markers,
	taskTypes,
	tasks,
	selected,
	activeTask,
	links,
	scales,
	columns,
	start,
	end,
	lengthUnit,
	cellWidth,
	cellHeight,
	scaleHeight,
	readonly,
	cellBorders,
	editorShape,
	zoom,
	baselines,
	highlightTime,
} = props;
*/