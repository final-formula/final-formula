export default function collors() {
    const getPositionColor = (position) => {
        const colors = {
            1: "yellow",
            2: "gray",
            3: "orange",
            4: "lightgreen",
            5: "lightblue"
        };
        return collors[position] || "gray";
    }
}