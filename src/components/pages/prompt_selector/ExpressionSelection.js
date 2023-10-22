import { useState, useEffect } from "react";
import { API_BASE_URL } from '../../../config/config';
import axios from "axios";
import { useSelector } from "react-redux";


const ExpressionSelection = function ExpressionSelection(probs) {
    var theme_name = '';
    const storeData =  useSelector((state) => state);
    const {prePromptData, theme_id} = storeData.prompt;
    const [exp_list, setExpList ] = useState([]);
    const [expVal, setExpVal ] = useState('');
    useEffect(() => {
        axios.get(API_BASE_URL + "prompt-generator/expression-by-theme-id?id="+theme_id)
            .then((res) => {
                setExpList(res.data);
            }).catch((err) => {
                console.log(err.message);
            })

    }, []);

    function viewEnbL3(){
        //to parent component
        const data = {resp: [false, false, false, true, false, false, false, false]};
        probs.updateEnbLevel(data);
        probs.setStageVal('expr', expVal);
    }

    //back to last components
    function handleBack(){
        //to parent component
        const data = {resp: [false, true, false, false, false, false, false, false]};
        probs.updateEnbLevel(data);
    }


    // set theme field with suggested tag
    function fillExpressionBox(val){
        document.getElementById('expId').value = val.fieldValue;
        setExpVal(val.fieldValue);
    }

    //on input
    function handleDatalistChange(event){
        setExpVal(event.target.value);
    };


    return (
        <div className="main-section">
            <div className="container">
                <div className="prompt-generator-container">
                    <div className="form-group">
                        <label>Expression</label>
                        <input list="exp_list"  className="form-control" id="expId" onInput={(e) =>handleDatalistChange(e)} />
                        <div className="back-btn" onClick={()=> handleBack()}>Back</div>
                        <datalist id="exp_list">
                            {exp_list.map((row) =>
                                <option key={row.field_value} value={row.field_value} />
                            )}
                        </datalist>
                    </div>
                    <div className="next-btn-container">
                        <button className="btn btn-sm btn-success" onClick={()=>viewEnbL3()}>Next</button>
                    </div>


                    {/* set theme list and suggestions */}
                    <div className="suggestion_container">
                        <span className="">Top Suggestion: </span>

                    {exp_list.map((row) => {
                        const  fieldValue = row.field_value;
                        return (
                        <div><span onClick={()=>fillExpressionBox({fieldValue})} className="suggestion_badge">{fieldValue}</span></div>
                        )
                        
                        })}
                    </div>{/* #end set theme list and suggestions */}
                </div>
            </div>
        </div>
    );
}


export default ExpressionSelection;