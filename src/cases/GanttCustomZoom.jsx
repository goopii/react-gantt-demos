import React, { useRef } from 'react';
import { getData, zoomConfig } from "../data";
import { Gantt } from "wx-react-gantt";

export default function GanttChart({ skinSettings }) {
	const apiRef = useRef(null);
	const data = getData();

	return (
		<div className="demo-rows">
			<h4 className='p20'>Point over Gantt chart, then hold Ctrl and use mouse wheel to zoom</h4>
			<div className="demo-gantt">
				<Gantt
					{...skinSettings}
					tasks={data.tasks}
					links={data.links}
					zoom={zoomConfig}
					api={apiRef}
				/>
			</div>
		</div>
	);
}