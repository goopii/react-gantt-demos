import React, { useRef } from 'react';
import { getData } from "../data";
import { Gantt } from "wx-react-gantt";

const MyComponent = ({ skinSettings }) => {
	const apiRef = useRef(null);
	const data = getData();

	return (
		<Gantt
			{...skinSettings}
			tasks={data.tasks}
			links={data.links}
			scales={data.scales}
			api={apiRef}
		/>
	);
};

export default MyComponent;