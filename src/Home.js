import React, { useState } from "react";
import "./App.css";
import "./Home.css";

function Home() {
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

    const [result, setResult] = useState('');
    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = 10; 

    const handleChange = (e) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        }));
    };

    const goToNextStep = () => setCurrentStep(currentStep + 1);
    const goToPreviousStep = () => setCurrentStep(currentStep - 1);

    const calculatePrice = () => {
        // // // This section is what we'll use to interact with the API when ready
        // // Hardcoded for testing
        // const testData = {
        //     numOfBathrooms: 2, // integer or float (as needed by your model)
        //     livingAreaSqFt: 1200, // integer
        //     numOfBedrooms: 3, // integer
        //     numOfStories: 1, // integer
        //     longitude: -97.7431, // float
        //     latitude: 30.2672, // float
        //     zipcode: "78701", // string
        //     propertyTaxRate: 1.8, // float
        //     lotSizeSqFt: 7000, // integer
        //     hasGarage: true, // boolean
        //     hasSpa: false, // boolean
        //     hasView: true, // boolean
        //     "homeType_Vacant Land": false, // boolean
        //     "homeType_Single Family": true, // boolean
        //     "homeType_MultiFamily": false, // boolean
        //     "homeType_Multiple Occupancy": false, // boolean
        //     "homeType_Mobile / Manufactured": false, // boolean
        //     "homeType_Townhouse": false, // boolean
        //     "homeType_Condo": false, // boolean
        //     yearBuilt: 1986 // integer
        // };
        

        // // Send API request
        // fetch('http://54.209.165.54:5000/predict', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(testData),
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data)
        //     // setResult(`Estimated Price: $${data.prediction.toFixed(2)}`);
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        //     setResult('Failed to calculate the price. Please try again.');
        // });

        // // This section is a hardcoded solution for the demo
        // Hard-coded calculation based on user input
        const input = formData;
        const calculatedPrice = performCalculation(input);

        // Set the calculated price in the state
        setResult(`Estimated Price: $${calculatedPrice.toFixed(2)}`);
    };

    const performCalculation = (inputData) => {
        // Convert input data to numbers
        const bedrooms = parseInt(inputData.bedrooms) || 0;
        const bathrooms = parseInt(inputData.bathrooms) || 0;
        const livingAreaSqFt = parseInt(inputData.houseSize) || 0;
        const lotSizeSqFt = parseInt(inputData.lotSize) || 0;
        const garageSpaces = parseInt(inputData.garageSpaces) || 0;
        const yearBuilt = parseInt(inputData.yearBuilt) || 0;
        const numStories = parseInt(inputData.numStories) || 1;
    
        // Base value for a typical property in Austin
        let baseValue = 300000; // This value can be adjusted based on market research
    
        // Calculations
        const bedroomValue = bedrooms * 30000; // Assuming each bedroom adds $30,000
        const bathroomValue = bathrooms * 20000; // Assuming each bathroom adds $20,000
        const livingAreaValue = livingAreaSqFt * 150; // $150 per sq ft of living area
        const lotSizeValue = lotSizeSqFt * 5; // $5 per sq ft of lot size
        const garageValue = garageSpaces * 10000; // $10,000 for each garage space
        const ageDeduction = (2024 - yearBuilt) * 1000; // Deduct $1,000 for each year since built
        const storyBonus = (numStories - 1) * 20000; // $20,000 for each additional story
    
        // Final price calculation
        const price = baseValue + bedroomValue + bathroomValue + livingAreaValue + lotSizeValue + garageValue - ageDeduction + storyBonus;
    
        setCurrentStep(10);

        return price;
    };
    
    

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.target.type !== 'textarea') {
            e.preventDefault(); // Prevent the default form submit behavior
            if (currentStep < totalSteps - 1) {
                goToNextStep();
            } else {
                calculatePrice();
            }
        }
    };

    const renderStep = () => {
		switch (currentStep) {
            case 0:
                return <IntroPage onNext={goToNextStep} />;
            case 1:
                return <FieldStep fieldName="zipCode" value={formData.zipCode} onChange={handleChange} onNext={goToNextStep} currentStep={currentStep} totalSteps={totalSteps} />;
            case 2:
                return <FieldStep fieldName="bedrooms" value={formData.bedrooms} onChange={handleChange} onNext={goToNextStep} onPrevious={goToPreviousStep} currentStep={currentStep} totalSteps={totalSteps} />;
            case 3:
                return <FieldStep fieldName="bathrooms" value={formData.bathrooms} onChange={handleChange} onNext={goToNextStep} onPrevious={goToPreviousStep} currentStep={currentStep} totalSteps={totalSteps} />;
            case 4:
                return <FieldStep fieldName="garageSpaces" value={formData.garageSpaces} onChange={handleChange} onNext={goToNextStep} onPrevious={goToPreviousStep} currentStep={currentStep} totalSteps={totalSteps} />;
            case 5:
                return <FieldStep fieldName="yearBuilt" value={formData.yearBuilt} onChange={handleChange} onNext={goToNextStep} onPrevious={goToPreviousStep} currentStep={currentStep} totalSteps={totalSteps} />;
            case 6:
                return <FieldStep fieldName="patiosPorches" value={formData.patiosPorches} onChange={handleChange} onNext={goToNextStep} onPrevious={goToPreviousStep} currentStep={currentStep} totalSteps={totalSteps} />;
            case 7:
                return <FieldStep fieldName="lotSize" value={formData.lotSize} onChange={handleChange} onNext={goToNextStep} onPrevious={goToPreviousStep} currentStep={currentStep} totalSteps={totalSteps} />;
            case 8:
                return <FieldStep fieldName="houseSize" value={formData.houseSize} onChange={handleChange} onNext={goToNextStep} onPrevious={goToPreviousStep} currentStep={currentStep} totalSteps={totalSteps} />;
            case 9:
                return <FieldStep fieldName="numStories" value={formData.numStories} onChange={handleChange} onNext={calculatePrice} onPrevious={goToPreviousStep} currentStep={currentStep} totalSteps={totalSteps} />;
            case 10:
                return <ResultPage result={result} />;
            default:
                return <FieldStep 
				fieldName="numStories" 
				value={formData.numStories} 
				onChange={handleChange} 
				onNext={() => calculatePrice()} // Changed to a function call
				onPrevious={goToPreviousStep} 
				currentStep={currentStep} 
				totalSteps={totalSteps} />;
        }
    };

	return (
        <div className="App">
            <div className="houseForm">
                <h1>Home Price Projection</h1>
                <form onKeyPress={handleKeyPress}>
                    {renderStep()}
                </form>
            </div>
        </div>
    );
}

function IntroPage({ onNext }) {
    return (
        <div>
            <p className="introText">Discover the predicted cost of the home you want...</p>
            <button type="button" onClick={onNext}>Start</button>
        </div>
    );
}

function FieldStep({ fieldName, value, onChange, onNext, onPrevious }) {
    // Capitalize the first letter of each word in the label
    const label = fieldName
        .replace(/([A-Z])/g, ' $1')
        .trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return (
        <div className="fieldStep">
            <label htmlFor={fieldName}>{label}:</label>
            <input
                type="number"
                id={fieldName}
                name={fieldName}
                value={value}
                onChange={onChange}
                autoComplete="off"
            />
            {onPrevious && <button type="button" onClick={onPrevious}>Previous</button>}
            <button type="button" onClick={onNext}>
                {fieldName === 'numStories' ? 'Calculate' : 'Next'}
            </button>
        </div>
    );
}


function ResultPage({ result, onReset }) {
    return (
        <div className="resultPage">
            <p className="calculatedPrice">{result}</p>
        </div>
    );
}


export default Home;

