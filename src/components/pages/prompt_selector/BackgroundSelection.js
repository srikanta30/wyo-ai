import { useState, useEffect } from "react";
import { API_BASE_URL } from '../../../config/config';
import axios from "axios";
import { useSelector } from "react-redux";


const BackgroundSelection = function BackgroundSelection(probs) {
    var theme_name = '';
    const storeData =  useSelector((state) => state);
    const {prePromptData, theme_id} = storeData.prompt;
    const [bg_list, setBgList ] = useState([]);
    const [bgVal, setBgVal ] = useState('');
    useEffect(() => {
        axios.get(API_BASE_URL + "prompt-generator/background-by-theme-id?id="+theme_id)
            .then((res) => {
                setBgList(res.data);
            }).catch((err) => {
                console.log(err.message);
            })

    }, []);

    function viewEnbL5(){
        //to parent component
        const data = {resp: [false, false, false, false, false, true, false, false]};
        probs.updateEnbLevel(data);
        probs.setStageVal('bg', bgVal);
    }

    //back to last components
    function handleBack(){
        //to parent component
        const data = {resp: [false, false, false, true, false, false, false, false]};
        probs.updateEnbLevel(data);
    }


    // set theme field with suggested tag
    function fillBackgroundBox(val){
        document.getElementById('bgId').value = val.fieldValue;
        setBgVal(val.fieldValue);
    }

    //on input
    function handleDatalistChange(event){
        setBgVal(event.target.value);
    };


    return (
        <div className="main-section">
            <div className="container">
                <div className="prompt-generator-container">
                    <div className="form-group">
                        <label>Background</label>
                        <input list="bg_list"  className="form-control" id="bgId" onInput={(e) =>handleDatalistChange(e)} />
                        <div className="back-btn" onClick={()=> handleBack()}>Back</div>
                        <datalist id="bg_list">
                            {bg_list.map((row) =>
                                <option key={row.field_value} value={row.field_value} />
                            )}
                        </datalist>
                    </div>
                    <div className="next-btn-container">
                        <button className="btn btn-sm btn-success" onClick={()=>viewEnbL5()}>Next</button>
                    </div>


                    {/* set theme list and suggestions */}
                    <div className="suggestion_container">
                        <span className="">Top Suggestion: </span>

                    {bg_list.map((row) => {
                        const  fieldValue = row.field_value;
                        return (
                        <div><span onClick={()=>fillBackgroundBox({fieldValue})} className="suggestion_badge">{fieldValue}</span></div>
                        )
                        
                        })}
                    </div>{/* #end set theme list and suggestions */}
                </div>
            </div>
        </div>
    );
}


export default BackgroundSelection;