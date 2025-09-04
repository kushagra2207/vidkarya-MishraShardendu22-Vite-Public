import React, { useContext, useState } from 'react';
import { GiNotebook } from 'react-icons/gi';
import { BiGitBranch, BiLinkAlt } from 'react-icons/bi';
import { MdOutlineSchool } from 'react-icons/md';
import { RiMenu3Line } from 'react-icons/ri';
import { sendReqToServer } from '../../../Hooks/useAxios';
import { NOTES, axios } from '../../../api';
import { VscLibrary } from 'react-icons/vsc';
import { RxCrossCircled } from 'react-icons/rx';
import { useToasts } from '../../UI/toast';
import '../css/UploadNotes.css';
import { NotesDetailsContext } from '../../../Context/notesContextApi.jsx';

function UploadNotes({ notesData, updateNotesDrawer: _updateNotesDrawer, setUpdateNotesDrawer }) {
  const { getAllNotes } = useContext(NotesDetailsContext);

  // const [name, setName] = useState("");
  // const [branch, setBranch] = useState("");
  // const [college, setCollege] = useState("");
  // const [coursename, setCourseName] = useState("");
  // const [discription, setDiscription] = useState("");
  // const [resourceLink, setResourceLink] = useState("");
  const [notesDetails, setNotesDetails] = useState({
    name: notesData?.name,
    branch: notesData?.branch,
    college: notesData?.college,
    description: notesData?.description,
    courseName: notesData?.coursename,
    resourceLink: notesData?.resourceLink,
    thumbnailUrl: notesData?.thumbnailUrl,
  });
  const [tags, setTags] = useState(notesData && notesData.tags ? notesData.tags : []);
  const [notify] = useToasts();
  const [disable, setDisable] = useState(false);

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value !== '') {
        setTags([...tags, value]);
        e.target.value = '';
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, branch, college, courseName, description, resourceLink, thumbnailUrl } =
      notesDetails;
    if (!name || !branch || !college || !courseName || !resourceLink) {
      // console.log(notesDetails)
      notify({
        type: 'ERROR',
        message: 'Please fill all the fields',
      });
      return;
    } else {
      try {
        setDisable(true);
        if (!notesData) {
          const { response } = await sendReqToServer({
            axiosInstance: axios,
            url: NOTES.create,
            method: 'POST',
            requestConfig: {
              data: {
                name,
                branch,
                college,
                email: 'vaghanibrij222@gmail.com',
                coursename: courseName,
                description,
                thumbnailUrl,
                resourceLink,
                tags,
              },
            },
          });
          if (response) {
            notify({
              type: 'PROMISE',
              message: 'Notes Uploaded',
            });
          }
          setDisable(false);
        } else {
          setDisable(true);
          // console.log(
          //   notesData._id,
          //   name,
          //   branch,
          //   college,
          //   courseName,
          //   description,
          //   thumbnailUrl,
          //   resourceLink,
          //   tags,
          // )
          const { response } = await sendReqToServer({
            axiosInstance: axios,
            url: NOTES.update,
            method: 'POST',
            requestConfig: {
              data: {
                _id: notesData._id,
                name,
                branch,
                college,
                coursename: courseName,
                description,
                resourceLink,
                tags,
              },
            },
          });
          if (response) {
            notify({
              type: 'PROMISE',
              message: 'Notes Created/Updated',
            });
            getAllNotes();
          }

          setDisable(false);
        }
      } catch {
        notify({
          type: 'ERROR',
          message: 'Upload failed !',
        });
      }
      setUpdateNotesDrawer(false);
    }
  };

  const handleTextChange = async (event) => {
    setNotesDetails({
      ...notesDetails,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className="notes-form-section">
        <div className="container">
          <div className="notes-form-main-navbar">
            <div className="notes-form-heading">Create/Edit Notes</div>
            <div className="notes-form-cross-sign">
              <RxCrossCircled onClick={() => setUpdateNotesDrawer(false)} />
            </div>
          </div>
          <div>
            <div>
              <div className="notes-form-allInput">
                <div className="notes-form-classInput">
                  <div className="notes-form-input-labels">
                    <GiNotebook />
                    <label className="notes-form-classlabel">
                      Name<span style={{ color: 'red' }}>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={notesDetails.name}
                    onChange={handleTextChange}
                    required
                  ></input>
                </div>

                <div className="horizonInput">
                  <div className="horizonclassInput">
                    <div className="notes-form-input-labels">
                      <BiGitBranch />
                      <label className="notes-form-classlabel">
                        Branch<span style={{ color: 'red' }}>*</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      name="branch"
                      value={notesDetails.branch}
                      onChange={handleTextChange}
                    ></input>
                  </div>
                  <div className="horizonclassInput">
                    <div className="notes-form-input-labels">
                      <MdOutlineSchool />
                      <label className="notes-form-classlabel">College</label>
                    </div>
                    <input
                      type="text"
                      name="college"
                      value={notesDetails.college}
                      onChange={handleTextChange}
                    ></input>
                  </div>
                </div>

                <div className="notes-form-classInput">
                  <div className="notes-form-input-labels">
                    <VscLibrary />
                    <label className="notes-form-classlabel">
                      Course<span style={{ color: 'red' }}>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    name="courseName"
                    value={notesDetails.courseName}
                    onChange={handleTextChange}
                  ></input>
                </div>

                <div className="notes-form-classInput">
                  <div className="notes-form-input-labels">
                    <BiLinkAlt />
                    <label className="notes-form-classlabel">
                      Notes(link)<span style={{ color: 'red' }}>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    name="resourceLink"
                    value={notesDetails.resourceLink}
                    onChange={handleTextChange}
                  ></input>
                </div>
                <div className="notes-form-classInput">
                  <div className="notes-form-input-labels">
                    <BiLinkAlt />
                    <label className="notes-form-classlabel">
                      Thumbnail(link)<span style={{ color: 'red' }}>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    name="thumbnailUrl"
                    value={notesDetails.thumbnailUrl}
                    onChange={handleTextChange}
                  ></input>
                </div>

                <div className="notes-form-classInput">
                  <div className="notes-form-input-labels">
                    <RiMenu3Line />
                    <label className="notes-form-classlabel">description</label>
                  </div>
                  <textarea
                    type="text"
                    name="description"
                    value={notesDetails.description}
                    onChange={handleTextChange}
                  ></textarea>
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <label className="notes-form-classlabel">Enter Tags</label>
                  <div className="tag-element">
                    <div className="tags-input-container" style={{ width: '97%', outline: 'none' }}>
                      {tags?.map((tag, index) => (
                        <div className="tag-item" key={index}>
                          <span>{tag}</span>
                          <span className="tag-item-close" onClick={() => removeTag(index)}>
                            &times;
                          </span>
                        </div>
                      ))}
                      <input
                        onKeyDown={handleKeyDown}
                        type="text"
                        className="tags-input"
                        placeholder="press enter to add multiple tags"
                      />
                    </div>
                  </div>
                </div>

                <div className="btn_container">
                  <button className="uploadBtn" onClick={handleSubmit} disabled={disable}>
                    {' '}
                    Create/Edit{' '}
                  </button>
                  <button className="cancleBtn" onClick={() => setUpdateNotesDrawer(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadNotes;
