import React, { useRef, useEffect, useState } from "react";
import { getGeneratedData, complexScales } from "../data";
import { Gantt } from "wx-react-gantt";
import { Button } from "../ui.js";

const count = 10000;
const years = 3;
const data = getGeneratedData("", count, 3);

export default function GanttComponent({ skinSettings }) {
    const [start, setStart] = useState(null);
    const outAreaRef = useRef(null);

    useEffect(() => {
        if (start && outAreaRef.current) {
            outAreaRef.current.innerHTML = new Date() - start;
        }
    });

    const handleClick = () => {
        setStart(new Date());
    };

    return (
        <div className="demo-rows">
            <div className="p10">
                {start ? (
                    <>
                        10 000 tasks (
                        {years}
                        years ) rendered in
                        <span ref={outAreaRef} />
                        ms
                    </>
                ) : (
                    <Button type="primary" onClick={handleClick}>
                        Press me to render Gantt chart with 10 000 tasks
                    </Button>
                )}
            </div>

            {start && (
                <div className="demo-gantt">
                    <Gantt
                        {...skinSettings}
                        tasks={data.tasks}
                        links={data.links}
                        scales={complexScales}
                    />
                </div>
            )}
        </div>
    );
}