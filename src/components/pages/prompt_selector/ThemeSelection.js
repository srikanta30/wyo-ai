import { useState, useEffect } from "react";
import { API_BASE_URL } from '../../../config/config';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {setThemeId} from '../../../services/action/promptAction'


const ThemeSelection = function ThemeSelection(probs) {
    let themeArr = [];
    const dispatch = useDispatch();
    const storeData = useSelector((state) => state);

    const [theme_list, setThemeList ] = useState([]);
    const [themeVal, setThemeVal ] = useState('');
    const [error_msg, setErrorMsg ] = useState('');
    useEffect(() => {
        axios.get(API_BASE_URL + "prompt-generator/all-themes")
            .then((res) => {
                setThemeList(res.data);
            }).catch((err) => {
                console.log(err.message);
            })

    }, []);


    // set theme field with suggested tag
    function fillThemeBox(val){
        document.getElementById('theme').value = val.theme_name;
        setThemeVal(val.theme_name);
    }

    
    function viewEnbL1(){
        if(themeVal==''){
            setErrorMsg('This field is required.');
        }else{
            setErrorMsg('');
            //to parent component
            const data = {resp: [false, true, false, false, false, false, false, false]};
            probs.updateEnbLevel(data);
            probs.setStageVal('theme', themeVal);
            if(themeArr[themeVal] !=='undefined') { 
                dispatch(setThemeId(themeArr[themeVal]));
            }else{
                dispatch(setThemeId(''));
            }
        }
    }

    theme_list.map((theme) => {
        themeArr [theme.theme_name] = theme.id;
    });

    function handleDatalistChange(event){
        setThemeVal(event.target.value);
    };


    return (
        <div className="main-section">
            <div className="container">
                <div className="prompt-generator-container">
                    <div className="form-group">
                        <label>Choose Theme</label>
                        <input list="theme_list" name="theme" className="form-control" value={themeVal} id="theme" onInput={(e) =>handleDatalistChange(e)} required />
                        <div className="error_msg">{error_msg}</div>
                        <datalist id="theme_list">
                            {theme_list.map((theme) =>
                                <option key={theme.theme_name} value={theme.theme_name} />
                            )}
                        </datalist>
                    </div>
                    <div className="next-btn-container">
                        <button className="btn btn-sm btn-success" onClick={()=>viewEnbL1()}>Next</button>
                    </div>


                    {/* set theme list and suggestions */}
                    <div className="suggestion_container">
                        <span className="">Top Suggestion: </span>

                    {theme_list.map((theme) => {
                        const  theme_name = theme.theme_name;
                        return (
                        <div key={theme.id}><span onClick={()=>fillThemeBox({theme_name})} className="suggestion_badge">{theme_name}</span></div>
                        )
                        
                        })}
                    </div>{/* #end set theme list and suggestions */}
                </div>
            </div>
        </div>
    );
}


export default ThemeSelection;