import "../styles/yearSelect.css"

export default function SelectYear(props) {
    const thisYear = new Date().getFullYear();
    const years = [];

    for (let year = thisYear; year >= 2000; year--) {

        years.push(year);
    }

    return (
        <select value={props.value} onChange={props.change}>
            {years.map((year, i) => {
                return (
                    <option key={i} value={year}>{year}</option>
                );
            })}
        </select>
    );
}