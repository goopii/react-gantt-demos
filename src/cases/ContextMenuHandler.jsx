import { useRef } from 'react';
import { getData } from "../data";
import { Gantt, ContextMenu } from "wx-react-gantt";

const data = getData();

// show menu for certain tasks
function resolver(id) {
	return id > 2;
}

// filter menu options
function filter(option, task) {
	const type = task.type;
	if (option.id) {
		const ids = option.id.toString().split(":");
		if (type === "milestone" && ids[0] === "add-task")
			return ids[1] !== "child";
	}

	return true;
}

export default function MyComponent({ skinSettings }) {
	const apiRef = useRef();
	const menuHandler = useRef();

	return (
		<div onContextMenu={ev => menuHandler.current(ev)} className="demo-rows">
			<Gantt
				api={apiRef}
				{...skinSettings}
				tasks={data.tasks}
				links={data.links}
				scales={data.scales}
			/>
			<ContextMenu api={apiRef.current} init={v => menuHandler.current = v} resolver={resolver} filter={filter}></ContextMenu>
		</div>
	);
}