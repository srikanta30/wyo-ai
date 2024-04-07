import { useMediaQuery } from 'react-responsive';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useContext, useLayoutEffect, useRef, useState } from 'react';
import DialogContext from '../../contexts/DialogContext';
import Login from '../Login/Login';
import { isLoggedIn } from '../../utils/auth';

const NAVBAR_LINKS = {
  ABOUT_US: { name: 'About Us', link: '/about-us' },
  PRIVACY_POLICY: { name: 'Privacy Policy', link: '/privacy-policy' },
  T_N_C: { name: 'Terms and Conditions', link: '/terms-and-conditions' },
};
const NAVBAR_ACTIONABLE_LINKS = {
  SIGN_UP: { name: 'Sign Up' },
  LOG_IN: { name: 'Log In' },
};

export default function Navbar() {
  const navRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);
  const { setDialogBody } = useContext(DialogContext);

  const unableToFitNavbar = useMediaQuery({
    query: '(max-width: 1100px)',
  });

  const [navbarOpenened, setNavbarOpened] = useState(
    unableToFitNavbar ? false : null,
  );

  useLayoutEffect(() => {
    setNavHeight(navRef.current?.clientHeight ?? 0);
  }, [unableToFitNavbar, navRef.current?.clientHeight]);

  function openLoginDialog(loginDialogProps = {}) {
    setDialogBody(
      <Login
        onSuccesfullLogin={() => {
          setDialogBody(null);
        }}
        {...loginDialogProps}
      />,
    );
  }

  return (
    <>
      <div
        style={{
          width: '100%',
          height: `${navHeight}px`,
        }}
      ></div>
      <nav ref={navRef}>
        {unableToFitNavbar && (
          <button
            onClick={() => setNavbarOpened(true)}
            style={{ all: 'unset' }}
          >
            <Icon className="menu-icon" icon="bx:menu-alt-left"></Icon>
          </button>
        )}

        <Link to="/" as="h1">
          <h2>
            <img
              src="https://d1ejm5im4bv2vf.cloudfront.net/pub/media/mf_webp/png/media/logo/stores/1/WYO_logo_option2_1_1_.webp"
              alt="Wear Your Opinion"
              style={{
                background: '#22233B',
                padding: '8px',
                borderRadius: '8px',
              }}
            />
          </h2>
        </Link>

        {navbarOpenened && (
          <button
            onClick={() => setNavbarOpened(false)}
            className="close-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="17"
              viewBox="0 0 40 17"
              fill="none"
            >
              <path
                d="M8 2L21 15"
                stroke="#6F6EF6"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M8.43506 15.0005L21.4351 2.00049"
                stroke="#6F6EF6"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
        <div className={'nav-links ' + (navbarOpenened ? 'open-nav' : '')}>
          <Link to={NAVBAR_LINKS.ABOUT_US.link} className="nav-link">
            {NAVBAR_LINKS.ABOUT_US.name}
          </Link>
          <Link to={NAVBAR_LINKS.PRIVACY_POLICY.link} className="nav-link">
            {NAVBAR_LINKS.PRIVACY_POLICY.name}
          </Link>
          <Link to={NAVBAR_LINKS.T_N_C.link} className="nav-link">
            {NAVBAR_LINKS.T_N_C.name}
          </Link>
          {!isLoggedIn() && (
            <>
              <button
                onClick={() => openLoginDialog({ signUp: true })}
                className="nav-link actionable-link"
              >
                {NAVBAR_ACTIONABLE_LINKS.SIGN_UP.name}
              </button>

              <button
                onClick={() => openLoginDialog()}
                className="nav-link actionable-link login-button"
              >
                {NAVBAR_ACTIONABLE_LINKS.LOG_IN.name}
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
