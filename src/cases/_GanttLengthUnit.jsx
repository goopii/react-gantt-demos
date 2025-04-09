import { useRef, useEffect, useState } from 'react';
import { getData, bigScales } from "../data.js";
import { Gantt } from "wx-react-gantt";
import { Select } from "../ui.js";

const data = getData();
const options = [
	{ id: "hour", label: "Hour" },
	{ id: "day", label: "Day" },
	{ id: "week", label: "Week" },
	{ id: "month", label: "Month" },
	{ id: "quarter", label: "Quarter" },
];

export default function Demo({ skinSettings }) {
	const [lengthUnit, setLengthUnit] = useState("day");
	const [scales, setScales] = useState([]);

	useEffect(() => {
		switch (lengthUnit) {
			case "hour":
				setScales([
					{ unit: "month", step: 1, format: "MMM" },
					{ unit: "day", step: 1, format: "MMM d" },
				]);
				break;
			case "day":
				setScales([
					{ unit: "month", step: 1, format: "MMM" },
					{ unit: "week", step: 1, format: "w" },
				]);
				break;
			case "week":
				setScales([
					{ unit: "year", step: 1, format: "yyyy" },
					{ unit: "month", step: 1, format: "MMM" },
				]);
				break;
			case "month":
				setScales([
					{ unit: "year", step: 1, format: "yyyy" },
					{ unit: "quarter", step: 1, format: "QQQ" },
				]);
				break;
			case "quarter":
				setScales([{ unit: "year", step: 1, format: "yyyy" }]);
				break;
			default:
				setScales(bigScales);
		}
	}, [lengthUnit]);

	return (
		<div className="demo-rows">
			<div className="p20">
				<Select value={lengthUnit} onChange={e => setLengthUnit(e.target.value)} options={options} />
			</div>
			<div className="demo-gantt">
				{scales.length && <Gantt
					{...skinSettings}
					tasks={data.tasks}
					links={data.links}
					scales={scales}
					lengthUnit={lengthUnit}
					cellWidth={300}
				/>}
			</div>
		</div>
	);
}