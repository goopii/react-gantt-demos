import React, { useRef, useEffect } from 'react';
import { getData, zoomConfig } from "../data";
import { Gantt } from "wx-react-gantt";

const Demo = ({ skinSettings }) => {
	const data = getData();
	const apiRef = useRef();

	useEffect(() => {
		if (apiRef.current) {
			apiRef.current.intercept("sort-tasks", config => {
				return config.key === "text";
			});
		}
	}, [apiRef]);

	return (
		<div className="demo-rows">
			<h4>Sorting by the "Task Name" column only</h4>
			<div className="demo-gantt">
				<Gantt
					api={apiRef}
					{...skinSettings}
					tasks={data.tasks}
					links={data.links}
					zoom={zoomConfig}
				/>
			</div>
		</div>
	);
};

export default Demo;