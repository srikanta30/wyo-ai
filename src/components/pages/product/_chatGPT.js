import { useEffect, useState } from "react";
import ProductCollection from './productCollection'
import StyleCarousel from './_style_carousel';
import { API_BASE_URL, IMAGE_PATH } from '../../../config/config';
import { BANNED_WORDS } from '../../../const';
import axios from "axios";
function ChatGPT(prob) {
    const [allStyles, setAllStyles] = useState([]);
    const [selectedStyle, setSelectedStyle] = useState(null);
    const [promptInput, setPromptInput] = useState('');
    const [preloader, setPreloader] = useState(false);
    const [error, setError] = useState(false);
    const [allThemes, setAllThemes] = useState([]);
    const [selectedThemes, setSelectedThemes] = useState('');
    const [showTheme, setShowTheme] = useState(false);

    useEffect(() => {
        //get style data
        axios.get(API_BASE_URL + "mjAPI/getStyles")
            .then((res) => {
                setAllStyles(res.data);
            }).catch((err) => {
                console.log(err.message);
            })
    }, [])

    useEffect(() => {
        //get themes data
        axios.get(API_BASE_URL + "mjAPI/getThemes", { params: { print_type: '' } })
            .then((res) => {
                setAllThemes(res.data);
                console.log(res.data)
            }).catch((err) => {
                console.log(err.message);
            });
    }, []);

    //enable theme
    function showThemeBlock() {
        setShowTheme(true);
    }

    //get themes data
    function loadSuggestion() {
        axios.get(API_BASE_URL + "mjAPI/getSuggestionByTheme", { params: { theme: selectedThemes } })
            .then((res) => {
                setPromptInput(res.data.prompt);
            }).catch((err) => {
                console.log(err.message);
            });
    }

    //activate selected theme
    function updateSelctedTheme(e, theme) {
        setSelectedThemes(theme);
        const elements = document.getElementsByClassName('themeBadge');
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('active');
        }
        e.currentTarget.classList.add('active');
    }

    //set selected theme
    function setStyle(style) {
        setSelectedStyle(style);
    }

    function generatePrompt() {
        if (promptInput.length > 2) {
            if (findBadWords(promptInput)) {
                setError(true);
                alert('Bad word is not allowed');
            } else {
                setError(false);
                setPreloader(true);
                const inputData = selectedStyle !== null ? promptInput + ' in "' + selectedStyle + ' design style"' : promptInput;
                axios.get(API_BASE_URL + "chatGPT/generatePrompts", {
                    params: { promptInput: inputData }
                })
                    .then((res) => {
                        console.log(res.data);
                        prob.chatGPTStatus(res.data.promptData, 0);
                        setPreloader(false);
                        // setAllStyles(res.data);
                    }).catch((err) => {
                        console.log(err.message);
                    })
            }
        } else {
            alert('Write something');
        }
    }

    function findBadWords(promptInput) {
        const found = BANNED_WORDS.filter(word => promptInput.includes(word));
        return (found.length > 0) ? true : false;
    };


    return (
        <div className='chatGBTContainer text-center'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className=''>
                        <h3 className="ppTitle">Think of a word an our Ai Artist will come up with stunning designs for you!</h3>
                        {/* <p> Understand the basics of a <spna className="promptHelp">Good prompt</spna></p> */}
                        <div className="promptInputContainer mt-5">
                            <div className="text-right suggest-section">
                                <div className="text-right suggest-section">
                                    <h6 onClick={() => { showThemeBlock(); loadSuggestion() }}>Suggest <img src="s-icon.png" /></h6>
                                </div>
                                {
                                    showTheme === true && (
                                        <div className="text-left themeTab">
                                            <div className="themelabel">Please select a theme</div>
                                            {
                                                allThemes.map((row) =>
                                                    <span className="themeBadge" key={row.theme} onClick={(e) => updateSelctedTheme(e, row.theme)}>{row.theme}</span>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>
                            <input type="text" className='input-border' placeholder='Write what you think...' onInput={(e) => setPromptInput(e.target.value)} value={promptInput} />
                            {
                                error && (
                                    <div className="mt-1 text-danger">Bad word is not allowed.</div>
                                )
                            }
                        </div>
                        <div className="filterSection">
                            <h6 className="title active">Style</h6>
                            <StyleCarousel allStyles={allStyles} setStyle={setStyle} />
                        </div>
                        <div className='text-center mt-5'>
                            {
                                preloader ? <button className='btn main-btn' disabled><b>Please wait...</b></button>
                                    :
                                    <button className='btn main-btn' onClick={() => generatePrompt()}><b>Generate</b></button>
                            }
                        </div>
                    </div>
                    <div className="divider mt-5"></div>
                    <div className="text-center promptChoiseSection">
                        <p className="text-white">If you are a AI enthusiast</p>
                        <a href="">Write your own prompt </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ChatGPT;



































































