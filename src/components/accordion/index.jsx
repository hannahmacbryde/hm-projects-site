import { useState } from "react";
import data from "./data";
import InfoIcon from '../infoIcon/InfoIcon';

export default function Accordion() {

    const [selected, setSelected] = useState(null);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    const [multiple, setMultiple] = useState([]);

    function handleSingleSelection(getCurrentId) {
        setSelected(getCurrentId === selected ? null : getCurrentId);
    }

    function handleMultiSelection(getCurrentId) {
        let copyMultiple = [...multiple];
        const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId);

        if (findIndexOfCurrentId === -1) {
            copyMultiple.push(getCurrentId);
        } else {
            copyMultiple.splice(findIndexOfCurrentId);
        }

        setMultiple(copyMultiple);
    }

    return (
        <div className="acc-wrapper">
            <InfoIcon pageName="accordionPage" />

            <div className="justify-center items-center flex flex-col md:top-[300px] top-[150px] relative gap-5">
                <button className="px-5 py-2.5 bg-black text-white font-bold text-[20px] cursor-pointer mb-5" onClick={() => setEnableMultiSelection(!enableMultiSelection)}>Enable Multi Selection</button>
                <div className="accordion md:w-[500px] w-[90%]">
                    {data && data.length > 0 ? (
                        data.map(dataItem => (
                            <div className="item bg-black mb-2.5 px-5 py-2.5" key={dataItem.id}>
                                <div onClick={enableMultiSelection ? () => handleMultiSelection(dataItem.id) : () => handleSingleSelection(dataItem.id)} className="title text-white flex justify-between items-center cursor-pointer">
                                    <h3>{dataItem.question}</h3>
                                    <span>+</span>
                                </div>
                                {
                                    enableMultiSelection ? multiple.indexOf(dataItem.id) !== -1 && (<div className="content">{dataItem.answer}</div>) : selected === dataItem.id && (
                                        <div className="content text-white h-auto">{dataItem.answer}</div>
                                    )
                                }
                            </div>
                        ))
                    ) : (
                        <div>No data found !</div>
                    )}
                </div>
            </div>
        </div>
    );
}