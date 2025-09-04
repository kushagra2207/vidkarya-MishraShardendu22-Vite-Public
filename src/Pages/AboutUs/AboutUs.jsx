import styles from "./aboutUs.module.css";
import { ABOUT_ASSET } from "../../Assets/assetImages";
import { Navbar } from "../../Components";
import { useState } from "react";
import { vidkaryaChapters } from "../../data/vidkaryaChapters"



function FounderProfile(props) {
  const { name, photoURL } = props;
  return (
    <div className={styles.profileWrapper}>
      <img src={photoURL} className={styles.profilePhoto} alt="img" />
      <span className={styles.founderName}> {name} </span>
      <span className={styles.founderDesc}> IIIT Dharwad </span>
    </div>
  );
}

export default function AboutUs() {
  const [selectedCollege, setSelectedCollege] = useState("IIIT-Dharwad");

  const founders = [
    { name: "Chaitanya Giri", photoURL: ABOUT_ASSET.chaitanya_PhotoURL },
    { name: "Lucky Yadav", photoURL: ABOUT_ASSET.lucky_PhotoURL },
    { name: "Keshav Jha", photoURL: ABOUT_ASSET.keshav_PhotoURL },
    { name: "Hemant Dhawale", photoURL: ABOUT_ASSET.hemant_PhotoURL },
    { name: "Brij Vaghani", photoURL: ABOUT_ASSET.brij_PhotoURL },
  ];

  function TeamMemberProfile(props) {
  const { name, role, photoURL } = props;
  return (
    <div className={styles.currProfileWrapper}>
      <img src={photoURL} className={styles.profilePhoto} alt={`${name} profile`} />
      <span className={styles.memberName}>{name}</span>
      <span className={styles.memberRole}>{role}</span>
    </div>
  );
}


  function handleContactUs() {
    const vidkaryaEmailId = "vidkarya@gmail.com";
    const mailToLink = `mailto:${vidkaryaEmailId}`;
    window.location.href = mailToLink;
  }


  function CollegeChaptersSection() {
    const currentCollegeData = vidkaryaChapters[selectedCollege];

    return (
      <div className={styles.collegeChaptersSection}>
        <div className={styles.collegeTabs}>
          {Object.keys(vidkaryaChapters).map((college) => (
              <span
              key={college}
              className={`${styles.collegeTab} ${selectedCollege === college ? styles.activeTab : ''}`}
              onClick={() => setSelectedCollege(college)}
            >
              {college}
            </span>
          ))}
        </div>
        <div className={styles.visionContainer}>
        <div className={styles.visionWrapper}>
          <span className={styles.visionSubHead}>Our Vision</span>
          <span className={styles.visionMainHead}>
            Transforming Education Through Innovation and Collaboration
          </span>
          <div className={styles.line}></div>
          <span className={styles.visionDescription}>
            {currentCollegeData.vision || "Coming soon..."}
          </span>
        </div>
      </div>
      
        {styles.currentTeam ? (
          <>
          <div className={styles.currentTeam}>
          {currentCollegeData.clubPresident.length > 0 && (
            <div className={styles.teamSection}>
              <span className={styles.teamSectionTitle}>Chapter Lead</span>
              <div className={styles.leaderSection}>
                {currentCollegeData.clubPresident.map((member) => (
                  <TeamMemberProfile
                    key={member.name}
                    name={member.name}
                    role={member.role}
                    photoURL={member.photoURL}
                  />
                ))}
              </div>
            </div>
          )}

          {currentCollegeData.techTeam.length > 0 && (
            <div className={styles.teamSection}>
              <span className={styles.teamSectionTitle}>Tech Team</span>
              <div className={styles.membersList}>
                {currentCollegeData.techTeam.map((member) => (
                  <TeamMemberProfile
                    key={member.name}
                    name={member.name}
                    role={member.role}
                    photoURL={member.photoURL}
                  />
                ))}
              </div>
            </div>
          )}

          {currentCollegeData.alumniTeam.length > 0 && (
            <div className={styles.teamSection}>
                  <span className={styles.teamSectionTitle}>Relations and Engagement Team</span>
              <div className={styles.membersList}>
                {currentCollegeData.alumniTeam.map((member) => (
                  <TeamMemberProfile
                    key={member.name}
                    name={member.name}
                    role={member.role}
                    photoURL={member.photoURL}
                  />
                ))}
              </div>
            </div>
          )}

          {currentCollegeData.contentTeam.length > 0 && (
            <div className={styles.teamSection}>
              <span className={styles.teamSectionTitle}>Content Team</span>
              <div className={styles.membersList}>
                {currentCollegeData.contentTeam.map((member) => (
                  <TeamMemberProfile
                    key={member.name}
                    name={member.name}
                    role={member.role}
                    photoURL={member.photoURL}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
          </>
        ) : 
        (
          <span>No data to display</span>
        )}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        {/* Landing Container */}
        <div className={styles.landingDiv}>
          <div className={styles.landingImage}>
            <img
              src={ABOUT_ASSET.brandLogo}
              className={styles.aboutPageLogo}
              alt=""
            />
          </div>

          <div className={styles.landingContent}>
            <span className={styles.aboutSubHead}> About Us </span>
            <span className={styles.aboutHead}>
              We are Vidkarya, group of passionate tech enthusiasts, dedicated
              to crafting innovative solutions.
            </span>
            <div className={styles.line}></div>
            <span className={styles.aboutDescription}>
              Welcome to Vidkarya, where we embark on a mission to empower
              college students through a dynamic online platform. As avid tech
              enthusiasts ourselves, we understand the importance of accessible
              resources in the educational journey. At Vidkarya, we curate a
              rich repository of notes, blogs, and various useful materials,
              tailored to meet the diverse needs of college students. What sets
              us apart is our commitment to fostering collaboration and
              innovation. On our platform, users have the unique opportunity to
              not only access valuable resources but also to share their own
              projects. This collaborative space allows like-minded students to
              connect, exchange ideas, and embark on inspiring ventures
              together. Join us at Vidkarya, where knowledge meets
              collaboration, and together, we shape the future of learning.
            </span>
            <div
              className={styles.contactButton}
              onClick={() => handleContactUs()}
            >
              Contact Us
            </div>
          </div>
        </div>

        {/* FUTURE GOAL */}
        <div className={styles.mainContent}>
          <span className={styles.mainSubHead}> Our Future Goal </span>
          <span className={styles.mainHead}>
            Empowering Tomorrow's Learning: Our Vision for Vidkarya's Future.
          </span>
          <div className={styles.line}></div>
          <span className={styles.mainDescription}>
            Our future goal at Vidkarya is to continually elevate the
            educational experience for students across the globe. We envision a
            platform that transcends traditional boundaries, fostering a global
            community of knowledge seekers and creators. Moving forward, we aim
            to expand our repository of resources, ensuring an even broader
            spectrum of academic support. Additionally, we aspire to enhance the
            collaborative features of our platform, creating a space where
            students can seamlessly connect, share insights, and embark on joint
            projects. Through technological innovation and a steadfast
            commitment to education, we strive to be at the forefront of shaping
            a future where learning knows no bounds, and students find
            inspiration and support in every corner of Vidkarya.
          </span>
        </div>

        {/* OUR TEAM */}
        <div className={styles.mainContent}>
          <span className={styles.mainSubHead}> Our Team </span>
          <span className={styles.mainHead}>
            Meet the Visionaries: Our Collaborative Force at Vidkarya
          </span>
          <div className={styles.line}></div>
          <span className={styles.mainDescription}>
            Our Team at Vidkarya is a dynamic and passionate group of college
            students, driven by a shared commitment to revolutionize the
            educational landscape. Despite being a small cohort, our diverse
            talents and unwavering enthusiasm fuel our collective ambition. Each
            team member brings a unique perspective and skill set to the table,
            contributing to the innovative spirit that defines Vidkarya. As we
            navigate the challenges and triumphs of our educational journey, we
            stand united in our dedication to making a positive impact on the
            student community. Together, we are not just a team, we are a
            close-knit family, fostering creativity, collaboration, and a shared
            vision for the future of education.
          </span>
        </div>

        {/* TEAM DETAILS */}
        <div className={styles.foundingTeam}>
          <div
            className={styles.teamCoverPic}
            style={{ backgroundImage: `url(${ABOUT_ASSET.founderCoverPic})` }}
          >
            <span className={styles.teamCoverText}> Founding Members </span>
          </div>

          <div className={styles.membersList}>
            {founders.map((founder) => {
              return (
                <FounderProfile
                  key={founder.name}
                  name={founder.name}
                  photoURL={founder.photoURL}
                />
              );
            })}
          </div>
        </div>
        {/* Website Admin */}
        {/* <div className={styles.contentTeam}>
          <span className={styles.mainHead}>Website Admin</span>
          <div className={styles.line}></div>
          <ul className={styles.contentTeamList}>
            <li>Kshitiz Sachan</li>
            <li>Divyansh Mishra</li>
          </ul>
        </div> */}

        {/* Content TEAM */}
        {/* <div className={styles.contentTeam}>
          <span className={styles.mainHead}>Content Team</span>
          <div className={styles.line}></div>
          <ul className={styles.contentTeamList}>
            <li>Ashith Shetty</li>
            <li>Mandar</li>
            <li>Sharan Thummagunti</li>
            <li>Virinchi Motupalli</li>
            <li>RS Gokul Arun</li>
            <li>Aditya Gangwar</li>
            <li>Vinay Jain</li>
            <li>Kartik Londhe</li>
          </ul>
        </div> */}

<div className={styles.mainContent}>
          <span className={styles.mainSubHead}>College Chapters</span>
          <span className={styles.mainHead}>
            Our Collaborative Network Across Institutions
          </span>
          <div className={styles.line}></div>
          <span className={styles.mainDescription}>
            Explore the dynamic teams representing Vidkarya across different 
            college campuses. Each chapter brings unique perspectives and 
            talents, united by our shared vision of transforming education.
          </span>
        </div>

        <CollegeChaptersSection />


      </div>
    </>
  );
}
