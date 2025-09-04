import { MoreQPaperCard } from '../../Components';
import questionPapersMockData from '../../data/questionPapersMockData';

export default function QpDetails({ subjectName, subjectCode, year, type }) {
  // Filter question papers by faculty
  const moreQnPapersSameFaculty = questionPapersMockData
    .filter((paper) => paper.subjectCode === subjectCode)
    .slice(0, 5);

  return (
    <div className="w-full mt-4">
      <div className="text-3xl font-bold">{subjectName}</div>
      <div className="mt-4">
        <div className="flex flex-row">
          <p className="text-sm font-gray-300 my-1 mr-4">{'faculty'}</p>
          <p className="text-sm font-gray-300 my-1 mr-4">{year}</p>
          <p className="text-sm font-gray-300 my-1">{type}</p>
        </div>

        <span className="text-green-400">IIIT Dharwad</span>

        <p className="my-5 text-md font-bold">More Question Papers</p>
        <div className="flex flex-col">
          {moreQnPapersSameFaculty.map((paper, idx) => {
            return <MoreQPaperCard key={idx} paper={paper} />;
          })}
        </div>
      </div>
    </div>
  );
}
