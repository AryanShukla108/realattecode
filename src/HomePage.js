import React, { useState, useEffect } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import axios from "axios";

const HomePage = () => {
    const [isOpen, setIsOpen] = useState(false); //for toggle open and close i am using this state
    const [selectedOption, setSelectedOption] = useState("Release Date"); //and this  i am using for option select
    const [isAscending, setIsAscending] = useState(true); // New state to manage sorting
    const [nameFilter, setNameFilter] = useState(""); //for name field for search
    const [minScore, setMinScore] = useState(""); // for name score field scroe 1-10
    const [filteredData, setFilteredData] = useState([]); // after filter data will come
    const [data, setData] = useState([]); // fetched data  main
    const [page, setPage] = useState(1); // Current page
    const [pageSize, setPageSize] = useState(10); // Number of records per page
    const [totalPages, setTotalPages] = useState(1); // Total number of pages

    useEffect(() => {
        fetchData();
    }, [page]);

    const fetchData = async () => {
        await axios
            .get(`https://spa.api.logicloop.io/api/games?pagination[page]=${page}&pagination[pageSize]=${pageSize}`)
            .then((response) => {
                const games =
                    response.data.data.map((game) => ({
                        id: game.id,
                        ...game.attributes,
                        firstReleaseDate: new Date(
                            parseInt(game.attributes.firstReleaseDate, 10)
                        ).toLocaleDateString(),
                    })) || [];
                const pagination = response.data.meta.pagination;
                setData(games);
                setFilteredData(games);
                setTotalPages(pagination.pageCount); // Set total pages from the API response
                setPageSize(pagination.pageSize);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }; // ok so toggle true or false  for this

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    }; // ok so this is for after clicking the dropdown will close

    const toggleSortOrder = () => {
        setIsAscending(!isAscending); // Toggle between ascending and descending
        handleFilter();
    };

    const handleClearFilters = () => {
        setNameFilter("");
        setMinScore("");
        setSelectedOption("Release Date");
        setIsAscending(true);
        setFilteredData(data); // Reset to initial data
    };

    //   const options = ["Release Date", "Score", "Name"];

    const handleFilter = () => {
        let filtered = [...data]; // Use a copy of the data array

        if (nameFilter) {
            filtered = filtered.filter((item) =>
                item.name.toLowerCase().includes(nameFilter.toLowerCase())
            );
        }

        if (minScore) {
            filtered = filtered.filter(
                (item) => parseInt(item.rating, 10) >= parseInt(minScore, 10)
            );
        }

        if (selectedOption === "Release Date") {
            filtered = filtered.sort((a, b) =>
                isAscending
                    ? new Date(a.firstReleaseDate) - new Date(b.firstReleaseDate)
                    : new Date(b.firstReleaseDate) - new Date(a.firstReleaseDate)
            );
        } else if (selectedOption === "Score") {
            filtered = filtered.sort((a, b) =>
                isAscending ? parseInt(a.rating, 10) - parseInt(b.rating, 10) : parseInt(b.rating, 10) - parseInt(a.rating, 10)
            );
        } else if (selectedOption === "Name") {
            filtered = filtered.sort((a, b) =>
                isAscending
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name)
            );
        }

        setFilteredData(filtered); // Update filteredData with the filtered results
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div className="homepage">
            <div className="filter">
                <div className="filter-head">Filter Result</div>
                <div className="name-inp">
                    <label htmlFor="name">Name (contains)</label>
                    <input
                        type="text"
                        name="name"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)} // Update name filter state
                    />
                </div>

                <div className="name-inp">
                    <label htmlFor="minimum">Minimum Score</label>
                    <input
                        type="text"
                        name="minimum"
                        value={minScore}
                        onChange={(e) => setMinScore(e.target.value)} // Update minimum score state
                    />
                </div>

                <div className="name-inp">
                    <label htmlFor="order">Order By</label>
                    <div className="dropdown-wrapper">
                        <div className="sort-icon-container" onClick={toggleSortOrder}>
                            {isAscending ? (
                                <ArrowUpwardIcon className="sort-icon" />
                            ) : (
                                <ArrowDownwardIcon className="sort-icon" />
                            )}
                        </div>
                        <div className="dropdown">
                            <div className="dropdown-header" onClick={toggleDropdown}>
                                {selectedOption}
                                {isOpen ? (
                                    <ArrowDropUpIcon className="dropdown-icon" />
                                ) : (
                                    <ArrowDropDownIcon className="dropdown-icon" />
                                )}
                            </div>
                            {isOpen && (
                                <div className="dropdown-list">
                                    {["Release Date", "Score", "Name"].map((option) => (
                                        <div
                                            key={option}
                                            className="dropdown-item"
                                            onClick={() => handleOptionClick(option)}
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* <button onClick={handleFilter}>Apply Filters</button> */}
                <div className="button-clear"><button className="clear" onClick={handleClearFilters}>Clear Filters</button></div>
            </div>

            <div className="card-data">
                {Array.isArray(filteredData) && filteredData.length > 0 ? (
                    filteredData.map((item) => (
                        <div className="cardss">
                            <div className="blackbox"></div>
                            <div key={item.id} className="card">
                                <div className="inner-card">
                                    <div>
                                        <div>{item.name}</div>
                                        <div className="relase">Release Date: {item.firstReleaseDate}</div>
                                        <div className="summary">{item.summary}</div>
                                    </div>
                                    <div>
                                        <div className="rating">{parseFloat(item.rating).toFixed(0)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No data available</p>
                )}

                <div className="pagination">
                    <button className="clear" onClick={handlePrevPage} disabled={page === 1}>
                        Previous
                    </button>
                    <span className="clear">
                        Page {page} of {totalPages}
                    </span>
                    <button className="clear" onClick={handleNextPage} disabled={page === totalPages}>
                        Next
                    </button>
                </div>
            </div>

        </div>
    );
};

export default HomePage;
