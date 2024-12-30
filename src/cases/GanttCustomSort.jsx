import React, { useRef, useEffect, useState } from "react";
import { getData } from "../data";
import { Gantt } from "wx-react-gantt";
import { Button } from "../ui.js";

export default function MyComponent({ skinSettings }) {
	const data = getData();
	const apiRef = useRef();
	const [sortConfig, setSortConfig] = useState({});
	const [icons, setIcons] = useState(getIcons());

	function getIcons() {
		const obj = { text: "", start: "", duration: "" };
		const { key, order } = sortConfig;
		if (key) obj[key] = `wxi-arrow-${order === "asc" ? "up" : "down"}`;
		return obj;
	}

	function sort(id) {
		const { key, order } = sortConfig;
		let newOrder = !key ? "desc" : "asc";

		if (key === id) newOrder = order === "asc" ? "desc" : "asc";

		apiRef.current.exec("sort-tasks", { key: id, order: newOrder });
	}

	
	useEffect(() => {
		if (apiRef.current) {
			const handleSortTasks = config => {
				setSortConfig(config);
				setIcons(getIcons());
			};

			apiRef.current.on("sort-tasks", handleSortTasks);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [apiRef]);

	return (
		<div className="demo-rows">
			<div className="p20">
				<div className="label">Sort by</div>
				<Button onClick={() => sort("text")}>
					Task Name <i className={icons.text} />
				</Button>
				<Button onClick={() => sort("start")}>
					Start Date <i className={icons.start} />
				</Button>
				<Button onClick={() => sort("duration")}>
					Duration <i className={icons.duration} />
				</Button>
			</div>

			<div className="demo-gantt">
				<Gantt
					api={apiRef}
					{...skinSettings}
					tasks={data.tasks}
					links={data.links}
					scales={data.scales}
				/>
			</div>
		</div>
	);
}