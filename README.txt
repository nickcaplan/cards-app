How to run the Cards application
- Clone the repository
- Build and start the backend app with: "mvn clean install"
- Start the frontend app (in a separate command window) with: "yarn start" (will need to have yarn installed)
- Navigate to `http://localhost:9000`
- Log in as admin/admin (under Account)

Adding new cards
- The cards UI can be found under Entities

Viewing (H2) database
- Navigate to Administration --> Database

Uploading cards via CSV file
- Send POST request to http://localhost:8080/upload/csv (I use Postman)
- Include file as form-data with key "csvFile"