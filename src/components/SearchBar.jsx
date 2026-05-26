import React, { useState } from 'react';

export default function SearchBar(props) {
    return (
        <div style={{ position: 'relative', height: "100%", width: "300px" }}>
            <input
                className="searchWithClear"
                type={props.type}
                placeholder={`Enter ${props.label}`}
                value={props.value}
                onChange={props.change} />

            {props.value.length > 0 && (
                <button className="searchWithClearButton" onClick={props.clear}>
                    💩
                </button>
            )}
        </div>
    );
};

