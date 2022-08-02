import React from "react";

function GlobalFilter({ filter, setFilter }) {
    return (
        <input
            type="text"
            className="border border-slate-400 rounded outline-none py-[1px] px-3 placeholder:text-sm placeholder:italic"
            value={filter || ""}
            placeholder={`Search by ID, name, email or mobile`}
            onChange={(e) => {
                setFilter(e.target.value);
            }}
        />
    );
}

export default GlobalFilter;
