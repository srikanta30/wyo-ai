import { Link } from 'react-router-dom';
import './Login.css';
import { useState, useContext } from 'react';
import { makeRequest } from '../../utils/makeRequest';
import {
  registerAndSendOtpMethod,
  sendOTPMethod,
  verifyOTPMethod,
} from '../../constants/apiUrls';
import MessageContext from '../../contexts/MessageContext';
import { MESSAGE_LEVELS } from '../../constants/enums';
import { setInStorage } from '../../utils/storage';
import {
  AUTH_TOKEN_STORAGE_KEY,
  LOGGED_IN_USER_DATA_STORAGE_KEY,
} from '../../constants/constants';

export default function Login({ onSuccesfullLogin = () => {} }) {
  const { addMessage } = useContext(MessageContext);

  const [loginNumber, setLoginNumber] = useState(null);
  const [signUp, setSignUp] = useState(true);

  async function sendOTP(e) {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const { loginNumber, loginName } = Object.fromEntries(formData);

      await makeRequest(
        signUp
          ? registerAndSendOtpMethod(loginName, loginNumber)
          : sendOTPMethod(loginNumber),
      );

      addMessage({
        level: MESSAGE_LEVELS.SUCCESS,
        message: 'OTP Sent to your number',
      });

      setLoginNumber(loginNumber);
    } catch (error) {
      if (error?.response?.data?.status?.message) {
        addMessage({
          level: MESSAGE_LEVELS.ERROR,
          message: error.response.data.status.message,
        });
        return;
      }

      addMessage({
        level: MESSAGE_LEVELS.ERROR,
        message: 'something went wrong',
      });
    }
  }

  async function verifyOTP(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { loginOTP } = Object.fromEntries(formData);

    try {
      const response = await makeRequest(
        verifyOTPMethod(loginNumber, loginOTP),
      );
      addMessage({
        level: MESSAGE_LEVELS.SUCCESS,
        message: 'OTP Verified',
      });

      setInStorage(LOGGED_IN_USER_DATA_STORAGE_KEY, response.data.user);
      setInStorage(AUTH_TOKEN_STORAGE_KEY, response.data.token);

      onSuccesfullLogin();
    } catch (error) {
      addMessage({
        level: MESSAGE_LEVELS.ERROR,
        message: 'something went wrong',
      });
    }
  }

  return (
    <div className="login">
      <p style={{ fontWeight: '600', fontSize: '20px' }}>
        Enter your details to continue
      </p>
      <p>Your data is safe with us. we promise not to spam you</p>
      <br />
      {signUp && !loginNumber && (
        <form
          onSubmit={sendOTP}
          style={{
            width: '100%',
          }}
        >
          <label htmlFor="login-name">Full Name</label>
          <br />
          <input
            className="login-input"
            type="text"
            id="login-name"
            name="loginName"
            placeholder="Jhon doe"
            required
          />
          <br />
          <br />
          <label htmlFor="login-number">Phone Number</label>
          <br />
          <input
            className="login-input"
            type="tel"
            id="login-number"
            placeholder="9999299992"
            name="loginNumber"
            pattern="\d{10}"
            required
          />
          <br />
          <br />
          <br />
          <input
            type="checkbox"
            id="login-accept-terms"
            name="acceptedTerms"
            required
          />
          <label htmlFor="login-accept-terms">
            &nbsp; I have read and accept the{' '}
            <Link className="terms-link" to="">
              terms of service
            </Link>
          </label>
          <br />
          <br />
          <small>
            <button
              onClick={() => setSignUp(false)}
              style={{ cursor: 'pointer' }}
              className="pink-underline"
            >
              log in instead
            </button>
          </small>
          <br />
          <br />
          <button type="submit" className="submit-button">
            Get OTP
          </button>
        </form>
      )}

      {!signUp && !loginNumber && (
        <form
          onSubmit={sendOTP}
          style={{
            width: '100%',
          }}
        >
          <label htmlFor="login-number">Phone Number</label>
          <br />
          <input
            className="login-input"
            type="tel"
            id="login-number"
            placeholder="9999299992"
            name="loginNumber"
            pattern="\d{10}"
            required
          />
          <br />
          <br />
          <small>
            <button
              onClick={() => setSignUp(true)}
              style={{ cursor: 'pointer' }}
              className="pink-underline"
              type="reset"
            >
              sign up instead
            </button>
          </small>

          <br />
          <br />
          <button type="submit" className="submit-button">
            Get OTP
          </button>
        </form>
      )}

      {Boolean(loginNumber) && (
        <form
          onSubmit={verifyOTP}
          style={{
            width: '100%',
          }}
        >
          <label htmlFor="login-otp">OTP</label>
          <br />
          <input
            className="login-input"
            type="tel"
            id="login-otp"
            placeholder="123456"
            name="loginOTP"
            pattern="\d{6}"
            required
          />
          <br />
          <br />
          <br />
          <button type="submit" className="submit-button">
            Verify OTP
          </button>
        </form>
      )}
    </div>
  );
}
