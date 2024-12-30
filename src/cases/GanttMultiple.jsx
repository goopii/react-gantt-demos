import { useRef, useState } from 'react';
import { getData } from "../data";
import { Gantt } from "wx-react-gantt";
import { Button } from "../ui.js";

export default function GanttComponent({ skinSettings }) {
	const [gantts, setGantts] = useState([]);
	const counterRef = useRef(0);

	const addGantt = () => {
		const next = {
			id: counterRef.current,
			data: getData("[" + counterRef.current + "] "),
		};
		counterRef.current++;

		setGantts(prevGantts => [
			...prevGantts,
			next	
		]);
	};

	const removeGantt = (id) => {
		setGantts(prevGantts => prevGantts.filter(a => a.id !== id));
	};

	return (
		<div className="demo-rows">
			<div className="p20">
				<Button type="primary" onClick={addGantt}>Add Gantt</Button>
			</div>

			{gantts.map(gantt => (
				<div key={gantt.id}>
					<div className="p10"> 
						<Button type="secondary" onClick={() => removeGantt(gantt.id)}>
							Delete Gantt
						</Button>
					</div>
					<div className="demo-gantt-cell" style={ { height: "450px" } }>
						<Gantt
							{...skinSettings}
							tasks={gantt.data.tasks}
							links={gantt.data.links}
						/>
					</div>
				</div>
			))}
		</div>
	);
}