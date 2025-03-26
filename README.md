# React Native (Expo) App - Restaurants

A simple React Native app built with **Expo** to display a list of restaurants with search and lazy loading functionality. The app uses **NativeWind** for styling and is organized for scalability.

---

## Features

### Navigation
- **Bottom Tab Navigation** with:
  - **Home**: Currently empty.
  - **Explore**: Displays a list of restaurants.

### Explore Screen
1. **Search**: 
   - Search input at the top of the screen.
   - Fetches and displays results immediately after typing.

2. **Lazy Loading**:
   - Loads the first page of results initially.
   - Fetches the next page when scrolling to the bottom.

3. **Restaurant Display**:
   - Shows restaurant image, name, rating, and number of reviews.

---

## Technologies

- **React Native** (Expo)
- **NativeWind** for styling
- **Axios** for API calls

---

## Installation

1. Clone the repository:
```bash
git clone git@github.com:mbaivic23/restaurant-search.git
cd restaurant-search
 ```
   
Install dependencies:
```bash
npm install
```
Start the app:
```bash
expo start
```
