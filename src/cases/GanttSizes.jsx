import { useRef, useState } from "react";
import { getData, complexScales } from "../data";
import { Gantt } from "wx-react-gantt";
import { Slider } from "../ui.js";

export default function MyComponent({ skinSettings }) {
	const apiRef = useRef(null);
	const data = getData();

	const [ cellWidth, setCellWidth ] = useState(100);
	const [ scaleHeight, setScaleHeight ] = useState(38);
	const [ cellHeight, setCellHeight ] = useState(36);

	return (
		<div className="demo-rows">
			<div className="p10">
				<Slider label="Cell width" value={cellWidth} min={20} max={200} onChange={(ev) => setCellWidth(ev.value) } />
				<Slider label="Cell height" value={cellHeight} min={20} max={60} onChange={(ev) => setCellHeight(ev.value) } />
				<Slider
					label="Scale height"
					value={scaleHeight}
					min={20}
					max={60}
					onChange={(ev) => setScaleHeight(ev.value)}
				/>
			</div>

			<div className="demo-gantt">
				<Gantt
					{...skinSettings}
					tasks={data.tasks}
					links={data.links}
					scales={complexScales}
					cellWidth={cellWidth}
					cellHeight={cellHeight}
					scaleHeight={scaleHeight}
					api={apiRef}
				/>
			</div>
		</div>
	);
}