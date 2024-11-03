import { FaRegUser } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.jsx";
import Hamburger from "./Hamburger/Hamburger.jsx";
import style from "./Header.module.scss";

const Header = () => {
  const { pathname } = useLocation();
  const { isAuth } = useAuth();
  return (
    <div className={style.header}>
      {pathname !== "/" ? (
        <button>
          <Link to="/">
            <MdArrowBack style={{ fontSize: "2rem" }} />
          </Link>
        </button>
      ) : (
        <button>
          <Link to={isAuth ? "/profile" : "/auth"}>
            <FaRegUser style={{ fontSize: "2rem" }} />
          </Link>
        </button>
      )}
      <Hamburger />
    </div>
  );
};

export default Header;
