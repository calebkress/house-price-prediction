import React, { useState } from "react";
import "./App.css";
import "./Home.css";

function Home() {
    // App state - contains data to be sent to model
    const [formData, setFormData] = useState({
        address: '',
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

    // Reference object for home types
    const homeTypes = [
        "Vacant Land", 
        "Single Family", 
        "MultiFamily", 
        "Multiple Occupancy", 
        "Mobile / Manufactured", 
        "Townhouse", 
        "Condo"
    ];

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


    const prepareDataForApi = () => {
        const apiData = { ...formData };
    
        // Handle homeType fields
        homeTypes.forEach(type => {
            apiData[`homeType_${type.replace(/ /g, "_")}`] = formData.homeType === type;
        });
    
        delete apiData.homeType; // Remove homeType field
    
        return apiData;
    };

    const calculatePrice = () => {
        // Hardcoded for testing
        const testData = {
            numOfBathrooms: 2, // int or float
            livingAreaSqFt: 1200, // int
            numOfBedrooms: 3, // int
            numOfStories: 1, // int
            longitude: -97.7431, // float
            latitude: 30.2672, // float
            zipcode: "78701", // str
            propertyTaxRate: 1.8, // float
            lotSizeSqFt: 7000, // int
            hasGarage: true, // bool
            hasSpa: false, // bool
            hasView: true, // bool
            "homeType_Vacant Land": false, // bool
            "homeType_Single Family": true, // bool
            "homeType_MultiFamily": false, // bool
            "homeType_Multiple Occupancy": false, // bool
            "homeType_Mobile / Manufactured": false, // bool
            "homeType_Townhouse": false, // bool
            "homeType_Condo": false, // bool
            yearBuilt: 1986 // int
        };
        

        // Send API request
        fetch('http://54.209.165.54:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // setResult(`Estimated Price: $${data.prediction.toFixed(2)}`);
        })
        .catch((error) => {
            console.error('Error:', error);
            setResult('Failed to calculate the price. Please try again.');
        });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.target.type !== 'textarea') {
            e.preventDefault(); 
            if (currentStep < totalSteps - 1) {
                goToNextStep();
            } else {
                calculatePrice();
            }
        }
    };

    const stepsConfig = [
        { component: IntroPage, props: { onNext: goToNextStep } },
        { component: FieldStep, props: { fieldName: "address", label: "address", value: formData.address, onChange: handleChange, onNext: goToNextStep, onPrevious: goToPreviousStep } },
        { component: FieldStep, props: { fieldName: "zipcode", label: "ZIP Code", value: formData.zipCode, onChange: handleChange, onNext: goToNextStep, onPrevious: goToPreviousStep } },
        { component: FieldStep, props: { fieldName: "numOfBedrooms", label: "Number of Bedrooms", value: formData.bedrooms, onChange: handleChange, onNext: goToNextStep, onPrevious: goToPreviousStep } },
        { component: FieldStep, props: { fieldName: "numOfBathrooms", label: "Number of Bathrooms", value: formData.bedrooms, onChange: handleChange, onNext: goToNextStep, onPrevious: goToPreviousStep } },
        { component: FieldStep, props: { fieldName: "numStories", label: "Number of Stories", value: formData.numStories, onChange: handleChange, onNext: calculatePrice, onPrevious: goToPreviousStep } },
        { component: FieldStep, props: { fieldName: "lotSize", label: "Lot Size (sq. ft.)", value: formData.bedrooms, onChange: handleChange, onNext: goToNextStep, onPrevious: goToPreviousStep } },
        { component: FieldStep, props: { fieldName: "homeSize", label: "House Size (sq. ft.)", value: formData.bedrooms, onChange: handleChange, onNext: goToNextStep, onPrevious: goToPreviousStep } },
        { component: FieldStep, props: { fieldName: "yearBuilt", label: "Year Built", value: formData.bedrooms, onChange: handleChange, onNext: goToNextStep, onPrevious: goToPreviousStep } },
        { component: ResultPage, props: { result: result } }
    ];

    const renderStep = () => {
        const stepConfig = stepsConfig[currentStep];
        if (!stepConfig) {
            return <DefaultErrorComponent />;
        }
        const StepComponent = stepConfig.component;
        return <StepComponent {...stepConfig.props} />;
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

function DefaultErrorComponent() {
    return (
        <div className="errorComponent">
            <p>Oops! Something went wrong. Please refresh.</p>
        </div>
    );
}


export default Home;

