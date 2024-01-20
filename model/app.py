from flask import Flask, request, jsonify
from serverless_wsgi import handle_request
import pickle
import pandas as pd

app = Flask(__name__)

# Load model, scaler, and interaction objects
with open('random_forest_model.pkl', 'rb') as file:
    model_data = pickle.load(file)
    model = model_data['model']  # Extract model object from loaded dictionary
    scaler = model_data['scaler']  # Extract scaler object from loaded dictionary
    interaction = model_data['interaction']  # Extract interaction object from loaded dictionary

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from POST request
        data = request.get_json(force=True)
        
        # Debug: Print received data
        print("Received data:", data)

        # Make DataFrame from JSON data
        input_data = pd.DataFrame([data])

        # Debug: Print input_data
        print("Input data:", input_data)

        # Apply preprocessing steps to input_data
        # Extract relevant columns
        selected_features = input_data[['numOfBathrooms', 'livingAreaSqFt', 'numOfBedrooms', 'numOfStories', 'longitude', 'latitude', 'zipcode', 'propertyTaxRate', 'lotSizeSqFt', 'hasGarage', 'hasSpa', 'hasView', 'homeType_Vacant Land', 'homeType_Single Family', 'homeType_MultiFamily', 'homeType_Multiple Occupancy', 'homeType_Mobile / Manufactured', 'homeType_Townhouse', 'homeType_Condo', 'yearBuilt']]  

        # Apply polynomial feature transformation
        selected_features_interaction = interaction.transform(selected_features)
        feature_names = interaction.get_feature_names_out(selected_features.columns)
        features_interaction_df = pd.DataFrame(selected_features_interaction, columns=feature_names)

        # Apply scaling using loaded scaler
        features_scaled = scaler.transform(features_interaction_df)

        # Make predictions using model
        prediction = model.predict(features_scaled)

        # Prepare JSON response
        response = {
            'prediction': prediction.tolist()  # Convert prediction to a list
        }

        return jsonify(response), 200  # Return valid response with 200 status code
    except Exception as e:
        # Handle exceptions and return error response
        error_message = str(e)
        return jsonify({'error': error_message}), 500  # Return 500 error response with error message


if __name__ == '__main__':
    app.run(debug=True)


def lambda_handler(event, context):
    return handle_request(app, event, context)