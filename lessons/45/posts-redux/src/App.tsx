import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import Posts from "./components/Posts";
import { BrowserRouter as Router, Routes, Route, Redirect, NavLink } from "react-router-dom";
import ThemeButton from "./components/ThemeButton";
import classNames from "classnames/bind";
import Users from "./components/Users";
import PostDetails from "./components/PostDetails";
import Comments from "./components/Comments";
import useTypedSelector from "./hooks";
// import { useActions } from "./hooks/useActions";
import Modal from "./components/Modal";

let cx = classNames.bind(styles);

function App() {
  const { theme } = useTypedSelector((state) => state.theme);
  const [modalActive, setModalActive] = useState<boolean>(false);
  // const { fetchPosts, fetchUsers, fetchComments } = useActions();

  // useEffect(() => {
  //   fetchPosts();
  //   fetchUsers();
  //   fetchComments("1");
  // }, []);

  return (
    <Router>
      <div className="App">
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
            <ThemeButton />
          </ul>
        </header>
        <div
          className={cx({
            app: true,
            appDark: theme,
          })}
        >
          <Routes>
            <Route path="/posts">
              <Posts active setActive={setModalActive} />
              <Modal active={modalActive} setActive={setModalActive} />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/posts/:postId">
              <PostDetails />
            </Route>
            <Route path="/posts/:postId/comments">
              <Comments />
            </Route>
            <Redirect from="/" to="/posts" />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
