import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmailData } from "../Redux/action";
import { Card } from "./Card";
import styles from "./home.module.css";
import { setBody,setFav,setFilter } from "../Redux/action";
import { CardOpen } from "./CardOpen";

let init = {
    filterRead: false,
    filterUnRead: false,
    filterFav: false,
    reset:false
}
export const Home = () => {
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(1);
    const list = useSelector(state => state.app.list);
    const [showBody, setShowBody] = useState(false);
    const [ele,setEle] = useState({})
    const [bodyId, setBodyId] = useState(0);
    const [filter, setShowFilter] = useState(false);
    const filterData = useSelector(state => state.app.filterList);
    const [filterButton, setFilterButton] = useState(init);

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

    const handleFav = (id) => {
        let newList = list.map((el) => {
            return el.id === id ? {...el,favorite:!el.favorite} : el;
        });
        if (filter === true)
        {
            let filterList = filterData.map((el) => {
                return el.id === id ? {...el,favorite:!el.favorite} : el;
            });
            dispatch(setFilter(filterList));
        }
        dispatch(setFav(newList));
    }

    const reusable = (updatedData) => {
        setShowFilter(true);
        let newList = updatedData.map((el) => {
            return el.id === bodyId ? { ...el, body: false } : el
        });
        setShowBody(false)
        dispatch(setFilter(newList));
    }

    const handleFilterByUnread = () => {

        let updatedData = list.filter((el) => el.read === false);
        reusable(updatedData)
        setFilterButton({...filterButton,filterUnRead:true,filterRead:false,filterFav:false,reset:false})
    }

    const handleFilterByRead = () => {
        let updatedData = list.filter((el) => el.read === true);
        reusable(updatedData)
        setFilterButton({...filterButton,filterRead:true,filterUnRead:false,filterFav:false,reset:false})
    }

    const handleFilterFav = () => {
        let updatedData = list.filter((el) => el.favorite === true);
        reusable(updatedData)   
        setFilterButton({...filterButton,filterFav:true,filterRead:false,filterUnRead:false,reset:false})
    }

    const handleFilterReset = () => {
        setShowFilter(false);
        setFilterButton({...filterButton,filterFav:false,filterRead:false,filterUnRead:false,reset:true})
    }

    return (
      <>
        <div className={styles.container}>
          <div className={styles.heading}>
            <div className={styles.main}>Filter by:</div>
            <div onClick={()=>handleFilterByUnread("filterUnRead")} className={filterButton.filterUnRead?styles.selected:null}>
              Unread
            </div>
            <div onClick={handleFilterByRead} className={filterButton.filterRead?styles.selected:null}>Read</div>
            <div onClick={handleFilterFav} className={filterButton.filterFav?styles.selected:null}>Favorites</div>
            <div onClick={handleFilterReset} className={filterButton.reset?styles.selected:null}>Reset</div>
          </div>
          <div className={showBody ? styles.cardContainer : null}>
            <div>
            {filter?filterData.map((el) => {
                return <Card key={el.id} item={el} handleBody={handleBody} />;
              }):list.map((el) => {
                return <Card key={el.id} item={el} handleBody={handleBody} />;
              })                          
            } 
            </div>
            {showBody ? (
              <CardOpen id={bodyId} item={ele} handleFav={handleFav} />
            ) : null}
          </div>
        </div>
        <button
          onClick={() => handlePage(-1)}
          disabled={page <= 1}
          className={styles.selected}
        >
          Prev page
        </button>
        <button className={styles.selected}>{page}</button>
        <button
          onClick={() => handlePage(1)}
          disabled={page >= 2}
          className={styles.selected}
        >
          Next page
        </button>
        <br />
        <br />
        <br />
      </>
    );
}