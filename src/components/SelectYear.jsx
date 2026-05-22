export default function SelectYear(props) {
    const thisYear = new Date().getFullYear();
    const years = [thisYear];

    for (let i = 0; i < 30; i++) {
        const year = years[i] - 1;
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