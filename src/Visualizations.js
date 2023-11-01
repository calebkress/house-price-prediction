// Visualizations.js
import React from 'react';
import './Visualizations.css';
import heatmapImg from './static/heatmap.png';
import histogramImg from './static/histogram.png';
import scatterplotImg from './static/scatterplot.png';

const Visualizations = () => {
    return (
        <div className="visualizations-container">
            <h1 className="visualization-header">Visualizations</h1>
            <section className="visualization-section">
                <h2>Heatmap</h2>
                <p>
                    This heatmap provides a visual representation of all our dataset's 
                    features plotted against one another. Darker shades indicate higher 
                    densities or stronger relationships, allowing you to quickly identify 
                    patterns and correlations between different features.
                </p>
                <img src={heatmapImg} alt="Heatmap visualization" />
            </section>

            <section className="visualization-section">
                <h2>Histogram</h2>
                <p>
                    This histogram offers a breakdown of the prevalence of each of our 
                    dataset's features. By displaying the frequency distribution, it allows 
                    us to quickly understand the distribution and central tendencies of 
                    each feature within the dataset.
                </p>
                <img src={histogramImg} alt="Histogram visualization" />
            </section>

            <section className="visualization-section">
                <h2>Scatterplot</h2>
                <p>
                    This scatterplot provides a unique perspective on house prices by 
                    plotting them along latitude and longitude coordinates. This creates 
                    a geographic 'map' that vividly illustrates regional variations in 
                    house prices. By observing the concentration and spread of data 
                    points, we can identify areas where house prices are particularly 
                    high or low.
                </p>
                <img src={scatterplotImg} alt="Scatterplot visualization" />
            </section>
        </div>
    );
};

export default Visualizations;
