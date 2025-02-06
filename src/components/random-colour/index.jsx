import { useEffect, useState, useCallback } from "react";
import InfoIcon from '../infoIcon/InfoIcon';

export default function RandomColor() {
  const [typeOfColor, setTypeOfColor] = useState("hex");
  const [color, setColor] = useState("#000000");

  function randomColorUtility(length) {
    return Math.floor(Math.random() * length);
  }

  const handleCreateRandomHexColor = useCallback(() => {
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let hexColor = "#";

    for (let i = 0; i < 6; i++) {
      hexColor += hex[randomColorUtility(hex.length)];
    }
    setColor(hexColor);
  }, []);

  const handleCreateRandomRgbColor = useCallback(() => {
    const r = randomColorUtility(256);
    const g = randomColorUtility(256);
    const b = randomColorUtility(256);

    setColor(`rgb(${r},${g}, ${b})`);
  }, []);

  useEffect(() => {
    if (typeOfColor === "rgb") handleCreateRandomRgbColor();
    else handleCreateRandomHexColor();
  }, [typeOfColor, handleCreateRandomHexColor, handleCreateRandomRgbColor]);

  return (
    <div className='w-[100vw] h-[100vh]' style={{background: color,}}>

      <InfoIcon pageName="randomColour" />

      <div className='flex justify-evenly items-center text-center pt-[20px] top-20 relative gap-1'>
        <button className='bg-black text-white px-2.5 py-2 text-xs md:text-2xl rounded-md uppercase font-dosis font-semibold' onClick={() => setTypeOfColor("hex")}>Create HEX Color</button>
        <button className='bg-black text-white px-2.5 py-2 text-xs md:text-2xl rounded-md uppercase font-dosis font-semibold' onClick={() => setTypeOfColor("rgb")}>Create RGB Color</button>
        <button className='bg-black text-white px-2.5 py-2 text-xs md:text-2xl rounded-md uppercase font-dosis font-semibold' onClick={typeOfColor === "hex" ? handleCreateRandomHexColor : handleCreateRandomRgbColor}>Generate Random Color</button> 
      </div>

      <div className='flex justify-center items-center text-white flex-col mt-[50px] text-6xl gap-5 pt-[70px]'>
        <h3 className='text-6xl font-dosis'>{typeOfColor === "rgb" ? "RGB Color" : "HEX Color"}</h3>
        <h1 className='text-4xl font-dosis'>{color}</h1>
      </div>

    </div>
  );
}
