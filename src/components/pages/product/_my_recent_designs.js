import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, IMAGE_PATH } from '../../../config/config';
const RecentDesign = (prob) => {

    const [designList, setDesignList] = useState([]);


    // get filters
    useEffect(() => {
        get_recent_designs();
    }, []);

    function get_recent_designs() {
        axios.get(API_BASE_URL + "mjAPI/recentDesigns", { params: {userId:0 } }) 
            .then((res) => {
                console.log(res.data );
                setDesignList(res.data)
            }).catch((err) => {
                console.log(err.message);
            })
    }


    return (
        <div className="recentDesignContainer">
            <h6>Recent Design</h6>
            <div className="row">
                {
                    designList.map((row, i)=>
                        <div className="col-md-3" key={'rdc'+i}>
                            <div className="imgContainer" onClick={()=> prob.applyRecentImage(row.image, row.message_id, row.message_hash)}>
                                <img src={API_BASE_URL + IMAGE_PATH +row.image} />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default RecentDesign;