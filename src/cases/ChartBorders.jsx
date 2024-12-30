import { useRef, useState } from 'react';
import { getData } from "../data";
import { Gantt } from "wx-react-gantt";
import { Switch } from "../ui.js";

export default function GanttChart({ skinSettings }) {
	const apiRef = useRef(null);
	const data = getData();
	let [cellBorders, setCellBorders] = useState("full");

	return (
		<div className="demo-rows">
			<div className="p20 demo-bar">
				<div className="label">Chart cell borders</div>
				<Switch value={true} onChange={v => setCellBorders(v?"full":"column") }/>
			</div>

			<div className="demo-gantt">
				<Gantt
					{...skinSettings}
					tasks={data.tasks}
					links={data.links}
					scales={data.scales}
					api={apiRef}
					cellBorders={cellBorders}
				/>
			</div>
		</div>
	);
}