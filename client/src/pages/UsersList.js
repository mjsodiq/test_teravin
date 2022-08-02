import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, userSelector } from "../features/app_slice";
import { useTable, usePagination, useGlobalFilter, useSortBy } from "react-table";
import GlobalFilter from "./GlobalFilter";
import { useNavigate, Link } from "react-router-dom";

function UsersList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const button_add_onClick = () => {
        navigate("/create");
    };
    const user = useSelector(userSelector.selectAll);

    const data = useMemo(() => user, [user]);
    const columns = useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Mobile",
                accessor: "mobile",
            },
            {
                Header: "Action",
                accessor: "action",
                Cell: (props) => {
                    return (
                        <div className=" flex gap-2 justify-center items-center">
                            <Link to={{ pathname: `/update/${props.cell.row.values.id}`, state: { userId: props.cell.row.values.id } }} className="px-5 py-1 bg-blue-300 rounded text-xs hover:bg-blue-200 active:bg-blue-400">
                                Update
                            </Link>
                            <Link to={`/detail/${props.cell.row.values.id}`} state={{ userId: props.cell.row.values.id }} className="px-5 py-1 bg-blue-300 rounded text-xs hover:bg-blue-200 active:bg-blue-400">
                                Detail
                            </Link>
                            <Link to={{ pathname: `/delete/${props.cell.row.values.id}`, state: { userId: props.cell.row.values.id } }} className="px-5 py-1 bg-blue-300 rounded text-xs hover:bg-blue-200 active:bg-blue-400">
                                Delete
                            </Link>
                        </div>
                    );
                },
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        setGlobalFilter,
        state: { pageIndex, pageSize, globalFilter },
    } = useTable({ data, columns, initialState: { pageIndex: 0 } }, useGlobalFilter, useSortBy, usePagination);

    const Table = () => {
        const active_button = "border rounded px-2 py-1 text-black";
        const inactive_button = "border rounded px-2 py-1 text-slate-200";

        return (
            <div className="flex flex-1 flex-col w-full">
                <table {...getTableProps()} className={`border-separate border-spacing-0 w-full border rounded-t`}>
                    <thead className="rounded">
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()} className="rounded">
                                {headerGroup.headers.map((column) => {
                                    return (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())} className="border border-blue-500 p-[4px] pt-3 pb-3 text-center bg-blue-500 text-white first:rounded-tl last:rounded-tr">
                                            <div className="flex justify-between items-center min-w-[100px]">
                                                {column.render("Header")}
                                                <span>{column.Header === "Action" ? "" : column.isSorted ? (column.isSortedDesc ? "⇩" : "⇧") : "⇋"}</span>
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className=" even:bg-slate-100 hover:bg-slate-200">
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()} className="border border-slate-300 p-[4px]">
                                                {cell.render("Cell")}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="flex-1"></div>
                <div className="pagination flex items-center justify-center gap-10">
                    <div className="flex items-center gap-2 justify-start">
                        <span>Show</span>
                        <select
                            value={pageSize}
                            className="px-5 border rounded p-1"
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                            }}>
                            {[10, 20, 40, 60, 100].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </select>
                        <span>per page</span>
                    </div>
                    <div>
                        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className={`${canPreviousPage ? active_button : inactive_button}`}>
                            {"<<"}
                        </button>{" "}
                        <button onClick={() => previousPage()} disabled={!canPreviousPage} className={`${canPreviousPage ? active_button : inactive_button}`}>
                            {"<"}
                        </button>{" "}
                        <span>
                            Page{" "}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>{" "}
                        </span>
                        <button onClick={() => nextPage()} disabled={!canNextPage} className={`${canNextPage ? active_button : inactive_button}`}>
                            {">"}
                        </button>{" "}
                        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className={`${canNextPage ? active_button : inactive_button}`}>
                            {">>"}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return (
        <div className="flex flex-1 flex-col justify-center items-center w-fit p-5 h-full">
            <div className="flex items-center gap-1 justify-between w-full py-1">
                <div className=" text-xl font-bold">List Employee</div>
                <div className="flex gap-1">
                    <div className="flex gap-2 items-center">
                        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                        <button className="border px-3 rounded bg-blue-500 text-white py-1 text-sm">Search</button>
                    </div>
                    <button className="border rounded px-4 bg-green-600 text-white text-sm py-1" onClick={button_add_onClick}>
                        Add
                    </button>
                </div>
            </div>
            <Table />
        </div>
    );
}

export default UsersList;
