import { useRef } from 'react';
import { getData } from "../data";
import { Gantt, Toolbar } from "wx-react-gantt";

export default function MyComponent({ skinSettings }) {
	const apiRef = useRef();
	const data = getData();

	return (
		<div class="demo-rows">
			<Toolbar api={apiRef.current} />
			<div className="demo-gantt">
				<Gantt
					{...skinSettings}
					api={apiRef}
					tasks={data.tasks}
					links={data.links}
					scales={data.scales}
				/>
			</div>
		</div>
	);
}