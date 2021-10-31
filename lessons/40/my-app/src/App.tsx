import React, { useContext, useEffect, useState } from "react";
import styles from "./app.module.css";
import ButtonShowMore from "./Components/ButtonShowMore";
import Modal from "./Components/Modal";
import Row from "./Components/Row";
import ThemeButton from "./Components/ThemeButton";
import { AuthorIdProvider, LoadedContext, ThemeContext, VarProvider } from "./myContext";
import { Comments, Posts, UsersT } from "./types";
import classNames from "classnames/bind";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  NavLink,
  useParams,
} from "react-router-dom";
import Users from "./Components/Users";
import PostDetails from "./Components/postDetails";

let cx = classNames.bind(styles);

function App() {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [theme] = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState<UsersT[]>([]);
  const [users, setUsers] = useState<Posts[]>([]);
  const [comments, setComments] = useState<Comments[]>([]);
  const [loaded, setLoaded] = useContext(LoadedContext);

  const loadAuthors = async () => {
    try {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((res): Promise<UsersT[]> => {
          return res.json();
        })
        .then((authorList) => {
          return setAuthor(authorList);
        })
        .catch((error) => console.log(error));
    } catch (err) {
      console.log(err);
    }
  };

  const loadPosts = async () => {
    try {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res): Promise<Posts[]> => {
          return res.json();
        })
        .then((userList) => {
          return setUsers(userList), setLoaded(() => true);
        })
        .catch((error) => console.log(error));
    } catch (err) {
      console.log(err);
    }
  };

  const loadComments = async () => {
    try {
      fetch("https://jsonplaceholder.typicode.com/comments")
        .then((res): Promise<Comments[]> => {
          return res.json();
        })
        .then((comments) => {
          return setComments(comments);
        })
        .catch((e) => console.log(e));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadAuthors();
    loadPosts();
    loadComments();
    setLoading(() => true);
  }, []);

  return (
    <Router>
      <VarProvider>
        <AuthorIdProvider>
          <header>
            <ul className={styles.navigationBar}>
              <li>
                <NavLink to="/posts" activeClassName={styles.activeLink}>
                  <p className={styles.nav}>Posts </p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/users" activeClassName={styles.activeLink}>
                  <p className={styles.nav}> Users</p>
                </NavLink>
              </li>
            </ul>
          </header>
          <div
            className={cx({
              app: true,
              appDark: theme,
            })}
          >
            <Switch>
              <Route path="/users" exact>
                <ThemeButton />
                <Users author={author} />
              </Route>
              <Route path="/posts/:postId" exact>
                <PostDetails posts={users} comments={comments} />
              </Route>
              <Route path="/posts" strict>
                <ThemeButton />
                <Row active setActive={setModalActive} author={author} posts={users} />
                <ButtonShowMore />
                <Modal active={modalActive} setActive={setModalActive} author={author} />
              </Route>
              <Redirect from="/" to="/posts" />
            </Switch>
          </div>
        </AuthorIdProvider>
      </VarProvider>
    </Router>
  );
}

export default App;
