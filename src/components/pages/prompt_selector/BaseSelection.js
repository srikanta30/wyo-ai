import { useState, useEffect } from "react";
import { API_BASE_URL } from '../../../config/config';
import axios from "axios";
import { useSelector } from "react-redux";


const BaseSelection = function BaseSelection(probs) {
    const storeData = useSelector((state) => state);
    const {prePromptData, theme_id} = storeData.prompt;
    var theme_name = '';
    const [base_list, setBaseList ] = useState([]);
    const [baseVal, setBaseVal ] = useState('');
    const [error_msg, setErrorMsg ] = useState('');
    useEffect(() => {
        axios.get(API_BASE_URL + "prompt-generator/base-by-theme-id?id="+theme_id)
            .then((res) => {
                setBaseList(res.data);
            }).catch((err) => {
                console.log(err.message);
            })

    }, []);

    function viewEnbL2(){
        if(baseVal===''){
            setErrorMsg('This field is required.');
        }else{
            setErrorMsg('');
            //probs.levelsList.selection_base
            //to parent component
            const data = {resp: [false, false, true, false, false, false, false, false]};
            probs.updateEnbLevel(data);
            probs.setStageVal('base', baseVal);
        }
       
    }

    //back to last components
    function handleBack(){
        //to parent component
        const data = {resp: [true, false, false, false, false, false, false, false]};
        probs.updateEnbLevel(data);
    }

    // set theme field with suggested tag
    function  fillBaseBox(val){
        document.getElementById('baseId').value = val.fieldValue;
        setBaseVal(val.fieldValue);
    }
    //on input
    function handleDatalistChange(event){
        setBaseVal(event.target.value);
    };


    return (
        <div className="main-section">
            <div className="container">
                <div className="prompt-generator-container">
                    <div className="form-group">
                        <label>Choose Base</label>
                        <input list="base_list"  className="form-control" id="baseId" onInput={(e) =>handleDatalistChange(e)} />
                        <div className="error_msg">{error_msg}</div>
                        <div className="back-btn" onClick={()=> handleBack()}>Back</div>
                        
                        <datalist id="base_list">
                            {base_list.map((base) =>
                                <option key={base.field_value} value={base.field_value} />
                            )}
                        </datalist>
                    </div>
                    <div className="next-btn-container">
                        <button className="btn btn-sm btn-success" onClick={()=>viewEnbL2()}>Next</button>
                    </div>


                    {/* set theme list and suggestions */}
                    <div className="suggestion_container">
                        <span className="">Top Suggestion: </span>

                    {base_list.map((base) => {
                        const  fieldValue = base.field_value;
                        return (
                        <div><span onClick={()=>fillBaseBox({fieldValue})} className="suggestion_badge">{fieldValue}</span></div>
                        )
                        
                        })}
                    </div>{/* #end set theme list and suggestions */}
                </div>
            </div>
        </div>
    );
}


export default BaseSelection;