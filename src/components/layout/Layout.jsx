import { useAuth } from "../../hooks/useAuth.jsx";
import Header from "./header/Header.jsx";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const { isAuth } = useAuth();
  return (
    <div>
      {isAuth && <Header />}
      {children && <div>{children}</div>}
    </div>
  );
};

export default Layout;
