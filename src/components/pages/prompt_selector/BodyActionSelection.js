import { useState, useEffect } from "react";
import { API_BASE_URL } from '../../../config/config';
import axios from "axios";
import { useSelector } from "react-redux";


const BodyActionSelection = function BodyActionSelection(probs) {
    var theme_name = '';
    const storeData =  useSelector((state) => state);
    const {prePromptData, theme_id} = storeData.prompt;
    const [bodyaction_list, setBodyActList ] = useState([]);
    const [bodyActVal, setBodyActVal ] = useState('');
    useEffect(() => {
        axios.get(API_BASE_URL + "prompt-generator/bodyaction-by-theme-id?id="+theme_id)
            .then((res) => {
                setBodyActList(res.data);
            }).catch((err) => {
                console.log(err.message);
            })

    }, []);

    function viewEnbL4(){
        //to parent component
        const data = {resp: [false, false, false, false, true, false, false, false]};
        probs.updateEnbLevel(data);
        probs.setStageVal('action', bodyActVal);
    }

    //back to last components
    function handleBack(){
        //to parent component
        const data = {resp: [false, false, true, false, false, false, false, false]};
        probs.updateEnbLevel(data);
    }


    // set theme field with suggested tag
    function fillBodyActBox(val){
        document.getElementById('bodyActId').value = val.fieldValue;
        setBodyActVal(val.fieldValue);
    }

    //on input
    function handleDatalistChange(event){
        setBodyActVal(event.target.value);
    };


    return (
        <div className="main-section">
            <div className="container">
                <div className="prompt-generator-container">
                    <div className="form-group">
                        <label>Body Action / Poses</label>
                        <input list="bodyaction_list"  className="form-control" id="bodyActId" onInput={(e) =>handleDatalistChange(e)} />
                        <div className="back-btn" onClick={()=> handleBack()}>Back</div>
                        <datalist id="bodyaction_list">
                            {bodyaction_list.map((row) =>
                                <option key={row.field_value} value={row.field_value} />
                            )}
                        </datalist>
                    </div>
                    <div className="next-btn-container">
                        <button className="btn btn-sm btn-success" onClick={()=>viewEnbL4()}>Next</button>
                    </div>


                    {/* set theme list and suggestions */}
                    <div className="suggestion_container">
                        <span className="">Top Suggestion: </span>

                    {bodyaction_list.map((row) => {
                        const  fieldValue = row.field_value;
                        return (
                        <div><span onClick={()=>fillBodyActBox({fieldValue})} className="suggestion_badge">{fieldValue}</span></div>
                        )
                        
                        })}
                    </div>{/* #end set theme list and suggestions */}
                </div>
            </div>
        </div>
    );
}


export default BodyActionSelection;