import React, { useRef } from "react";
import { getData } from "../data";
import { Gantt, ContextMenu, defaultMenuOptions } from "wx-react-gantt";

const data = getData();

let options;
const ids = ["cut-task", "copy-task", "paste-task", "delete-task"];
let arr = [{ id: "add-task:after", text: " Add below", icon: "wxi-plus" }];
arr = arr.concat(defaultMenuOptions.filter(op => ids.indexOf(op.id) >= 0));
arr.push({
	id: "my-action",
	text: "My action",
	icon: "wxi-empty",
	handler: actionHandler,
});

options = arr;

function actionHandler() {
	console.log("'My action' clicked");
}

const MyComponent = ({ skinSettings }) => {
	const apiRef = useRef();
	const menuHandler = useRef();

	function onClick(ev) {
		const { context, action } = ev;
		if (!action.handler)
			alert(`'${action.id}' clicked for the '${context.id}' task`);
	}

	return (
		<div onContextMenu={ev => menuHandler.current(ev)} className="demo-rows">
			<Gantt
				api={apiRef}
				{...skinSettings}
				tasks={data.tasks}
				links={data.links}
				scales={data.scales}
			/>
			<ContextMenu api={apiRef.current} init={v => menuHandler.current = v} options={options} onClick={onClick}></ContextMenu>
		</div>
	);
};

export default MyComponent;