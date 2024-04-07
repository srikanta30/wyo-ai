import { useContext, useEffect, useState } from 'react';
import { AUTH_TOKEN_STORAGE_KEY } from '../../constants/constants';
import DialogContext from '../../contexts/DialogContext';
import { getFromStorage } from '../../utils/storage';
import Login from '../Login/Login';
import { Link } from 'react-router-dom';

export default function SecureRoute({ children }) {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(getFromStorage(AUTH_TOKEN_STORAGE_KEY)),
  );
  const { setDialogBody } = useContext(DialogContext);

  useEffect(() => {
    if (!loggedIn)
      setDialogBody(
        <Login
          onSuccesfullLogin={() => {
            setLoggedIn(true);
            setDialogBody(null);
          }}
        />,
      );
  }, [loggedIn, setDialogBody]);

  return loggedIn ? (
    children
  ) : (
    <h2
      style={{
        textAlign: 'center',
        display: 'flex',
        height: '85vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      Please &nbsp;
      <Link className="pink-underline" to="/">
        Login/SignUp
      </Link>
      &nbsp; to continue
    </h2>
  );
}
