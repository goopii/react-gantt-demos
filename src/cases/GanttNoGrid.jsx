import { useRef } from 'react';
import { getData } from "../data";
import { Gantt } from "wx-react-gantt";

export default function MyComponent({ skinSettings }) {
	const apiRef = useRef(null);
	const data = getData();

	return (
		<Gantt
			{...skinSettings}
			tasks={data.tasks}
			links={data.links}
			scales={data.scales}
			columns={false}
			cellWidth={60}
			api={apiRef}
		/>
	);
}