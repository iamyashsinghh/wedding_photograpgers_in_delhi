import styled from "styled-components";
import { useRef, useState, useEffect } from "react";
import { BiSearch } from 'react-icons/bi';

export function CheckFilter({ name, items, list, setList, handleApplyFilter, type }) {
    const initialRender = useRef(true);
    const [show, setShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCities = items?.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }
        handleApplyFilter();
    }, [list]);

    const handleCheckChange = (event) => {
        const { value, checked } = event.target;

        if (checked && !list.includes(value)) {
            const index = items.findIndex((city) => String(city.id) === String(value));
            const selectedFilterCity = items[index];
            items.splice(index, 1);
            items.unshift(selectedFilterCity);
            setList(prev => [...prev, value]);
        } else if (!checked && list.includes(value)) {
            setList(prev => prev.filter(loc => loc !== value));
        }
    };

    const handleClear = () => {
        setList([]);
    };

    return (
        <Box show={show}>
            <div className="header-title">
                <h4>{name} <span className="badge-count">{`(${items.length})`}</span></h4>
                <span className="clear-btn" onClick={handleClear}>Clear</span>
            </div>

            {name === "Localities" && (
                <div className="search-bar">
                    <BiSearch className="search-icon" />
                    <input
                        type="text"
                        name="search"
                        placeholder="Search Locality"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            )}

            <div className="filter-lists">
                {filteredCities?.map((item, i) => {
                    const badgeCount = type === 'vendor' ? item.vendor_count : item.venue_count;

                    return (
                        <div key={i} className={i < 5 ? "" : "hide"}>
                            <div className="filter-item">
                                <label className="main">
                                    {item.name}
                                    <input
                                        type="checkbox"
                                        name="check-item"
                                        value={item.id}
                                        checked={list.includes(String(item.id))}
                                        onChange={(e) => handleCheckChange(e)}
                                    />
                                    <span className="geekmark"></span>
                                </label>
                                {type && badgeCount > 0 && (
                                    <span className="badge-count">{badgeCount}</span>
                                )}
                            </div>
                        </div>
                    );
                })}

                {items?.length > 5 && (
                    <div className="show-more">
                        <button
                            className="show-more-btn"
                            onClick={() => setShow(!show)}
                        >
                            {show ? "-Show Less" : "+Show More"}
                        </button>
                    </div>
                )}
            </div>
        </Box>
    );
}

const Box = styled.div`

display: flex;
flex-direction: column;
gap: 1.5rem;
/* border: 1px solid red; */

.header-title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    h4{
        font-size: 2rem !important;
        font-weight: 500;
    }
    /* padding: 1rem; */
}

.badge-count{
    font-size: 1.8rem;
    font-family: "Poppins";
    /* padding:1rem; */

}
.clear-btn{
    color:var(--primary-color);
    font-size: 1.4rem;
    margin-right: 10px;
    font-family: "Poppins";
    cursor: pointer;
    font-weight: 500;
}
.search-bar{
    border: 1px solid  var(--primary-color);
    border-radius:5px;
    height: 45px;
    margin-right: 10px;
    display: flex;
    padding: 0rem 1rem;
    align-items: center;
    position: relative;
    .search-icon{
        font-size: 2.5rem;
    }
    input[type="text"] {
        width :97%;
        height:36px!important;;
        padding: .5em;
        border: none;
        outline: none;
        font-size: 1.7rem;
        font-family: "Poppins";

    }
    

}
.filter-lists{
    /* border: 2px solid red; */
    /* padding: 0rem 0rem 0rem 0rem; */
    display: flex;
    max-height: 270px;
    overflow-y: auto;
    flex-direction:column;
    gap: .5rem;

    &::-webkit-scrollbar {
        width: 0px;  /* Hide the scrollbar by setting its width to 0 */
    }
    .filter-item{
        display: flex;
        justify-content: space-between;
        padding-right: 1.5rem;
        /* border: 1px solid black; */
        /* align-items: center; */
        
    }
    .hide{
        display: ${(props) => props.show ? "block" : 'none'};
        
    }
}

.show-more-btn{
    border: none;
    outline: none;
    background:none;
    color: var(--info-color);
    cursor: pointer;
    font-size: 1.8rem;
}



//Checkbox Design
.main{
    display: block;
    position: relative;
    padding-left: 30px;
    margin-bottom: 15px;
    cursor: pointer;
    font-size: 1.7rem;
    font-family: "Poppins";
    color: var(--para);
    

}
        
    /* Hide the default checkbox */
input[type=checkbox] {
    visibility: hidden;
}
        

.geekmark {
    position: absolute;
    top: 3px;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid var(--primary-color);
}
    

.main input:checked ~ .geekmark {
    background-color: white;
}
    
/* Checkmark to be shown in checkbox */
/* It is not be shown when not checked */
.geekmark:after {
    content: "";
    position: absolute;
    display: none;
}
        
/* Display checkmark when checked */
.main input:checked ~ .geekmark:after {
    display: block;
}
        

.main .geekmark:after {
    left: 6px;
    bottom: 3px;
    width: 2px;
    height: 10px;
    border: solid var(--primary-color);
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}
    

`