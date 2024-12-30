import { useRef } from 'react';
import { getData } from "../data";
import { Gantt, Toolbar, defaultToolbarButtons } from "wx-react-gantt";

export default function GanttComponent({ skinSettings }) {
	const apiRef = useRef();
	const data = getData();

	const items = defaultToolbarButtons.filter(b => {
		return b.id?.indexOf("indent") === -1;
	});

	return (
		<>
			<Toolbar api={apiRef.current} items={items} />
			<div className="gtcell">
				<Gantt
					{...skinSettings}
					api={apiRef}
					tasks={data.tasks}
					links={data.links}
					scales={data.scales}
				/>
			</div>
		</>
	);
}