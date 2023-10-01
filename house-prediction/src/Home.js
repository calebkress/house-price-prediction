import React, { useState } from "react";
import "./App.css";
import "./Home.css";

function Home() {
    // State management for forms 
    // This allows us to temporarily store form data to send to the model
    const [formData, setFormData] = useState({
        zipCode: '',
        bedrooms: '',
        bathrooms: '',
        garageSpaces: '',
        yearBuilt: '',
        patiosPorches: '',
        lotSize: '',
        houseSize: '',
        numStories: '',
    });

    // Store the result the user calculates
    const [result, setResult] = useState(null);

    // Function to update state on form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const calculatePrice = () => {
        // Implement price projection calculation logic here
        // Access the form data in the 'formData' object
        // For example, to calculate a basic total:
        const totalPrice =
            parseInt(formData.bedrooms) * 100000 +
            parseFloat(formData.bathrooms) * 50000 +
            parseInt(formData.garageSpaces) * 20000;

        setResult(`Estimated Price: $${totalPrice}`);
        // With full implementation, this is where we'll
        // send our data to the model and await a response
    };

    return ( <
        div className = "App" >
        <
        div className = "houseForm" >
        <
        h1 > Home Price Projection < /h1> <
        form >
        <
        label htmlFor = "zipCode" > ZIP Code: < /label> <
        input type = "number"
        id = "zipCode"
        name = "zipCode"
        value = { formData.zipCode }
        onChange = { handleChange }
        min = "10000"
        max = "99999"
        required /
        >

        <
        label htmlFor = "bedrooms" > Number of Bedrooms: < /label> <
        input type = "number"
        id = "bedrooms"
        name = "bedrooms"
        value = { formData.bedrooms }
        onChange = { handleChange }
        min = "0"
        step = "1"
        required /
        >

        <
        label htmlFor = "bathrooms" > Number of Bathrooms: < /label> <
        input type = "number"
        id = "bathrooms"
        name = "bathrooms"
        value = { formData.bathrooms }
        onChange = { handleChange }
        min = "0"
        step = "0.5"
        required /
        >

        <
        label htmlFor = "garageSpaces" > Garage Spaces: < /label> <
        input type = "number"
        id = "garageSpaces"
        name = "garageSpaces"
        value = { formData.garageSpaces }
        onChange = { handleChange }
        min = "0"
        step = "1"
        required /
        >

        <
        label htmlFor = "yearBuilt" > Year Built: < /label> <
        input type = "number"
        id = "yearBuilt"
        name = "yearBuilt"
        value = { formData.yearBuilt }
        onChange = { handleChange }
        min = "1800"
        max = "2099"
        step = "1"
        required /
        >

        <
        label htmlFor = "patiosPorches" > Number of Patios / Porches: < /label> <
        input type = "number"
        id = "patiosPorches"
        name = "patiosPorches"
        value = { formData.patiosPorches }
        onChange = { handleChange }
        min = "0"
        step = "1"
        required /
        >

        <
        label htmlFor = "lotSize" > Lot Size(sq.ft.): < /label> <
        input type = "number"
        id = "lotSize"
        name = "lotSize"
        value = { formData.lotSize }
        onChange = { handleChange }
        min = "0"
        step = "1"
        required /
        >

        <
        label htmlFor = "houseSize" > House Size(sq.ft.): < /label> <
        input type = "number"
        id = "houseSize"
        name = "houseSize"
        value = { formData.houseSize }
        onChange = { handleChange }
        min = "0"
        step = "1"
        required /
        >

        <
        label htmlFor = "numStories" > Number of Stories: < /label> <
        input type = "number"
        id = "numStories"
        name = "numStories"
        value = { formData.numStories }
        onChange = { handleChange }
        min = "0"
        step = "1"
        required /
        >

        <
        button type = "button"
        onClick = { calculatePrice } >
        Calculate <
        /button> <
        /form>

        {
            result && < div id = "result" > { result } < /div>} <
                /div> <
                /div>
        );
    }


    export default Home;