import { useSelector } from "react-redux";

function CarValue() {
    const totalCost = useSelector(({ cars: { data, searchTerm } }) => //destructoring state to {cars: {data, searchTerm}} - kun interesseret i data og searchTerm
        data
            .filter((car) => car.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .reduce((sum, car) => sum + car.cost, 0) 
            // arrayhelper metode der tager en callback funktion og et initialt værdi (0 i dette tilfælde)
            // og reducerer arrayet til en enkelt værdi ved at iterere gennem hvert element i arrayet og 
            // anvende callback funktionen på det akkumulerede resultat og det aktuelle element. 
            // I dette tilfælde summerer vi omkostningerne for hver bil, der matcher søgeordet.
    );
    return <div className="car-value">Total Cost: {totalCost} kr.</div>;
}

export default CarValue;