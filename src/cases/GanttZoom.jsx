import React, { useRef } from "react";
import { getData } from "../data";
import { Gantt } from "wx-react-gantt";

export default function DemoComponent({ skinSettings }){
	const apiRef = useRef(null);
	const data = getData();

	const init = (api) => {
		api.on("zoom-scale", () => {
			console.log("The current zoom level is", api.getState().zoom);
		});
	};

	return (
		<div className="demo-rows">
			<h4 className="p20">Point over Gantt chart, then hold Ctrl and use mouse wheel to zoom</h4>
			<div className="demo-gantt">
				<Gantt
					api={apiRef}
					init={init}
					{...skinSettings}
					tasks={data.tasks}
					links={data.links}
					cellWidth={100}
					zoom
				/>
			</div>
		</div>
	);
};