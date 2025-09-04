const USER = {
  get: '/api/users/get/:userid',
  create: '/api/users/create',
  updatePassword: '/api/users/password/:userid',
  update: '/api/users/update',
  forgotPassword: '/api/users/forgotpassword',
  deactivate: '/api/users/deactivate/:userid',
  isMailPublic: '/api/users/mailPrivacy/:userid',
};

const ANNOUNCEMENT = {
  create: '/api/noticeboard/create',
  get: '/api/noticeboard/get',
};

const AUTH = {
  login: '/api/auth/user/login',
  emailVerify: '/api/auth/mailoptions/mailVerification',
  resetPassword: '/api/auth/mailoptions/resetpassword',
  googleLogin: '/api/auth/google/login',
  sessionAuth: '/api/auth/session/verify',
};

const NOTES = {
  pagination: 'api/notes/pagination',
  getRecommandedNotes: 'api/notes/getRecommandedNotes',
  getTopCategory: 'api/notes/getTopCategory',
  get: '/api/notes/get/:notesid',
  create: '/api/notes/create',
  like: '/api/notes/like/',
  save: '/api/notes/save/',
  search: '/api/notes/search',
  filter: '/api/notes/get/filter',
  addQuestion: '/api/notes/questions/:notesid',
  getQuestion: '/api/notes/questions/:notesid',
  disableQuestion: '/api/notes/comment/:notesid/disable',
  getAllNotes: '/api/notes/getallnotes',
  delete: '/api/notes/delete/:notesid',
  update: '/api/notes/update',
  updateViews: '/api/notes/updateviews/:notesid',
  getRateAccess: '/api/notes/get/rate/access/:notesId/:userId',
  countReviews: '/api/notes/get/review/:notesId',
  rate: '/api/notes/rate',
};

const PROJECTS = {
  pagination: 'api/projects/pagination',
  get: '/api/projects/get/:projectid',
  filter: '/api/projects/get/filter',
  applications: '/api/projects/get/applications',
  myprojects: '/api/projects/get/myprojects',
  stageUpdate: '/api/projects/stageupdate',
  create: '/api/projects/create',
  apply: '/api/projects/apply',
};

const BLOGS = {
  create: '/api/blog/create',
  get: '/api/blog/get/:blogid',
  getAll: '/api/blog/getAll',
  search: '/api/blog/search',
  searchTag: '/api/blog/searchTag',
  pagenation: 'api/blog/pagenation',
  getMyBlogs: '/api/get/myblogs',
};

const EVENTS = {
  create: '/api/events/create',
  update: '/api/events/update',
  delete: '/api/events/delete',
  upcoming: '/api/events/get/upcomingevents',
  completed: '/api/events/get/completedevents',
  edit: '/api/events/get',
  register: '/api/events/register',
};

const CAREER = {
  getHackathon: '/api/hackthon/getHackthon',
  getJob: '/api/job/getJob',
  getInternship: '/api/internship/getInternship',

  makeHackathon: '/api/hackthon/makeHackthon',
  makeJob: '/api/job/makeJob',
  makeInternship: '/api/internship/makeInternship',

  deleteHackathon: '/api/hackthon/deleteHackthon/:id',
  deleteJob: '/api/job/deleteJob/:id',
  deleteInternship: '/api/internship/deleteInternship/:id',

  markInternshipCompleted: '/api/internship/markInternshipAsCompleted/:id',
  markJobAsCompleted: '/api/job/markJobAsCompleted/:id',
  markHackathonAsCompleted: '/api/hackthon/markHackathonAsCompleted/:id',
};

const EventExtra = {
  mockInterviewRegister: '/api/interview/mock-interview-registration',

  registeredMockName: '/api/interview/students-registered-mock-interview/:name',
  registeredMockNamePortfolio: '/api/portfolio/portfolio-registered/:name',

  registerPortfolio: '/api/portfolio/portfolio-registration',
  registeredstudent: '/api/career/students-registered-resume/:name',
  submitResume: '/api/career/submit-resume',

  uploadResumeGetLink: '/api/resume/submit-resume',
  uploadEventAsset: '/api/asset/UploadEventAsset',
};

export { AUTH, NOTES, USER, EVENTS, ANNOUNCEMENT, BLOGS, PROJECTS, CAREER, EventExtra };
