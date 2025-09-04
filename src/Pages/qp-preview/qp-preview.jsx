import React, { useEffect, useState } from 'react';
import QpDisplay from '../NotesPreview/NotesDisplay';
import { Navbar } from '../../Components';
import QpDetails from './qp-details';
import { useParams } from 'react-router-dom';
import questionPapersMockData from '../../data/questionPapersMockData';

export default function QpPreview() {
  const [qpData, setqpData] = useState(null);
  const [expand, setExpand] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setqpData(questionPapersMockData[id]);
  }, [id]);

  return (
    <>
      <Navbar />
      <div className={`md:${expand ? '' : 'flex'} md:p-4 px-3 relative gap-8 overflow-x-hidden`}>
        <div className={`w-[${expand ? '100%' : '50%'}]`}>
          <QpDisplay expand={expand} setExpand={setExpand} resourceLink={qpData?.resourceLink} />
        </div>

        <div className={` drawer w-[50%] `}>
          <QpDetails {...qpData} />
        </div>
      </div>
    </>
  );
}
