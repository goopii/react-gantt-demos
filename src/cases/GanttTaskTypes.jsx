import { useRef } from 'react';
import { getTypedData, taskTypes } from "../data";
import { Gantt } from "wx-react-gantt";

export default function GanttDemo({ skinSettings }) {
	const apiRef = useRef(null);
	const data = getTypedData();

	return (
		<div className="demo">
			<Gantt
				{...skinSettings}
				tasks={data.tasks}
				links={data.links}
				scales={data.scales}
				taskTypes={taskTypes}
				api={apiRef}
			/>
		</div>
	);
}