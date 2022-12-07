# Weather App

## Description

I was tasked with creating a weather app. This app needed to allow the user to enter a city and see the current weather details for that location. Additionally the user is able to see the weather for 5 days in the future for that location. So that the user can quickly review a previously viewed weather location, their recently searched cities remain displayed on the page. The user can see the weather for the recent cities by clicking their element. 

In this project I learned the importance of saving objects to local storage, so that users can save multiple items of the same type of data into the local storage. Learning to parse and maniuplte data recieved through an API is a very importance skill as well, as APIs can deliver interesting infomation that make apps more useful.

## Usage

The app can be viewed by following this link: https://nolacoder.github.io/Weather-App/

- *Reminder the the instructors told us to use the city search API Url instead of the latitude/longitude Url and to omit the UV requirement because the free versions of the API no longer supports those two features.*

This app utilizes the Open Weather API to deliver weather information. The API request is modified to include the search input chosen by the user. Two calls are made to the API when the Search button is pressed. One for the current weather and another for the future weather. 

The API responses and the parsed and manipulated to show choice weather information to the user, including weather icons that portray the current conditions. The user's search history is stored in local storage and is displayed to the user in the form of a list. When a user click a list item the page loads the data for the city.

![Screenshot of weather app](./Assets/images/Weather%20app.png)
