import { useSelector, useDispatch } from "react-redux";
import { changeSearchTerm } from "../Store";

function CarSearch() {
    const dispatch = useDispatch();
    const searchTerm = useSelector((state) => {
        return state.cars.searchTerm;
    });

    const handleSearchTermChange = (event) => {
        dispatch(changeSearchTerm(event.target.value));
    }

    return (
        <div className="list-header">
            <h3 className="title is-3">Cars</h3>
            <div className="search fiel is-horizontal">
                <label className="label">Search</label>
                <input className="input" value={searchTerm} onChange={handleSearchTermChange} />
                <br></br>
            </div>
        </div>
    );
}
export default CarSearch;