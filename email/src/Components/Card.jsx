import React from "react";
import moment from "moment";
import styles from "./Card.module.css"

export const Card = ({ item ,handleBody }) => {
    let date = moment(item.date).format('DD/MM/YYYY h:mma');
    let initial = item.from?.name[0];
    initial= initial.toUpperCase();
    return (
        <>
           
            <div onClick={()=>handleBody(item.id)} className={item.read?styles.container1:styles.container}>
                <div>
                    <div className={styles.circle}><p className={styles.initial}>{ initial}</p></div>
                </div>
                <div className={styles.innerbody}>
                    <p >From:<span className={styles.text}>{item?.from.name}{'<' }{item?.from.email}{'>'}</span></p>
                    <p >Subject:<span className={styles.text}>{item.subject }</span></p>
                    <p>{ item.short_description}</p>
                    <p>{ date} <span> { }</span></p>
                </div>              
            </div>
              
        </>
    )
}