# Online_Lodging_Platform_Node_MySQL

Welcome to our Online Lodging Platform project! This platform connects individuals seeking short-term accommodations with those who are willing to rent out their places. The system is built using Node.js, Express, and MySQL.

## Modules

#### Login/Signup Module

To access the full functionality, users need to sign up or log in. The signup form requires first name, last name, email address, and phone number. Login only requires a phone number. Users can be both guests and hosts, each offering a unique experience.

#### User Profile

The user profile displays basic information entered during signup. Users can update this information and switch between guest and host modes.

#### Guest Module

##### Search for Places

- Search by Location: Find places based on location.
- Search by Location and Dates: Specify check-in and check-out dates for availability.
- Search by Location and Guest: Filter places based on the number of guests allowed.
- Apply Filters on Search Result

Customize search results using filters like price range, property type, and amenities.

#### Reserve Place

Select a location from the search results to view details and reserve. The reservation form includes check-in/out dates, guest count, and estimated price.

#### Add Review

Guests can leave reviews for places they've reserved.

#### Add to Wish List

Add preferred places to a wish list for future reference.

#### View Wish List

Review all the places added to the wish list.

#### View Reservations

Check reservations, including status (approved, pending, or rejected).

#### Host Module

Add New Listing
Hosts can add their places by providing details such as property type, space type, location, capacity, amenities, and nightly price.

#### Manage Listing

Update information for existing listings.

#### View Reservations

Hosts can view currently hosting reservations, upcoming reservations, checking out reservations, and reservations to be approved.

#### Approve/Reject Reservations

Hosts can accept or reject reservation requests, viewing guest details and stay duration.

### Prerequisites:

_Node.js_: Make sure you have Node.js installed on your machine.

_MySQL_: Install MySQL on your machine.

### Setup:

Clone the Repository:

`git clone [repository_url]`

Navigate to the Project Directory:

`cd [project_directory]`

Install Dependencies:

`npm install`

Database Setup:

- Create a new MySQL database for the project.

Import the provided SQL schema file into the database. You can use a tool like MySQL Workbench or the command line

### Running the Application:

Start the Server:

`npm start`

This command will start the server. By default, the server might run on http://localhost:3000. You can check the console output for the exact URL.

#### Access the Application:

Open your web browser and navigate to the specified URL (e.g., http://localhost:3000).

##### Explore the Application:

Register an account or use existing credentials for testing.
Explore both guest and host functionalities.
Interact with the search, reservation, and listing features.

### Notes:

Make sure your MySQL server is running.
Ensure that the required Node.js packages are installed using npm install.
The application might have additional configuration files or scripts based on the actual structure of your project. Adjust accordingly.
