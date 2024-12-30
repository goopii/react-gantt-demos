import { useRef } from 'react';
import { getData } from "../data";
import { Gantt, ContextMenu } from "wx-react-gantt";

const data = getData();

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
			<ContextMenu api={apiRef.current} init={v => menuHandler.current = v}></ContextMenu>
		</div>
	);
}