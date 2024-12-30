import { useEffect, useRef, useState } from 'react';
import { Gantt, ContextMenu } from "wx-react-gantt";

const server = "";

const MyComponent = () => {
	const apiRef = useRef();
	const menuHandler = useRef(null);

	const [ tasks, setTasks ] = useState([]);
	const [ links, setLinks ] = useState([]);

	useEffect(() => {
		Promise.all([
			fetch(server + "/tasks")
				.then(res => res.json())
				.then(arr => parseDates(arr)),
			fetch(server + "/links").then(res => res.json()),
		]).then(([t, l]) => {
			setTasks(t);
			setLinks(l);
		});
	}, []);

	const parseDates = (data) => {
		data.forEach(item => {
			item.start = new Date(item.start);
			if (item.end) item.end = new Date(item.end);
		});
		return data;
	};

	const init = (api) => {
		api.onRequestData = (ev) => {
			Promise.all([
				fetch(server + `/tasks/${ev.id}`)
					.then(res => res.json())
					.then(arr => parseDates(arr)),
				fetch(server + `/links/${ev.id}`).then(res => res.json()),
			]).then(([tasks, links]) => {
				api.exec("provide-data", {
					id: ev.id,
					data: {
						tasks,
						links,
					},
				});
			});
		};
	};

	return (
		<div onContextMenu={ev => menuHandler.current(ev)} className="demo-rows">
			<Gantt
				api={apiRef}
				init={init} tasks={tasks} links={links}
			/>
			<ContextMenu api={apiRef.current} init={v => menuHandler.current = v}></ContextMenu>
		</div>
	);
};

export default MyComponent;