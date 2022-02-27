import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmailData } from "../Redux/action";
import { Card } from "./Card";
import styles from "./home.module.css";
import { setBody } from "../Redux/action";
import { CardOpen } from "./CardOpen";

export const Home = () => {
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(1);
    const list = useSelector(state => state.app.list);
    const [showBody, setShowBody] = useState(false);
    const [ele,setEle] = useState({})
    const [bodyId, setBodyId] = useState(0);
    useEffect(() => {
        dispatch(getEmailData(page))
    }, [page]);

    const handleBody = (id) => {
        let newList = list.map((el) => {
            return el.id === id ? { ...el, read: true, body: true } : { ...el, body: false }
        });
        setBodyId(id);
        dispatch(setBody(newList));
    }
    useEffect(() => {
        list.forEach(element => {
            if (element.id === bodyId)
            {
                setShowBody(element.body);
                setEle(element)
            }
        });
    }, [bodyId]);
    const handlePage = (no) => {
        setPage(prev=>prev+no)
    }
    return (
        <>
             
            <div className={styles.container} >
            <div className ={styles.heading}>
                <div className={styles.main}>Filter by:</div>
                <div className={styles.selected}>Unread</div>
                <div>Read</div>
                <div>Favorites</div>
                </div>
                <div className={showBody?styles.cardContainer:null}>
            <div>
                {
                    list.map((el) => {
                        return <Card key={el.id} item ={el} handleBody={handleBody} />
                    })
                }
                    </div>
                    {    
               showBody? <CardOpen id={bodyId} item={ele} />:null
            }
                    
            </div>
           
            </div>
            <button onClick={()=>handlePage(-1)} disabled={page<=1} className={styles.selected}>Prev page</button>
            <button className={styles.selected}>{ page}</button>
            <button onClick={() => handlePage(1)} disabled={page >= 2} className={styles.selected}>Next page</button>
            <br/>
            <br/>
            <br/>
        </>
    )
}