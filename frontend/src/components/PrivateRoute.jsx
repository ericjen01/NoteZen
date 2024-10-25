import { useLocation, Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const { children } = props
  const isLoggedIn = localStorage.getItem('savedUser') !== null;
  const location = useLocation()

  return isLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate
      to="/login"
      replace={true}
      state={{ from: `${location.pathname}${location.search}` }}
    />
  )
}

export default PrivateRoute