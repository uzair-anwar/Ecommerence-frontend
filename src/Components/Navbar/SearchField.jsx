import React, { useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";

const SearchField = (props) => {
  const { options, onInputChange, onClickInput } = props;
  const ulRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.addEventListener("click", (event) => {
      event.stopPropagation();
      if (ulRef.current != null) ulRef.current.style.display = "flex";
      onInputChange(event);
    });
    document.addEventListener("click", (event) => {
      if (ulRef.current != null) ulRef.current.style.display = "none";
    });
  }, [onInputChange]);

  return (
    <div className="search-bar-dropdown">
      <Form.Control
        id="search-bar"
        type="search"
        className="me-2"
        aria-label="Search"
        placeholder="Search product"
        ref={inputRef}
        onChange={onInputChange}
      />

      <ul id="results" className="list-group" ref={ulRef}>
        {options?.map((option, index) => {
          return (
            <button
              type="button"
              key={index}
              onClick={() => onClickInput(option._id)}
              className="list-group-item list-group-item-action"
            >
              {option.name}
            </button>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchField;
