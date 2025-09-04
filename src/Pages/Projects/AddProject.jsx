import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { Navbar } from '../../Components';
import { Autocomplete } from '@mui/material';
import styles from './add.module.css';
import skillsList from '../../data/skillsList.js';
import { sendReqToServer } from '../../Hooks/useAxios';
import { useToasts } from './../../Components/UI/toast';
import { axios, PROJECTS } from '../../api';
import { AppStates } from '../../Context/appContext.jsx';
import { uploadImageToCloud } from '../../Helpers';

export default function Add() {
  const { user } = AppStates();
  const [notify] = useToasts();
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    projectLink: '',
  });

  const handleSkillChange = (event, newSkills) => {
    setSelectedSkills(newSkills);
  };

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleUpload() {
    try {
      const imageUrl = await uploadImageToCloud(selectedImage, 'ProjectLogos');

      const { response } = await sendReqToServer({
        axiosInstance: axios,
        url: PROJECTS.create,
        method: 'POST',
        requestConfig: {
          name: formData.name,
          userid: user._id,
          link: formData.projectLink,
          description: formData.description,
          photoURL: imageUrl,
          skillsRequired: selectedSkills,
        },
      });

      // onSuccess
      if (response) {
        notify({
          type: 'PROMISE',
          message: 'Project Uploaded',
        });
      }

      navigate('/projects/dashboard');
    } catch (err) {
      console.error(err);
      notify({
        type: 'ERROR',
        message: 'Error in Uploading',
      });
    }
  }

  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <Paper
          elevation={3}
          sx={{
            marginRight: '15%',
            marginLeft: '15%',
            justifyContent: 'center',
            borderRadius: '20px',
          }}
        >
          <Box sx={{ padding: 5 }}>
            <Typography
              className={styles.title}
              variant="h5"
              gutterBottom
              sx={{ paddingBottom: 5, fontWeight: '600' }}
            >
              Add New Project
              <hr className={styles.hr} />
            </Typography>

            <Grid container spacing={3}>
              {/* Project Name */}
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontWeight: 700,
                  }}
                >
                  Project Name
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  required
                  id="title"
                  label="Name"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                  name="name"
                  value={formData.name}
                  onChange={handleOnChange}
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontWeight: 700,
                  }}
                >
                  Description
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  fullWidth
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleOnChange}
                />
              </Grid>

              {/* Project Link */}
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontWeight: 700,
                  }}
                >
                  Project Link
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  id="url"
                  label="URL"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                  name="projectLink"
                  value={formData.projectLink}
                  onChange={handleOnChange}
                />
              </Grid>

              {/* Skills */}
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontWeight: 700,
                  }}
                >
                  Skills Required
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <Autocomplete
                  multiple
                  id="skills-input"
                  options={skillsList}
                  freeSolo
                  value={selectedSkills}
                  onChange={handleSkillChange}
                  renderInput={(params) => (
                    <TextField {...params} label="Skills" variant="outlined" fullWidth />
                  )}
                />
              </Grid>

              {/* Project Logo */}
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontWeight: 700,
                  }}
                >
                  Project Logo
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={4}>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={(event) => setSelectedImage(event.target.files[0])}
                />

                {selectedImage && (
                  <div>
                    <p> &nbsp; </p>
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected"
                      width="200"
                      height="200"
                    />
                  </div>
                )}
              </Grid>

              <Grid item xs={12} sm={6} />
              <Grid item xs={12} sm={4} />

              {/* submit section */}
              <Grid className={styles.submit_container} item xs={12} sm={5}>
                <Button
                  className={styles.custom_button1}
                  onClick={handleUpload}
                  variant="contained"
                  fullWidth
                >
                  Upload Project
                </Button>
                <Button
                  className={styles.custom_button2}
                  onClick={() => navigate('/projects/dashboard')}
                  variant="contained"
                  fullWidth
                >
                  Cancel
                </Button>
              </Grid>

              <Grid item xs={12} sm={5} />
            </Grid>
          </Box>
        </Paper>
      </div>
    </>
  );
}
