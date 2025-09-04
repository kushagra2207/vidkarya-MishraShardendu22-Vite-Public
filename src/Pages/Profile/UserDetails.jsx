import React, { useEffect, useState } from 'react';
import { sendReqToServer } from '../../Hooks/useAxios';
import { USER, axios } from '../../api';

import { GoPencil, BsLinkedin, AiOutlineCopy } from '../../lib/icons';
import { truncateText } from '../../Helpers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
// import styles from "./add.module.css"
import Modal from 'react-modal';
import { useToasts } from '../../Components/UI/toast';
import { AppStates } from '../../Context/appContext.jsx';

export default function UserDetails() {
  const { user, setuser } = AppStates();
  const [_isCopied, setIsCopied] = useState(false);
  const [notify] = useToasts();
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editedBio, setEditedBio] = useState(user?.bio || '');
  useEffect(() => {
    setEditedBio(user?.bio);
  }, [user]);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(user?.refCode);
    setIsCopied(true);
    toast.success('Referral code copied!', {
      position: toast.POSITION.TOP_RIGHT,
    });
    // Reset the copied state after a certain period
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleEditBio = () => {
    setIsEditingBio(true);
  };

  const handleSaveBio = async () => {
    // e.preventDefault();
    try {
      const { response } = await sendReqToServer({
        axiosInstance: axios,
        url: `${USER.update}/${user._id}`,
        method: 'PUT',
        requestConfig: {
          bio: editedBio,
        },
      });
      if (response) {
        notify({
          type: 'PROMISE',
          message: 'Bio Updated',
        });
        setuser({ ...user, bio: editedBio });
      }
        } catch {
      console.log('Error');
      notify({
        type: 'ERROR',
        message: 'Error!',
      });
    }
    //   const response = await axios.put(`/api/users/update/${user.userid}`, {
    //     bio: editedBio,
    //   });
    //   if (response.status === 200) {
    //     console.log("Bio updated successfully");
    //   } else {
    //     console.error("Failed to update bio");
    //   }
    // } catch (error) {
    //   console.error("Error updating bio:", error.message);
    // }
    setIsEditingBio(false);
  };

  return (
    <>
      <div className="profile-main w-full m-5 rounded border">
        <div className="bg-user-img rounded">
          <img
            className="w-full h-52 object-cover rounded"
            src="https://media.istockphoto.com/photos/deep-space-background-picture-id178149253?k=20&m=178149253&s=612x612&w=0&h=TJOJWolz2MJt-QLH0jPvbl-Bz-4ySIvSTVdKoLP1lfg="
            alt=""
          />
        </div>

        <div className="p-5 md:w-5/5 mx-5">
          <div className="user-info ">
            <div className="dp-box ">
              <div className="w-40 h-40">
                <img
                  src={user && user.dpLink ? user.dpLink : '/asset/user.jfif'}
                  className="w-full h-full object-cover rounded"
                  alt=""
                />
              </div>
              <div className=" flex justify-left text-[#0064FB]">
                {/*<p style={{ fontSize: "15px" }}>change</p>*/}
                {/*<p style={{ fontSize: "15px" }}>remove</p>*/}
              </div>
            </div>

            <div className="mx-7 w-4/5">
              <p className="text-xl font-semibold">{user?.name}</p>
              <p className="my-0.5">
                {user?.email}
                {/* <span className="no-underline text-[#005C6A]"> | UX/UI designer </span> */}
              </p>
              {/* <div className="flex justify-between gap-4 p-3 ">
                <p className="text-2xl font-bold">Bio</p>
                <div className="p-1 flex underline text-[#005C6A] gap-3 items-center">
                  <p>Edit</p>
                  <GoPencil />
                </div>
              </div> */}
              <div className="about mt-5 flex justify-between gap-4">
                <p className="text-xl font-semibold"> About </p>
                <div className="p-1 flex underline text-[#005C6A] gap-3 items-center">
                  <p style={{ cursor: 'pointer' }} onClick={handleEditBio}>
                    Edit
                  </p>
                  <GoPencil style={{ cursor: 'pointer' }} onClick={handleEditBio} />
                </div>
              </div>
              <div className="md:flex justify-between items-start w-4/5">
                <p className="text my-2 text-justify">{truncateText(user?.bio, 40)}</p>
              </div>
            </div>
          </div>
          {/* Edit Bio Modal */}
          <Modal
            isOpen={isEditingBio}
            onRequestClose={() => setIsEditingBio(false)}
            contentLabel="Edit Bio Modal"
            style={{
              content: {
                width: '60%',
                height: 'fit-content',
                margin: 'auto',
                overflow: 'auto',
              },
            }}
          >
            <h1 className="font-bold" style={{ textAlign: 'center' }}>
              Edit Bio
            </h1>
            <div className="modal-content" style={{ width: '100%' }}>
              <label>Bio:</label>
              <textarea
                value={editedBio}
                onChange={(e) => {
                  // console.log("Textarea value:", e.target.value);
                  setEditedBio(e.target.value);
                }}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  padding: '8px',
                  height: '200px',
                  width: '100%',
                  marginBottom: '20px',
                  textAlign: 'left',
                }}
              />

              <Grid
                container
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between', // Adjusted to space between the buttons
                  alignItems: 'center',
                  width: '50%',
                  margin: 'auto', // Center the container horizontally
                }}
              >
                <Grid item xs={12} sm={5}>
                  <Button
                    style={{ backgroundColor: '#00A385', color: '#FFFFFF' }}
                    onClick={handleSaveBio}
                    variant="contained"
                    fullWidth
                  >
                    Save
                  </Button>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <Button
                    style={{ backgroundColor: '#FF5E5E', color: '#FFFFFF' }}
                    onClick={() => setIsEditingBio(false)}
                    variant="contained"
                    fullWidth
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>

              {/* <div className="modal-buttons">
                <button onClick={handleSaveBio}>Save</button>
                <button onClick={() => setIsEditingBio(false)}>Cancel</button>
              </div> */}
            </div>
          </Modal>

          <hr className="mt-5" />

          <div className="user-details p-3">
            <div className="flex justify-between gap-4 p-3 ">
              <p className="text-2xl font-bold">Your Account</p>
              {/* <div className="p-1 flex underline text-[#005C6A] gap-3 items-center">
                <p>Edit</p>
                <GoPencil />
              </div> */}
            </div>

            <div className="details-box md:w-[85%] p-3">
              <div>
                <p style={{ fontSize: '15px' }}>Username</p>
                <h1 style={{ fontSize: '15px' }} className="text-lg">
                  {user?.username}
                </h1>
              </div>
              <div>
                <p style={{ fontSize: '15px' }}>name</p>
                <h1 style={{ fontSize: '15px' }} className="text-lg">
                  {user?.name}
                </h1>
              </div>
              <div>
                <p style={{ fontSize: '15px' }}>Email</p>
                <h1 style={{ fontSize: '15px' }} className="text-lg">
                  {user?.email}
                </h1>
              </div>
              <div>
                <p style={{ fontSize: '15px' }}>Institute</p>
                <h1 style={{ fontSize: '15px' }} className="text-lg">
                  Indian Institute Of Information Technology Dharwad
                </h1>
              </div>
              <div className="flex items-center">
                <p style={{ fontSize: '15px' }}>Referral code</p>
                <h1 style={{ fontSize: '15px' }} className="text-lg flex items-center">
                  {user?.refCode}
                  <AiOutlineCopy
                    onClick={handleCopyClick}
                    style={{ cursor: 'pointer', marginLeft: '5px' }}
                  />
                </h1>
              </div>
            </div>
            <hr />

            <div className="user-social-links mt-6">
              <div className="flex justify-between gap-4 p-3 ">
                <p className="text-2xl font-bold">Social Links</p>
                <div className="p-1 flex underline text-[#005C6A] gap-3 items-center">
                  {/*<p>Edit</p>*/}
                  {/*<GoPencil />*/}
                </div>
              </div>

              <div className="link-logo ml-3 flex">
                <BsLinkedin size={30} color="blue" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
