import { useState, useEffect } from "react";
import { API_BASE_URL } from '../../../config/config';
import axios from "axios";
import { useSelector } from "react-redux";


const DesignStyleelection = function DesignStyleelection(probs) {
    var theme_name = '';
    const storeData =  useSelector((state) => state);
    const {prePromptData, theme_id} = storeData.prompt;
    const [des_list, setDesignStyleList ] = useState([]);
    const [styleVal, setStyleVal ] = useState('');
    const [error_msg, setErrorMsg ] = useState('');
    useEffect(() => {
        axios.get(API_BASE_URL + "prompt-generator/designstyle-by-theme-id?id="+theme_id)
            .then((res) => {
                setDesignStyleList(res.data);
            }).catch((err) => {
                console.log(err.message);
            })

    }, []);

    function viewFinal(){
        if(styleVal===''){
            setErrorMsg('This field is required.');
        }else{
            setErrorMsg('');
            //to parent component
            const data = {resp: [false, false, false, false, false, false, false, true]};
            probs.updateEnbLevel(data);
            probs.setStageVal('designStyle', styleVal);
        }
       
    }

    //back to last components
    function handleBack(){
        //to parent component
        const data = {resp: [false, false, false, false, true, false, false, false]};
        probs.updateEnbLevel(data);
    }


    // set theme field with suggested tag
    function fillDesignBox(val){
        document.getElementById('styleId').value = val.fieldValue;
        setStyleVal(val.fieldValue);
    }
     //on input
     function handleDatalistChange(event){
        setStyleVal(event.target.value);
    };


    return (
        <div className="main-section">
            <div className="container">
                <div className="prompt-generator-container">
                    <div className="form-group">
                        <label>Design / Style</label>
                        <input list="des_list"  className="form-control" id="styleId" onInput={(e) =>handleDatalistChange(e)} />
                        <div className="error_msg">{error_msg}</div>
                        <div className="back-btn" onClick={()=> handleBack()}>Back</div>
                        
                        <datalist id="des_list">
                            {des_list.map((row) =>
                                <option key={row.field_value} value={row.field_value} />
                            )}
                        </datalist>
                    </div>
                    <div className="next-btn-container">
                        <button className="btn btn-sm btn-success" onClick={()=>viewFinal()}>Next</button>
                    </div>


                    {/* set theme list and suggestions */}
                    <div className="suggestion_container">
                        <span className="">Top Suggestion: </span>

                    {des_list.map((row) => {
                        const  fieldValue = row.field_value;
                        return (
                        <div><span onClick={()=>fillDesignBox({fieldValue})} className="suggestion_badge">{fieldValue}</span></div>
                        )
                        
                        })}
                    </div>{/* #end set theme list and suggestions */}
                </div>
            </div>
        </div>
    );
}


export default DesignStyleelection;