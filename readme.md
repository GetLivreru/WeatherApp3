# Project README

## Overview

This project is a web application developed using Node.js and Express, designed to provide information on weather conditions, Bitcoin wallet details, and the current Bitcoin (BTC) price. It utilizes external APIs for fetching this data.

### Key Features
1. **Weather Information**: Fetches and displays weather data for a specified city.
2. **Bitcoin Wallet Info**: Retrieves information about a specified Bitcoin wallet.
3. **Bitcoin Price**: Displays the current price of Bitcoin in USD.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js installed on your system.
- An internet connection to access external APIs.

## API Endpoints

The application includes several API endpoints:

1. **Weather API (`/weather/:city`):**
   - Fetches weather data for a specified city.
   - Method: `GET`
   - Parameters:
     - `city`: Name of the city.
   - Example Request: 
     ```http
     GET /weather/London
     ```

2. **Bitcoin Wallet Info API (`/wallet/:address`):**
   - Provides information on a specific Bitcoin wallet.
   - Method: `GET`
   - Parameters:
     - `address`: Bitcoin wallet address.
   - Example Request:
     ```http
     GET /wallet/1BoatSLRHtKNngkdXEeobR76b53LETtpyT
     ```

3. **Bitcoin Price API (`/BTC/price`):**
   - Shows the current price of Bitcoin in USD.
   - Method: `GET`
   - Example Request:
     ```http
     GET /BTC/price
     ```
3. **Main page (`/`):**
   - Shows the main index.html page.
   - Method: `GET`

## Installation and Setup

To get the project up and running on your local machine, follow these steps:

1. **Clone the Repository**
   ```sh
   git clone [repository URL]
   cd [repository name]```
2. **Install Dependencies**
   ```sh
   npm install
   ```
3. **Start the Server**
   ```sh
   node index.js
   ```
