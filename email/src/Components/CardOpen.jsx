import React from "react";
import styles from "./cardopen.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getEmailBodyData } from "../Redux/action";
import moment from "moment";

export const CardOpen = ({id,item,handleFav}) => {
    const body = useSelector(state => state.app.body);
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.app.isLoading);

    let date = moment(item.date).format('DD/MM/YYYY h:mma');
    
    React.useEffect(() => {
        dispatch(getEmailBodyData(id))
    }, [id]);
    let initial = item.from?.name[0];
    initial = initial.toUpperCase();
    
    return (
        <>
            <div className={styles.container}>
                <div className={styles.circle}>
                    <p className={styles.initial}>{ initial}</p>
                </div>
                <div className={styles.innerBody}>
                    <div className={styles.date}>
                        <div>
                            <span className={styles.name}>{item?.from.name}</span>
                            <p >{date }</p>
                        </div>
                        <div>
                            <button onClick={()=>handleFav(id)} className={styles.selected}>Mark as Favorite</button>
                        </div>
                    </div>
                    <div>
                    {
                        isLoading?<div>...loading Email body</div>:<p>{body}</p>
                    }
                        
                    </div>
                </div>
            </div>
        </>
    )
}