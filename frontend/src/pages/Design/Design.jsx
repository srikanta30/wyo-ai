import './Design.css';
import { useContext, useEffect, useState } from 'react';
import horizonaLine from '../../assets/horizontal-line.svg';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from '../../utils/makeRequest';
import {
  getStylesMethod,
  getSuggestionFromThemeMethod,
  getThemesMethod,
} from '../../constants/apiUrls';
import MessageContext from '../../contexts/MessageContext';
import { MESSAGE_LEVELS } from '../../constants/enums';
import OrderDataContext from '../../contexts/OrderDataContext';

export default function Design() {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const [clickSuggestions, setClickSuggestions] = useState(false);

  const [styles, setStyles] = useState([]);
  const [themes, setThemes] = useState([]);

  const { addMessage } = useContext(MessageContext);
  const { orderData, setOrderData } = useContext(OrderDataContext);

  const getAndSetThemesAndStyles = async () => {
    try {
      const responses = await Promise.all([
        makeRequest(getStylesMethod()),
        makeRequest(getThemesMethod()),
      ]);
      setStyles(responses[0].data);
      setThemes(responses[1].data);
    } catch (err) {
      console.error(err);

      const errorMessage =
        err?.response?.data?.status?.message ??
        'Something went wrong while fetching styles and themes';

      addMessage({
        level: MESSAGE_LEVELS.ERROR,
        message: errorMessage,
      });
    }
  };

  useEffect(() => {
    getAndSetThemesAndStyles();
  }, []);

  useEffect(() => {
    setPrompt((prev) => orderData?.prompt ?? prev);
    setSelectedStyle((prev) => orderData?.selectedStyle ?? prev);
    setSelectedTheme((prev) => orderData?.selectedTheme ?? prev);
  }, [orderData]);

  const handleSuggestionClick = () => {
    setClickSuggestions(!clickSuggestions);
  };

  const [activeTab, setActiveTab] = useState('style');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [selectedStyle, setSelectedStyle] = useState(null);

  const handleStyleClick = (style) => {
    setSelectedStyle((prevStyle) =>
      prevStyle?.id === style.id ? null : style,
    );
  };

  const [selectedTheme, setSelectedTheme] = useState(null);

  const updatePromptFromSuggestion = async (theme) => {
    try {
      const themeName = theme.theme;
      const res = await makeRequest(getSuggestionFromThemeMethod(themeName));
      setPrompt(res.data.prompt);
      setSelectedTheme(res.data.prompt);
    } catch (err) {
      const errorMessage =
        err?.response?.data?.status?.message ??
        'Something went wrong while fetching prompt suggestion';
      addMessage({
        level: MESSAGE_LEVELS.ERROR,
        message: errorMessage,
      });
    }
  };

  const generatePromptAndMoveAhead = async () => {
    if (!prompt?.trim()?.length) {
      addMessage({
        level: MESSAGE_LEVELS.ERROR,
        message: 'Please enter an input prompt',
      });
    }

    const inputPrompt =
      (prompt === selectedTheme ? 'Theme: ' : '') +
      prompt +
      (selectedStyle ? `, Style: ${selectedStyle.style_name}` : '');

    if (inputPrompt != orderData?.inputPrompt)
      delete orderData?.imagesData, delete orderData?.selectedImage;

    delete orderData?.customPrompt;

    setOrderData({
      ...orderData,
      prompt,
      selectedStyle,
      inputPrompt,
      selectedTheme,
    });

    navigate('/product-config');
  };

  return (
    <div className="design-body">
      <div className="design-body-top-container">
        <div className="design-body-description">
          <div className="design-body-title">
            Tell us what u want us to design our AI assistant will generate for
            u
          </div>
          <div className="design-body-subtitle">
            <span className="design-body-hyperlink pink-underline">
              Understand the basics of a Good Prompt
            </span>
          </div>
        </div>

        <div className="box-container">
          <div className="suggestion-container">
            <div
              onClick={handleSuggestionClick}
              className="suggestion-container-text"
              style={{
                cursor: 'pointer',
              }}
            >
              Need Suggestion?
            </div>
            {/* <img
              onClick={handleSuggestionClick}
              className="suggest-btn"
              src={suggestImg}
              alt="suggest"
            /> */}
          </div>
          {clickSuggestions && (
            <div className="suggestion-selection-container">
              <div className="suggestion-selection-content">
                {themes.map((theme) => (
                  <div
                    key={theme.theme}
                    onClick={() => updatePromptFromSuggestion(theme)}
                    title={'keep clicking to generate new'}
                    className="suggestion-selection"
                  >
                    {theme.theme}
                  </div>
                ))}
              </div>
            </div>
          )}
          <input
            className="design-body-input"
            placeholder="Italian pattern design "
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div
            style={{
              width: '100%',
              maxWidth: '863px',
            }}
          >
            {selectedStyle && <small>Style: {selectedStyle.style_name}</small>}
          </div>
          <div className="theme-selection-container">
            <div className="theme-selection-header">
              <div
                onClick={() => handleTabClick('style')}
                className="theme-selection"
              >
                <div className="theme-selection-text">
                  ✨ Select Design Style(s)
                </div>
              </div>
            </div>
            {activeTab === 'style' && (
              <div className="theme-selection-body">
                {styles.map((style) => (
                  <div key={style.id} className="theme-config">
                    <img
                      className={`${
                        style.id === selectedStyle?.id
                          ? 'theme-selected-config-img'
                          : ''
                      } theme-config-img`}
                      width={80}
                      height={80}
                      src={style.style_icon}
                      alt={`Theme ${style.id}`}
                      onClick={() => handleStyleClick(style)}
                    />
                    <p className="theme-name">{style.style_name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="design-body-button-container">
            <div
              className="design-body-button"
              onClick={() => {
                generatePromptAndMoveAhead();
              }}
            >
              <div className="design-body-text">Generate</div>
            </div>
          </div>
        </div>
        <img src={horizonaLine} alt="horizontal-line" />
      </div>

      <div className="design-footer">
        <div className="design-footer-title">If you are a AI enthusiast </div>
        <div
          className="design-footer-subtitle"
          onClick={() => {
            navigate('/custom-prompt');
          }}
        >
          write your own prompt
        </div>
      </div>
    </div>
  );
}
