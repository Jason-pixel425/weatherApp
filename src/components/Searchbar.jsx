import { useState, useMemo, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from '../styles/SearchBarStyles/SearchBar.module.css';
import _ from 'lodash';

export default function SearchBar({handleSearch, id='', labelText=''}) {
    const [input, setInput] = useState("");
    const [searchData, setSearchData] = useState([])
    // Use useMemo to create a persistent debounce
    const fetchData = useMemo(
        () =>
            _.debounce(async (query) => {
                try {
                    const response = await fetch(`https://weatherapp-1-lddj.onrender.com/api/searchweather?query=${query}`);
                    if (!response.ok) throw new Error('Failed to fetch data');
                    const data = await response.json();
                   
                    setSearchData(data)
                } catch (error) {
                    console.error('Error fetching search results:', error);
                }
            }, 300), // Wait 300ms after typing stops
        []
    );

    // Cancel any pending debounced calls
    useEffect(() => {
        return () => {
            fetchData.cancel(); 
        };
    }, [fetchData]);

    const handleChange = (value) => {
        setInput(value)
        if (value.length > 3){
            fetchData(value)
        }
    }

    return (
        <section className={styles["search_section"]}>
            <label className={styles["label-search"]} for={id}>{labelText}</label>
            <div className={styles["search_input_div"]}>
                
                <input id={id} className={styles["search_input"]} placeholder="Type to search..." value={input} onChange={(e) => handleChange(e.target.value)} />
            
                {/* <div className={styles['search_icon']}>
                    <FaSearch  />
                </div> */}
            </div>
            <div className={styles['search_result']}>
                {
                searchData?.map(result => {
                    return <p className={styles["search_suggestion_line"]} onClick={() => handleSearch(result.properties.lat, result.properties.lon)}>
                        {result.properties.formatted}
                    </p>
                    })
                }

            </div>
        </section>
    )
}