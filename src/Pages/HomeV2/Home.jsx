import Resource_cards from '../../Components/ResourceCard/Resource_cards';
import styles from './home.module.css';
import TestimonialCards from '../../Components/Testimonial/TestimonialCards.jsx';
import HomeNav from '../../Components/NavbarV2/HomeNav';
import { HOME_ASSET } from '../../Assets/assetImages';

export default function Home() {
  return (
    <>
      <div className={styles.homeMainContainer}>
        <div className={styles.homeMainContainerImage}>
          <HomeNav />
          <div className={styles.homeImageContent}>
            {/* LEFT HOME CONTENT */}
            <div className={styles.left_homeImageContent}>
              <div className={styles.left_details}>
                <div className={styles.left_heading}>
                  Enhance your education with online resources
                </div>

                <div className={styles.left_content}>
                  Streamline your studies with our comprehensive platform for notes, blogs, and
                  projects
                </div>

                {/* LEARN MORE BTN */}
                {/* <button type="submit" className={styles.learnMoreBtn}>
                <Link to={'/notes'}>
                <div> Learn More </div>
                </Link>
                  <div>
                    {" "}
                    <BsArrowRight />{" "}
                  </div>
                </button> */}
              </div>
            </div>

            {/* RIGHT HOME CONTENT */}
            {/* <div className={styles.right_homeImageContent}>
              <div></div>
            </div> */}
          </div>
        </div>
        <div className={styles.details_vidkarya_hexagon}>
          <div className={styles.about_vidkarya}>
            <div>WHAT IS VIDKARYA?</div>
            <div style={{ fontFamily: 'Roboto', width: '70%' }}>
              Empowering students with digital learning resources
            </div>
            <div style={{ textAlign: 'justify' }}>
              Unlock your full potential as a college student with Vidkarya! Our comprehensive
              resources, including notes and mentorship, will empower you to excel in all aspects of
              your education. Whether you're looking to strengthen your multidisciplinary skills or
              simply boost your learning, Vidkarya has everything you need to succeed
            </div>
          </div>
          <div className={styles.hexagon_wrapper}>
            <div className={styles.hexagon + ' ' + styles.hex1} id="hex1">
              <img src={HOME_ASSET.hexagon1} />
            </div>
            <div className={styles.hexagon + ' ' + styles.hex2} id="hex2">
              <img src={HOME_ASSET.hexagon2} />
            </div>
            <div className={styles.hexagon + ' ' + styles.hex3} id="hex3">
              <img src={HOME_ASSET.hexagon3} />
            </div>
          </div>
          {/* <div className="hexagon-wrapper" style={{ display: "flex" }}>
              <div className={styles.hexagon_wrapper}>
                <div className={styles.hexagon + " " + styles.hex1} id="hex1">
                  <div style={{ zIndex: 10 }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img src={img2} alt="" className="w-12 h-8" />
                    </div>
                    Top-notch notes for your academic success
                  </div>
                </div>
              </div>

              <div className={styles.hexagon_wrapper}>
                <div className={styles.hexagon + " " + styles.hex2} id="hex2">
                  <div style={{ zIndex: 10 }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img src={img2} alt="" className="w-12 h-8" />
                    </div>
                    Top-notch notes for your academic success
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.hexagon_wrapper}>
              <div className={styles.hexagon + " " + styles.hex3} id="hex3">
                <div style={{ zIndex: 10 }}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img src={img2} alt="" className="w-12 h-8" />
                  </div>
                  Top-notch notes for your academic success
                </div>
              </div>
            </div> */}
        </div>
      </div>
      <div className={styles.vidkarya_statics}>
        <div>
          <div className={styles.stats_no}>2002</div>
          <div className={styles.stats_summary}>Top-notch notes for you academic success</div>
        </div>
        <div>
          <div className={styles.stats_no}>95%</div>
          <div className={styles.stats_summary}>Top-notch notes for you academic success</div>
        </div>
        <div>
          <div className={styles.stats_no}>185</div>
          <div className={styles.stats_summary}>Top-notch notes for you academic success</div>
        </div>
        <div>
          <div className={styles.stats_no}>2002</div>
          <div className={styles.stats_summary}>Top-notch notes for you academic success</div>
        </div>
      </div>
      <div className={styles.resources}>
        <div className={styles.resourcesHeading}>Our Resources</div>
        <div className={styles.allCards}>
          <Resource_cards
            title="Notes"
            img={HOME_ASSET.notesCard}
            to={'/notes'}
            content={
              'Elevate academic success by leveraging the power of top-notch notes, your key to effective learning and achievement'
            }
          />
          <Resource_cards
            title={'Projects'}
            to={'/projects'}
            img={HOME_ASSET.projectCard}
            content={
              'Collaborate with fellow developers to craft something extraordinary through project development'
            }
          />
          <Resource_cards
            title={'Blogs'}
            to={'/blog'}
            img={HOME_ASSET.blogsCard}
            content={
              'Explore a plethora of blogs spanning various topics for in-depth knowledge and insights'
            }
          />
        </div>
      </div>
      <div className={styles.features}>
        <div className={styles.featureDesktop}></div>
        <div className="md:w-[60%] ">
          <div className={styles.featureHeading}>Features</div>
          <ul className={styles.list}>
            <li>
              <img src={HOME_ASSET.learn} />
            </li>
            <li>
              <img src={HOME_ASSET.grow} />
            </li>
            <li>
              <img src={HOME_ASSET.blog} />
            </li>
            <li>
              <img src={HOME_ASSET.collab} />
            </li>
            <li>
              <img src={HOME_ASSET.profile} />
            </li>
            <li>
              <img src={HOME_ASSET.schedule} />
            </li>
            <li>
              <img src={HOME_ASSET.updates} />
            </li>
            <li>
              <img src={HOME_ASSET.more} />
            </li>
          </ul>
        </div>
      </div>
      {/* <div className={styles.Carousel}>
        <TestimonialCards />
      </div> */}
      {/* </div> */}
      {/* </div> */}
    </>
  );
}
