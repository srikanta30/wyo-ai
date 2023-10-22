import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from '../../../config/config';
import ThemeSelection from './ThemeSelection'
import BaseSelection from './BaseSelection'
import ExpressionSelection from './ExpressionSelection'
import BodyActionSelection from './BodyActionSelection'
import BackgroundSelection from './BackgroundSelection'
import DesignStyleSelection from './DesignStyleSelection'
import BeforeFinalGenerate from './BeforeFinalGenerate'
import { useDispatch, useSelector } from "react-redux";
import {updateLevelStage,updatePrePromptData} from '../../../services/action/promptAction';



function Home() {

    const dispatch = useDispatch();
    const storeData = useSelector((state) => state);
    const {prePromptData, theme_id} = storeData.prompt;
    

    //states
    const [themeLevels, setThemeLevels] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(1);
    const [enableTheme, setEnbTheme] = useState(true);
    const [enableL1, setEnbL1] = useState(false);
    const [enableL2, setEnbL2] = useState(false);
    const [enableL3, setEnbL3] = useState(false);
    const [enableL4, setEnbL4] = useState(false);
    const [enableL5, setEnbL5] = useState(false);
    const [enableL6, setEnbL6] = useState(false);
    const [enableFinal, setEnableFinal] = useState(false);

    //individual data states
    //const [prompt_data, setPromptData] = useState('');
    const [theme_val, setThemeVal] = useState('');
    const [base_val, setBaseVal] = useState('');
    const [expression_val, setExprVal] = useState('');
    const [bodyAction_val, setBodyActionVal] = useState('');
    const [bg_val, setBgVal] = useState('');
    const [designStyle_val, setDesignStlVal] = useState('');
    
    // enable component
    function updateEnbLevel(data){
        setEnbTheme(data.resp[0]);
        setEnbL1(data.resp[1]);
        setEnbL2(data.resp[2]);
        setEnbL3(data.resp[3]);
        setEnbL4(data.resp[4]);
        setEnbL5(data.resp[5]);
        setEnbL6(data.resp[6]);
        setEnableFinal(data.resp[7]);
         
    }

    
    useEffect(()=>{
        //update prompt data
        updatePromptData();
    }, [theme_val, base_val, expression_val, bodyAction_val, bg_val, designStyle_val  ]);

    useEffect(()=>{
        axios.get(API_BASE_URL + "prompt-generator/levels-by-theme-id?id="+theme_id)
        .then((res) => {
           //setThemeLevels(res.data);
           let levelsList = [];
           res.data.map((row)=>{
            levelsList[row.selection_order] = row.table_name;
           });
           setThemeLevels(levelsList);
           dispatch(updateLevelStage(levelsList))
        }).catch((err) => {
            console.log(err.message);
        });
    }, [theme_val]);

    //update prompt data
    function updatePromptData(){
        let list = '';
        if(theme_val!==''){list = list+theme_val}
        if(base_val!==''){list = list+','+base_val}
        if(expression_val!==''){list = list+','+expression_val}
        if(bodyAction_val!==''){list = list+','+bodyAction_val}
        if(bg_val!==''){list = list+','+bg_val}
        if(designStyle_val!==''){list = list+','+designStyle_val}
        //setPromptData(list);
        dispatch(updatePrePromptData(list));
        
    }

    //update index data
    function updateCurrentIndex(currIndex){
        setCurrentIndex(currentIndex+currIndex);
    }

    //set each stage value
    function  setIndvidualStageVal(stg, value){
        if(stg=='theme'){setThemeVal(value); }
        if(stg=='base'){setBaseVal(value);}
        if(stg=='expr'){setExprVal(value)}
        if(stg=='action'){setBodyActionVal(value)}
        if(stg=='bg'){setBgVal(value)}
        if(stg=='designStyle'){setDesignStlVal(value)}
    }



   return (
    <>
       {enableTheme===true ? <ThemeSelection updateEnbLevel = {updateEnbLevel}  updatePromptData = {updatePromptData} setStageVal = {setIndvidualStageVal} /> : ''}
       {enableL1===true ? <BaseSelection updateEnbLevel = {updateEnbLevel}  updatePromptData = {updatePromptData} setStageVal = {setIndvidualStageVal} /> : ''}
       {enableL2===true ? <ExpressionSelection updateEnbLevel = {updateEnbLevel}  updatePromptData = {updatePromptData} setStageVal = {setIndvidualStageVal}  /> : ''}
       {enableL3===true ? <BodyActionSelection updateEnbLevel = {updateEnbLevel}  updatePromptData = {updatePromptData} setStageVal = {setIndvidualStageVal}/> : ''}
       {enableL4===true ? <BackgroundSelection updateEnbLevel = {updateEnbLevel}  updatePromptData = {updatePromptData} setStageVal = {setIndvidualStageVal} /> : ''}
       {enableL5===true ? <DesignStyleSelection updateEnbLevel = {updateEnbLevel}   updatePromptData = {updatePromptData} setStageVal = {setIndvidualStageVal}/> : ''}

       {enableFinal===true ? <BeforeFinalGenerate  /> : ''}
    </>
   )
}


export default Home;