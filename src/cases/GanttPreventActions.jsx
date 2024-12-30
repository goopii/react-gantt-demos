import React, { useRef, useState } from "react";
import { getData } from "../data";
import { Gantt, defaultColumns } from "wx-react-gantt";
import { Field, Switch } from "../ui.js";

const data = getData();
let temp = {};


export default function GanttComponent({ skinSettings }) {
	let [ edit, setEdit ] = useState(true);
	let [ drag, setDrag ] = useState(true);
	let [ order, setOrder ] = useState(true);
	let [ newLink, setNewLink ] = useState(true);
	temp = { edit, drag, order, newLink };

	let gapi = useRef();

	function init(api) {
		gapi.current = api;

		api.intercept("show-editor", () => !!temp.edit);
		api.intercept("drag-task", () => {
			return temp.drag;
		});
	}

	const columns = edit
		? defaultColumns
		: defaultColumns.filter(a => a.id !== "action");


	return (
		<div className="demo-rows">
			<div className="p20" style={ { display:"flex", flexDirection:"row", whiteSpace:"nowrap" } }>
				<Field label="Adding and editing" position={"left"}>
					<Switch value={edit} onChange={(e) => setEdit(e)} />
				</Field>
				<Field label="Creating links" position={"left"}>
					<Switch value={newLink} onChange={(e) => setNewLink(e)} />
				</Field>
				<Field label="Dragging tasks" position={"left"}>
					<Switch value={drag} onChange={(e) => setDrag(e)} />
				</Field>
				<Field label="Reordering tasks" position={"left"}>
					<Switch value={order} onChange={(e) => setOrder(e)} />
				</Field>
			</div>
			<div
				className={`demo-gantt ${!edit ? 'hide-progress' : ''} ${!newLink ? 'hide-links' : ''} ${!drag ? 'hide-drag' : ''}`}
			>
				<Gantt
					init={init}
					{...skinSettings}
					tasks={data.tasks}
					links={data.links}
					scales={data.scales}
					columns={columns}
				/>
			</div>
		</div>
	);
}