import React, { useRef, useEffect, useState } from 'react';
import { RestDataProvider } from "wx-gantt-data-provider";
import { Gantt, ContextMenu } from "wx-react-gantt";

const restProvider = new RestDataProvider(
	"",
	{ batchURL: "batch" }
);

const MyComponent = () => {
	const apiRef = useRef(null);
	const menuHandler = useRef(null);
	
	const [ tasks, setTasks ] = useState([]);
	const [ links, setLinks ] = useState([]);

	useEffect(() => {
		restProvider.getData().then(({ tasks: t, links: l }) => {
			setTasks(t);
			setLinks(l);
		});
	}, []);

	const init = (api) => {
		api.setNext(restProvider);

		api.on("request-data", (ev) => {
			restProvider.getData(ev.id).then(({ tasks, links }) => {
				api.exec("provide-data", {
					id: ev.id,
					data: {
						tasks,
						links,
					},
				});
			});
		});
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