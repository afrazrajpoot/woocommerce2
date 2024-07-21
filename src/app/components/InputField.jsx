"use client";
import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import { useGlobalContext } from "@/context/globalState";
import { useRouter } from "next/navigation";

const suggestions = ["Bundle", "Single Pack", "Premiere Pro", "After Effects"];

const InputField = () => {
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const navigate = useRouter();
  const inputRef = useRef(null);

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    setFilteredSuggestions(
      suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setFilteredSuggestions([]);
  };

  const handleSearch = () => {
    navigate.push(`/store?query=${encodeURIComponent(query)}`);
  };

  const handleBlur = () => {
    // Hide suggestions after a short delay to allow suggestion click
    setTimeout(() => setFilteredSuggestions([]), 100);
  };

  const handleFocus = () => {
    if (query) {
      setFilteredSuggestions(
        suggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setFilteredSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main className="flex flex-col lg:flex-row">
      <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
        <div ref={inputRef}>
          <TextField
            id="outlined-basic"
            placeholder="Search"
            InputProps={{
              startAdornment: <SearchIcon className="text-[#FF387A]" />,
              className:
                "text-gray-800 bg-[#F6F6F6] text-[4vw] sm:text-[2vw] lg:text-[1vw] focus:outline-none focus:shadow-md p-[0.3vw] rounded-md",
              style: { padding: "0.3vw" },
            }}
            sx={{
              "& input": {
                padding: "0.7vw",
                width: "21vw",
                fontSize: "1vw",
                "@media (max-width: 1020px)": {
                  padding: "1vw",
                  width: "77vw",
                  fontSize: "2vw",
                },
                "@media (max-width: 630px)": {
                  padding: "2.5vw",
                  width: "77vw",
                  fontSize: "4vw",
                },
              },
            }}
            value={query}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          {filteredSuggestions.length > 0 && (
            <List>
              {filteredSuggestions.map((suggestion, index) => (
                <ListItem
                  button
                  key={index}
                  className="text-gray-700 bg-white hover:text-black hover:bg-gray-200"
                  style={{ padding: "0.5vw" }}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <ListItemText primary={suggestion} />
                </ListItem>
              ))}
            </List>
          )}
        </div>
      </div>
      <div>
        <button
          onClick={handleSearch}
          className="bg-[#FF387A] text-[4vw] mt-[3vw] md:mt-0 sm:text-[2vw] lg:text-[1vw] md:ml-[1vw] hover:shadow-md hover:bg-[#ff387af1] text-[#fff] p-[2.5vw] md:p-[0.9vw] rounded-md w-full md:max-w-[10vw] text-center"
        >
          SEARCH
        </button>
      </div>
    </main>
  );
};

export default InputField;
