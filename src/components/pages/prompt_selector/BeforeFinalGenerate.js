import { useState, useEffect } from "react";
import { API_BASE_URL, IMAGE_PATH } from '../../../config/config';
import axios from "axios";
//import { ask, getMessages, saveImage } from '../../_api/midjourneyApi';
import { useSelector } from "react-redux";


const BeforeFinalGenerate = function BeforeFinalGenerate(probs) {
    var theme_name = '';
    const storeData =  useSelector((state) => state);
    const {prePromptData} = storeData.prompt;
    const [prompt_data, setPromptData ] = useState(prePromptData+ ' ,isolated on white background');
    const [promptResult, setPromptResult ] = useState();
    const [upScaleResult, setUpScale ] = useState();
    useEffect(() => {
        // axios.get(API_BASE_URL + "mjAPI/ask", {params:{ promptData: prompt_data}})
        // .then((res) => {
        //     setPromptResult(res.data);
        //     console.log(promptResult)
        //     }).catch((err) => {
        //         console.log(err.message);
        //     })
    }, []);

    function up_scale(index, message_id, message_hash){
        axios.get(API_BASE_URL + "mjAPI/upScale", {
            params:{ 
                index: index, 
                message_id: message_id,
                message_hash: message_hash
            }
        })
        .then((res) => {
            setUpScale(res.data);
            console.log(res)
        }).catch((err) => {
            console.log(err.message);
        })
    }
   
    return (
        <div className="main-section">
            <div className="container">
                <div className="prompt-generator-container">
                    <div className="text-center text-success">Your choice: <span style={{fontSize:'12px'}}>{probs.promptData}</span></div>
                    <p className="text-warning text-center">Please wait while we are generating awesome design...</p>
                    {/* show image level 1 */}
                    <div className="imageResult">
                        {promptResult && !upScaleResult?
                        <div>
                        <div className="option_up_scale">
                            <button className="btn btn-sm btn-secondary" onClick={()=>up_scale(1, promptResult.message_id, promptResult.message_hash)}>Image 1</button>
                            <button className="btn btn-sm btn-secondary" onClick={()=>up_scale(2, promptResult.message_id, promptResult.message_hash)}>Image 2</button>
                            <button className="btn btn-sm btn-secondary" onClick={()=>up_scale(3, promptResult.message_id, promptResult.message_hash)}>Image 3</button>
                            <button className="btn btn-sm btn-secondary" onClick={()=>up_scale(4, promptResult.message_id, promptResult.message_hash)}>Image 4</button>
                        </div>
                        <img alt="wyo" src={API_BASE_URL+ IMAGE_PATH + promptResult.fileName} /></div>
                        :
                        ''}
                    </div>
                    {/* upscale */}
                    <div className="imageResult">
                        {upScaleResult?
                        <div>
                        <img alt="wyo" src={API_BASE_URL+ IMAGE_PATH + upScaleResult.fileName} />
                        </div>
                        :
                        ''}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default BeforeFinalGenerate;