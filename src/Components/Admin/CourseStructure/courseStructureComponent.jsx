import React from 'react';
import '../css/UploadNotes.css';

const courseStructure = () => {
  return (
    <>
      <div className="notes-form-section">
        <div className="container">
          <div className="notes-form-main-navbar">
            <div className="notes-form-heading">Create/Edit Course Structure</div>
            <div className="notes-form-cross-sign"></div>
          </div>
          <div>
            <div>
              <div className="notes-form-allInput">
                <div className="horizonInput">
                  <div className="horizonclassInput">
                    <div className="notes-form-input-labels">
                      <label className="notes-form-classlabel">
                        CourseCode<span style={{ color: 'red' }}>*</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      name="branch"
                      // value={notesDetails.branch}
                      // onChange={handleTextChange}
                    ></input>
                  </div>
                  <div className="horizonclassInput">
                    <div className="notes-form-input-labels">
                      <label className="notes-form-classlabel">
                        CourseName<span style={{ color: 'red' }}>*</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      name="college"
                      // value={notesDetails.college}
                      // onChange={handleTextChange}
                    ></input>
                  </div>
                </div>
                <div className="horizonInput">
                  <div className="horizonclassInput">
                    <div className="notes-form-input-labels">
                      <label className="notes-form-classlabel">
                        Instructor<span style={{ color: 'red' }}>*</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      name="branch"
                      // value={notesDetails.branch}
                      // onChange={handleTextChange}
                    ></input>
                  </div>
                  <div className="horizonclassInput">
                    <div className="notes-form-input-labels">
                      <label className="notes-form-classlabel">Teaching Assistants</label>
                    </div>
                    <input
                      type="text"
                      name="college"
                      // value={notesDetails.college}
                      // onChange={handleTextChange}
                    ></input>
                  </div>
                </div>
                <div className="horizonInput">
                  <div className="horizonclassInput">
                    <div className="notes-form-input-labels">
                      <label className="notes-form-classlabel">
                        Prerequisites<span style={{ color: 'red' }}>*</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      name="branch"
                      // value={notesDetails.branch}
                      // onChange={handleTextChange}
                    ></input>
                  </div>
                  <div className="horizonclassInput">
                    <div className="notes-form-input-labels">
                      <label className="notes-form-classlabel">Floated Since</label>
                    </div>
                    <input
                      type="text"
                      name="college"
                      // value={notesDetails.college}
                      // onChange={handleTextChange}
                    ></input>
                  </div>
                </div>
                <div className="notes-form-classInput">
                  <div className="notes-form-input-labels">
                    <label className="notes-form-classlabel">
                      Description<span style={{ color: 'red' }}>*</span>
                    </label>
                  </div>
                  <textarea
                    type="text"
                    name="description"
                    // value={notesDetails.description}
                    // onChange={handleTextChange}
                  ></textarea>
                </div>

                <div className="notes-form-classInput">
                  <div className="notes-form-input-labels">
                    <label className="notes-form-classlabel">
                      Top References<span style={{ color: 'red' }}>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    name="courseName"
                    // value={notesDetails.courseName}
                    // onChange={handleTextChange}
                  ></input>
                </div>

                <div className="notes-form-classInput">
                  <div className="notes-form-input-labels">
                    <label className="notes-form-classlabel">
                      Evaluation Scheme<span style={{ color: 'red' }}>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    name="resourceLink"
                    // value={notesDetails.resourceLink}
                    // onChange={handleTextChange}
                  ></input>
                </div>
                <div className="notes-form-classInput">
                  <div className="notes-form-input-labels">
                    <label className="notes-form-classlabel">Audit Requirements</label>
                  </div>
                  <input
                    type="text"
                    name="thumbnailUrl"
                    // value={notesDetails.thumbnailUrl}
                    // onChange={handleTextChange}
                  ></input>
                </div>
                <div className="btn_container">
                  <button className="uploadBtn"> Create/Edit </button>
                  <button className="cancleBtn">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default courseStructure;
