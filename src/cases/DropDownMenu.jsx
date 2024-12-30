import { useRef } from 'react';
import { getData } from "../data";
import { Gantt, ContextMenu } from "../../src/";
import { Button } from "../ui.js";

export default function YourComponent({ skinSettings }) {
    const apiRef = useRef();
    let handler, selected;
    const data = getData();

    if (apiRef.current) selected = apiRef.current.getReactiveState().selected;

    const resolver = () => {
        const id = selected.length ? selected[selected.length - 1] : null;
        return id ? apiRef.current.getTask(id) : null;
    };

    return (
        <>
            <ContextMenu api={apiRef} resolver={resolver} at="right" handler={handler} />

            <div className="rows">
                <div className="bar">
                    <Button type="primary" onClick={handler}>Task action</Button>
                </div>

                <div className="gtcell">
                    <Gantt
                        api={apiRef}
                        {...skinSettings}
                        tasks={data.tasks}
                        links={data.links}
                        scales={data.scales}
                    />
                </div>
            </div>
        </>
    );
}