import React, { useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine } from '../../lib/icons';
import { AppStates } from '../../Context/appContext.jsx';
import Button from '@mui/material/Button';

function NotesFilterCard({ filterName, options }) {
  const { filter, setfilter } = AppStates();
  const [openOptions, setOpenOptions] = useState(true);
  const [checkedState, setCheckedState] = useState(new Array(options.length).fill(false));
  const [expanded, setExpanded] = useState(false);
  const truncatedContent = expanded ? options : options.slice(0, 3);

  const handleCheckBoxChange = async (idx) => {
    const newState = checkedState.map((item, i) => {
      return i === idx ? !item : item;
    });
    setCheckedState(newState);

    const newFilter = options.filter((opt, i) => newState[i] === true);
    setfilter({ ...filter, [filterName]: newFilter });
  };

  return (
    <div className="p-1  rounded-lg  my-2">
      <div className="bg-[#CCC] h-[0.2px]"></div>

      {/*  H E A D E R  */}
      <div
        className="flex justify-between items-center cursor-pointer p-2 hover:bg-[#F6F6F6]"
        onClick={() => setOpenOptions(!openOptions)}
      >
        <p className="text-lg font-semibold text-[#6F6C6C] ">{filterName}</p>
        <div className="w-fit">
          {openOptions ? <RiArrowDropUpLine size={30} /> : <RiArrowDropDownLine size={30} />}
        </div>
      </div>

      {/* F I L T E R     O P T I O N S */}
      <div className={`${openOptions ? 'block' : 'hidden'} filter-options `}>
        {truncatedContent.map((ele, i) => {
          return (
            <div className="flex p-1 my-1 text-sm items-center" key={i}>
              <input
                type="checkbox"
                checked={checkedState[i]}
                onChange={() => handleCheckBoxChange(i)}
                className=" w-4 mr-3 h-4 cursor-pointer accent-green-400	rounded"
                name={ele}
                id=""
              />

              {filterName === 'Uploaded' ? (
                <label htmlFor={ele}> {`Last ${ele} month`} </label>
              ) : filterName === 'Rating' ? (
                <label htmlFor={ele}> {ele}+ ⭐ </label>
              ) : (
                <label htmlFor={ele}> {ele} </label>
              )}
            </div>
          );
        })}

        {/* S H O W    M O R E   B U T T O N  */}
        {options.length > 3 && (
          <Button variant="text" size="small" onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Show Less' : 'Show More'}
          </Button>
        )}
      </div>
    </div>
  );
}

export default NotesFilterCard;
