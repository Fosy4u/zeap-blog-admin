// import { FirebaseLogin } from '../features/auth/SessionRoutes';
import Default404Page from "../features/404/Default404Page";
import { RouteInterface } from "../interface/interface";
import Dashboard from "../features/dashboard/Dashboard";
import SignIn from "../features/Authentication/SignIn";
import MyProfile from "../features/profile";
import Posts from "../features/posts";
import AddPostModal from "../features/posts/view/AddPost";
import Post from "../features/posts/view/Post";
import Authors from "../features/authors";

// Define all routes for the app here.
const routes: RouteInterface[] = [
  {
    path: "/",
    component: Dashboard,
    isDefault: true,
  },
  {
    path: "/posts",
    component: Posts,
  },
  {
    path: "/authors",
    component: Authors,
  },
  {
    path: "/posts/:status",
    component: Posts,
  },
  {
    path: "/post/:blogPostId",
    component: Post,
  },
  {
    path: "/posts/add",
    component: AddPostModal,
  },
  {
    path: "/posts/add/:blogPostId",
    component: AddPostModal,
  },
  {
    path: "/404/",
    component: Default404Page,
    //isDefault: true,
  },

  {
    path: "/SignIn",
    component: SignIn,
  },
  {
    path: "/profile",
    component: MyProfile,
  },
];

export default routes;
