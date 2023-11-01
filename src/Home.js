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
        // Base price for homes in Austin
        let totalPrice = 300000;
    
        // ZIP Code: Ignored for now.
        
        // Bedrooms: Assume each additional bedroom adds $50,000
        totalPrice += parseInt(formData.bedrooms) * 50000;
    
        // Bathrooms: Assume each additional bathroom adds $30,000
        totalPrice += parseInt(formData.bathrooms) * 30000;
    
        // Garage Spaces: Assume each garage space adds $20,000
        totalPrice += parseInt(formData.garageSpaces) * 20000;
    
        // Year Built: Assume a decay factor of $2,000 per year since 2000
        const yearBuiltFactor = Math.max(0, 2000 - parseInt(formData.yearBuilt)) * 2000;
        totalPrice -= yearBuiltFactor;
    
        // Patios/Porches: Assume each one adds $10,000
        totalPrice += parseInt(formData.patiosPorches) * 10000;
    
        // Lot Size: Assume every additional 100 sq.ft. adds $5,000
        totalPrice += (parseInt(formData.lotSize) / 100) * 5000;
    
        // House Size: Assume every additional 100 sq.ft. of house adds $10,000
        totalPrice += (parseInt(formData.houseSize) / 100) * 10000;
    
        // Number of Stories: Assume each story above 1 adds $30,000
        totalPrice += Math.max(0, parseInt(formData.numStories) - 1) * 30000;
    
        // Cap the price at $1.2M
        totalPrice = Math.min(totalPrice, 1200000);
    
        setResult(`Estimated Price: $${totalPrice.toFixed(2)}`);
    };
    

	return (
		<div className="App">
			<div className="houseForm">
				<h1>Home Price Projection</h1>
				<form>
					<label htmlFor="zipCode">ZIP Code:</label>
					<input 
						type="number"
						id="zipCode"
						name="zipCode"
						value={formData.zipCode}
						onChange={handleChange}
						min="10000"
						max="99999"
						required
					/>

					<label htmlFor="bedrooms">Number of Bedrooms:</label>
					<input 
						type="number"
						id="bedrooms"
						name="bedrooms"
						value={formData.bedrooms}
						onChange={handleChange}
						min="0"
						step="1"
						required
					/>

					<label htmlFor="bathrooms">Number of Bathrooms:</label>
					<input 
						type="number"
						id="bathrooms"
						name="bathrooms"
						value={formData.bathrooms}
						onChange={handleChange}
						min="0"
						step="0.5"
						required
					/>

					<label htmlFor="garageSpaces">Garage Spaces:</label>
					<input 
						type="number"
						id="garageSpaces"
						name="garageSpaces"
						value={formData.garageSpaces}
						onChange={handleChange}
						min="0"
						step="1"
						required
					/>

					<label htmlFor="yearBuilt">Year Built:</label>
					<input 
						type="number"
						id="yearBuilt"
						name="yearBuilt"
						value={formData.yearBuilt}
						onChange={handleChange}
						min="1800"
						max="2099"
						step="1"
						required
					/>

					<label htmlFor="patiosPorches">Number of Patios / Porches:</label>
					<input 
						type="number"
						id="patiosPorches"
						name="patiosPorches"
						value={formData.patiosPorches}
						onChange={handleChange}
						min="0"
						step="1"
						required
					/>

					<label htmlFor="lotSize">Lot Size(sq.ft.):</label>
					<input 
						type="number"
						id="lotSize"
						name="lotSize"
						value={formData.lotSize}
						onChange={handleChange}
						min="0"
						step="1"
						required
					/>

					<label htmlFor="houseSize">House Size(sq.ft.):</label>
					<input 
						type="number"
						id="houseSize"
						name="houseSize"
						value={formData.houseSize}
						onChange={handleChange}
						min="0"
						step="1"
						required
					/>

					<label htmlFor="numStories">Number of Stories:</label>
					<input 
						type="number"
						id="numStories"
						name="numStories"
						value={formData.numStories}
						onChange={handleChange}
						min="0"
						step="1"
						required
					/>

					<button type="button" onClick={calculatePrice}>
						Calculate
					</button>
				</form>

				{ result && <div id="result">{result}</div> }
			</div>
		</div>
	);
}

export default Home;
