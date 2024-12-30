import { useRef, useEffect } from 'react';
import { getData } from "../data";
import { Gantt } from "wx-react-gantt";

const data = getData();

export default function GanttComponent({ skinSettings }) {
	const apiRef = useRef(null);

	useEffect(() => {
		if (apiRef.current) {
			apiRef.current.intercept("drag-task", ({ id, top }) => {
				return !(
					typeof top === "undefined" && apiRef.current.getTask(id).type === "summary"
				);
			});
		}
	}, [apiRef]);

	return (
		<div className="gt-cell">
			<Gantt
				api={apiRef}
				{...skinSettings}
				tasks={data.tasks}
				links={data.links}
				scales={data.scales}
			/>
		</div>
	);
}