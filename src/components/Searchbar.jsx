import { useState, useMemo, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from '../styles/SearchBarStyles/SearchBar.module.css';
import _ from 'lodash';

export default function SearchBar() {
    const [input, setInput] = useState("");

    // Use useMemo to create a persistent debounced function
    const fetchData = useMemo(() =>
        _.debounce((value) => {
            fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&apiKey=`)
                .then(resp => resp.json())
                .then(data => console.log(data))
                .catch(err => console.error("API Error:", err));
        }, 1000), []); // Empty dependency array ensures it's created once

    useEffect(() => {
            return () => {
                fetchData.cancel(); // Cancel any pending debounced calls
            };
    }, [fetchData]);
    const handleChange = (value) => {
        setInput(value)
        if (value.length > 3){
            fetchData(value)
        }
    }
    return (
        <div className={styles["input-wrapper"]}>
            <FaSearch className={styles["search-icon"]} />
            <input placeholder="Type to search..." value={input} onChange={(e) => handleChange(e.target.value)} />
        </div>
    )
}