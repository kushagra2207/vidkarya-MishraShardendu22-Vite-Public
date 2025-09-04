import RateNotes from './Notes/RateNote'
import Footer from './Footer/Footer'
import NotesCard from './Notes/NotesCard'
import RelatedNotesCard from './cards/related-notes-card'
import DashboardNav from './Dashboard/DashboardNav'
import Events from './Dashboard/Events'
import ClassSchedule from './Dashboard/ClassSchedule'
import MessSchedule from './Dashboard/MessSchedule'
import Logo from './UI/Logo'
import LoginAndSignup from "./Login/LoginAndSignup"
import NotesCardMini from './Notes/NotesCardMini'
import ProjectCard from './Projects/ProjectCard'
import Navbar from './NavbarV2/Navbar'
import { EventComponent, NotesComponent, BlogComponent, UserComponent, NoticeComponent, CourseStructureComponent } from './Admin'
import ResetPassword from './Login/resetPassword'
import { signInwithGoogle } from './Auth/index'
import NotesCarousel from './Notes/NotesCarousel'
import NotesNavbar from './Notes/NotesNavbar'
import RecommendedNotes from './Notes/RecommendedNotes'
import NotesFilterPanel from './Notes/FilterPanel'
import ProjectsFilterPanel from "./Projects/FilterPanel"
import ProjectDashboardNav from './Projects/Dashboard/ProjectDashboardNav'
import MyApplications from './Projects/Dashboard/MyApplications'
import MyProjects from './Projects/Dashboard/MyProjects'
import ProjectsSkeleton from './loading-skeletons/projects-skeleton'
import NotesSkeleton from './loading-skeletons/notes-skeleton'
import BlogsSkeleton from './loading-skeletons/blogs-skeleton'
import UserNotesDashboard from './Profile/userNotesDashboard'
import UserBlogsDashboard from './Profile/userBlogsDashboard'
import UserNotesBookmarks from './Profile/userNotesBookmarks'
import UserBlogsBookmarks from './Profile/userBlogsBookmarks'
import UserProjectsBookmarks from './Profile/userProjectsBookmarks'
import MoreQPaperCard from './QuestionPapers/MoreQPaperCard'
import AlumniSkeleton from './loading-skeletons/alumni-skeleton'

export {
  Footer, RateNotes, NotesCard, RelatedNotesCard, Logo, NotesCardMini,
  RecommendedNotes, DashboardNav, Events, ClassSchedule,MessSchedule, LoginAndSignup, ResetPassword, NotesFilterPanel,
  signInwithGoogle,
  ProjectCard, ProjectsFilterPanel, ProjectDashboardNav, MyApplications, MyProjects,
  Navbar, EventComponent, BlogComponent, NotesComponent, UserComponent, NoticeComponent, CourseStructureComponent, NotesCarousel, NotesNavbar,
  NotesSkeleton,ProjectsSkeleton,BlogsSkeleton, UserBlogsBookmarks, UserProjectsBookmarks, UserNotesBookmarks
  ,UserBlogsDashboard, UserNotesDashboard,
  MoreQPaperCard, AlumniSkeleton
}
