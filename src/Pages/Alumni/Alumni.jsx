import React, { useEffect, useState } from 'react'
import './alumni.css'
import { Navbar } from '../../Components'
import ProfileCard from './profileCard'
import { getJSONFromFirebase } from "../../Helpers"
import { AlumniSkeleton } from '../../Components/index.js'

const Alumni = () => {
  
  const [alumniData, setAlumniData] = useState(null);

  useEffect(() => {
    async function fetchJsonFromFirebase() {
      const res = await getJSONFromFirebase("alumniData");
      setAlumniData(res);
    }
    fetchJsonFromFirebase();
  },[])

  return (
    <>
      <Navbar />
      {alumniData ? (
      <>
        <h1 className="alumni-heading">
          The Most Exciting <span className="highlight">Alumni-Mentorship</span> Programme
        </h1>
        <div className="alumni-content">
          {alumniData.map((alumni, index) => (
            <ProfileCard
              key={index}
              data={alumni}
            />
          ))}
        </div>
      </>
    ) : (
      <AlumniSkeleton />
    )}
    </>
  )
}

export default Alumni;
