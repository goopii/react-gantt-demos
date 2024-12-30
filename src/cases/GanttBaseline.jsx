import React, { useRef } from 'react';
import { getBaselinesData } from "../data";
import { Gantt, defaultEditorShape } from "wx-react-gantt";


const MyComponent = ({ skinSettings }) => {
	const apiRef = useRef(null);
	const data = getBaselinesData();

	const editorShape = defaultEditorShape.flatMap(item =>
		item.key === "links"
			? [
					...[
						{
							key: "base_start",
							type: "date",
							label: "Baseline start",
						},
						{
							key: "base_end",
							type: "date",
							label: "Baseline end",
						},
					],
					item,
				]
			: item
	);

	return (
		<Gantt
			{...skinSettings}
			baselines={true}
			cellHeight={45}
			tasks={data.tasks}
			links={data.links}
			editorShape={editorShape}
			api={apiRef}
		/>
	);
};

export default MyComponent;