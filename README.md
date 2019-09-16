# Enigma

Matrix AI for crypto trading.

## Overview

Enigma consists of a few parts:
- Harvester: Fetches market data from various sources
- Composer: Performs calculations such as moving averages on the market data
- Analyzer: Runs investement trials on data to create a dictionary
- Invester: Calls buys/sells using analyzed data

## Data Models for market

    high: Float
    low: Float
    open: Float
    close: Float
    volume: Float
    market: String
    currency: String
    timestamp: Date
    interval: String
    cap: Float

## Data schema for analysis
    id: Any - Unique id
    name: String // Descripton of data
    source: String // Function to get data
    created: Date // Date we added this data
    timestamp: Date
    values: [{
        value: Float
        precision: Float
    }]

## Data schema for masks
    id: Any - Unique id
    created: Date // Date we created this mask
    value: Any // Reference to analysis column
    precision: // Float

## Data schema for investement
    mask: Any // Mask id
    investements[{
        risk: Float // Risk factor
        profit: Float
    }]

## Collection types
- Currency charts
- Alternative data charts (can be anything quantifiable)
- Analysis grid - one huge table that aggregates everything with precision columns
- Dictionary - holds various mask/data

## Importing CSV
Need to convert numbers to floats so convert to json then
    
    mongoimport --db dbName --collection collectionName --file fileName.json --jsonArray

## Analysis functions
These can be either standard market analysis functions from Talib/Tulip or other data such as twitter sentiment, blockchain info, etc.

Each function accepts parameters, provides data fetching methods, transfomation, scheduling and storage.


## Strategies
Strategies are responsible for triggering trades based on provided data from a runner.

