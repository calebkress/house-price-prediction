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
    const totalSteps = 10; // 9 fields + intro page

    const handleChange = (e) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        }));
    };

    const goToNextStep = () => setCurrentStep(currentStep + 1);
    const goToPreviousStep = () => setCurrentStep(currentStep - 1);

    const calculatePrice = () => {
        let totalPrice = 300000; // Base price for homes in Austin

        totalPrice += parseInt(formData.bedrooms || 0) * 50000;
        totalPrice += parseInt(formData.bathrooms || 0) * 30000;
        totalPrice += parseInt(formData.garageSpaces || 0) * 20000;
        totalPrice += Math.max(0, 2000 - parseInt(formData.yearBuilt || 0)) * 2000;
        totalPrice += parseInt(formData.patiosPorches || 0) * 10000;
        totalPrice += (parseInt(formData.lotSize || 0) / 100) * 5000;
        totalPrice += (parseInt(formData.houseSize || 0) / 100) * 10000;
        totalPrice += Math.max(0, parseInt(formData.numStories || 0) - 1) * 30000;
        totalPrice = Math.min(totalPrice, 1200000);

        setResult(`Estimated Price: $${totalPrice.toFixed(2)}`);
        goToNextStep(); // Move to the result page
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

