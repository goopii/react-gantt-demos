import { useRef } from 'react';
import { getData } from "../data";
import { Gantt, ContextMenu } from "wx-react-gantt";

const data = getData();
let tasks = data.tasks;

export default function GanttComponent({ skinSettings }) {
	const apiRef = useRef();
	const menuHandler = useRef();

	const dayDiff = (next, prev) => {
		const d = (next - prev) / 1000 / 60 / 60 / 24;
		return Math.ceil(Math.abs(d));
	};

	function getSummaryProgress(id) {
		const [totalProgress, totalDuration] = collectProgressFromKids(id);
		const res = totalProgress / totalDuration;
		return isNaN(res) ? 0 : Math.round(res);
	}
	function collectProgressFromKids(id) {
		let totalProgress = 0,
			totalDuration = 0;
		const kids = apiRef.current.getTask(id).data;

		kids?.forEach(kid => {
			let duration = 0;
			if (kid.type !== "milestone" && kid.type !== "summary") {
				duration = kid.duration || dayDiff(kid.end, kid.start);
				totalDuration += duration;
				totalProgress += duration * kid.progress;
			}

			const [p, d] = collectProgressFromKids(kid.id);
			totalProgress += p;
			totalDuration += d;
		});
		return [totalProgress, totalDuration];
	}

	function recalcSummaryProgress(id, self) {
		const { tasks } = apiRef.current.getState();
		const task = apiRef.current.getTask(id);

		if (task.type !== "milestone") {
			const summary =
				self && task.type === "summary" ? id : tasks.getSummaryId(id);

			if (summary) {
				const progress = getSummaryProgress(summary);
				apiRef.current.exec("update-task", {
					id: summary,
					task: { progress },
				});
			}
		}
	}

	function init(api) {
		apiRef.current = api;

		api.getState().tasks.forEach(task => {
			recalcSummaryProgress(task.id, true);
		});

		api.on("add-task", ({ id }) => {
			recalcSummaryProgress(id);
		});
		api.on("update-task", ({ id }) => {
			recalcSummaryProgress(id);
		});

		api.on("delete-task", ({ source }) => {
			recalcSummaryProgress(source, true);
		});
		api.on("copy-task", ({ id }) => {
			recalcSummaryProgress(id);
		});
		api.on("move-task", ({ id, source, inProgress }) => {
			if (inProgress) return;

			if (api.getTask(id).parent !== source)
				recalcSummaryProgress(source, true);
			recalcSummaryProgress(id);
		});
	}


	return (
		<div onContextMenu={ev => menuHandler.current(ev)} className="demo-rows">
			<Gantt
				{...skinSettings}
				init={init}
				tasks={tasks}
				links={data.links}
				scales={data.scales}
				cellWidth={30}
			/>
			<ContextMenu api={apiRef.current} init={v => menuHandler.current = v}></ContextMenu>
		</div>
	);
}