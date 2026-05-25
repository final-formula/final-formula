export default function SelectYear(props) {
    const thisYear = new Date().getFullYear();
    const years = [];

    for (let year = thisYear; year >= 1950; year--) {

        years.push(year);
    }

    return (
        <select value={props.value} onChange={props.change}>
            {years.map((year) => {
                return (
                    <option value={year}>{year}</option>
                );
            })}
        </select>
    );
}