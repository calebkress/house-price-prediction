import pandas as pd
import numpy as np
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import pickle

# Function to load and preprocess data
def preprocess_data(filepath):
    # Load dataset
    housing_data = pd.read_csv(filepath)

    ## Data cleaning
    # Drop unnecessary columns
    columns_to_drop = ['zpid', 'city', 'streetAddress', 'description', 'latestPriceSource', 'homeImage', 'latest_saledate']
    housing_data.drop(columns=columns_to_drop, axis=1, inplace=True)

    ## Feature engineering
    # One-hot encode categorical variables (home type)
    housing_data = pd.get_dummies(housing_data, columns=['homeType'], drop_first=True)

    # Calculate property age
    housing_data['property_age'] = housing_data['latest_saleyear'] - housing_data['yearBuilt']

    # Calculate living to lot ratio
    housing_data['living_to_lot_ratio'] = housing_data['livingAreaSqFt'] / (housing_data['lotSizeSqFt'] + 0.001)

    # Calculate bed to bath ratio
    housing_data['bed_to_bath_ratio'] = housing_data['numOfBedrooms'] / (housing_data['numOfBathrooms'] + 0.001)

    # Correlation analysis
    correlations = housing_data.corr()
    print(correlations['latestPrice'].sort_values(ascending=False))

    # Selecting top correlated features based on correlation analysis
    selected_features = housing_data[['numOfBathrooms', 'livingAreaSqFt', 'numOfBedrooms', 'numOfStories', 'longitude', 'latitude', 'zipcode', 'propertyTaxRate', 'lotSizeSqFt', 'hasGarage', 'hasSpa', 'hasView', 'homeType_Vacant Land', 'homeType_Single Family', 'homeType_MultiFamily', 'homeType_Multiple Occupancy', 'homeType_Mobile / Manufactured', 'homeType_Townhouse', 'homeType_Condo', 'yearBuilt']]  

    # Adding interaction terms
    interaction = PolynomialFeatures(degree=2, include_bias=False, interaction_only=True)
    selected_features_interaction = interaction.fit_transform(selected_features)

    # Convert interaction terms back to DataFrame (for scaling)
    feature_names = interaction.get_feature_names_out(selected_features.columns)
    features_interaction_df = pd.DataFrame(selected_features_interaction, columns=feature_names)

    # Scaling features with interaction terms
    scaler = StandardScaler()
    features_scaled = scaler.fit_transform(features_interaction_df)

    # Combine scaled features with target variable
    target = housing_data['latestPrice'].to_numpy().reshape(-1, 1)
    housing_data_scaled = np.concatenate((features_scaled, target), axis=1)

    return housing_data_scaled, features_interaction_df, scaler, interaction  # Return the scaled data, interaction features DataFrame, scaler, and interaction objects

# Function to train model
def train_model(X_train, y_train, X_test, y_test):
    # Training RandomForestRegressor model
    model = RandomForestRegressor(random_state=42)
    model.fit(X_train, y_train)

    # Model evaluation
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred) # Mean standard error value
    r_squared = model.score(X_test, y_test)  # R-squared value

    print(f'Model Evaluation:\nMSE: {mse}\nR-squared: {r_squared}')

    return model

# Saving model, scaler, and interaction objects
def save_model(model, scaler, interaction, filename):
    with open(filename, 'wb') as file:
        pickle.dump({'model': model, 'scaler': scaler, 'interaction': interaction}, file)
    return

# Loading model and preprocessing objects
def load_model(filename):
    with open(filename, 'rb') as file:
        model_data = pickle.load(file)
    return model_data

# Main script
if __name__ == "__main__":
    # Load and preprocess data
    data, features_interaction_df, scaler, interaction = preprocess_data('../data/austinHousingData.csv')  # Capture features_interaction_df, scaler, and interaction

    # Splitting data into features and target
    X = data[:, :-1]  # All columns except last one
    y = data[:, -1]   # Last column

    # Splitting dataset into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train model
    model = train_model(X_train, y_train, X_test, y_test)

    # Save model, scaler, and interaction objects
    save_model(model, scaler, interaction, 'random_forest_model.pkl')
