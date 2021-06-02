import React from 'react'
import './SearchBar.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const SearchBar = ({term, location, sortBy, handleTermChange, handleLocationChange, handleSortByChange, timeToEat}) => {
    const sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count'
        }

    function getSortByClass(sortByOption) {
        if (sortByOption === sortBy) {
            return 'active'
        } else {
            return ''
        }
    }

    function handleSearch(e) {
        timeToEat(term, location, sortBy)
        e.preventDefault()
        toast(`Searching Yelp with ${term}, ${location}, ${sortBy}`)
    }

    function renderSortByOptions() {
        return Object.keys(sortByOptions).map(sortByOption => {
            let sortByOptionValue = sortByOptions[sortByOption];
            return <li key={sortByOptionValue} className={getSortByClass(sortByOptionValue)} 
            onClick={()=>{handleSortByChange(sortByOptionValue)}}>
                {sortByOption}</li>
        })
    }
        return (<div className="SearchBar">
            <div className="SearchBar-sort-options">
                <ul>
                    {renderSortByOptions()}
                </ul>
            </div>
            <div className="SearchBar-fields">
                <input placeholder="Search Businesses" value={term} onChange={(e) => {handleTermChange(e)}}/>
                <input placeholder="Where?" value={location} onChange={(e)=>{handleLocationChange(e)}}/>
            </div>
            <div className="SearchBar-submit" onClick={(e)=>{handleSearch(e)}}>
                <div>Time To Eat</div>
                <><ToastContainer/></>
            </div>
        </div>)
    }

export default SearchBar