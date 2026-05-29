const getPositionClass = (position) => {

    switch (Number(position)) {

        case 1:
            return "gold";

        case 2:
            return "silver";

        case 3:
            return "bronze";
        case 4:
            return "blue";
        case 5:
            return "green";

        default:
            return "default";
    }
};