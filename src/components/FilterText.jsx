export default function FilterText(props) {

    return (
        <input
            type={props.type}
            placeholder={`Enter ${props.label}`}
            value={props.value}
            onChange={props.change}
        />

    );


}