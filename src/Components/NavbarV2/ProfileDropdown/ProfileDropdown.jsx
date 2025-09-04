import { Link, useNavigate } from 'react-router-dom';
import styles from './profileDropdown.module.css';
import { extractFirstName } from '../../../Helpers/index';
import { NAVBAR_ASSET } from '../../../Assets/assetImages';
// import DefaultUserDP from "../../../Assets/Images/Navbar/DefaultUserDP.svg"
import { useToasts } from '../../UI/toast';
import { AppStates } from '../../../Context/appContext.jsx';
// import useOnClickOutside from "../../../Hooks/useOnClickOutside"
import { FaRegUser } from 'react-icons/fa';
import { IoSettingsOutline, IoExitOutline } from 'react-icons/io5';

function ProfileDropdown() {
  const { user, setuser } = AppStates();
  const [notify] = useToasts();
  const _navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();

    // Clear session from Local Storage
    localStorage.clear();

    // Clear User from Context
    setuser(null);

    notify({
      type: 'SUCCESS',
      message: 'Signed Out',
    });
  }

  return (
    <div className={`${styles['menu-container']}`}>
      <button className={styles['menu-button']}>
        <img src={user?.dpLink === '' ? NAVBAR_ASSET.userLogo : user?.dpLink} alt="Avatar" />
        <span className={styles.userName}>{extractFirstName(user?.name)}</span>
      </button>

      <div className={styles['menu-dropdown']}>
        <div className={styles.content}>
          <ul className={styles.menuListContainer}>
            <Link to="/profile/user" className={styles['menu-item']}>
              <FaRegUser className={styles.navLogoIcon} /> Profile
            </Link>

            <Link to="/profile/settings" className={styles['menu-item']}>
              <IoSettingsOutline className={styles.navLogoIcon} /> Settings
            </Link>

            <Link
              className={styles['menu-item']}
              onClick={(e) => {
                handleLogout(e);
              }}
            >
              <IoExitOutline className={styles.navLogoIcon} /> Logout
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProfileDropdown;
