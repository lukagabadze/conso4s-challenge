# Conso4s-backend-challenge

## Installation

clone the project:
```bash
git clone https://github.com/lukagabadze/conso4s-challenge
cd conso4s-challenge
```

Install the dependencies:
```bash
npm install
```
or
```bash
yarn
```

## Deployment
To run the project in development environment just run the following command (make sure you have docker and docker-compose installed)
```bash
docker-compose -f docker-compose.dev.yml build
docker-compose -f docker-compose.dev.yml up
```

For the production version of the project just run:
```bash
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up
```

## API Documentation
Documentation gets auto generated every time a change is made to the api and is displayed on ``localhost:4000/api_docs`` using ``tsoa`` and ``swagger-ui``.


## Examples
To test the project locally you can just run the following commands on the terminal:

```bash
# to query all the employees
curl localhost:4000/employee
```
```bash
# to create a new employee on the database
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"firstName":"luka","lastName":"gabadze"}' \
  localhost:4000/employee
```
To get an employees QR Code Image you can visit ``localhost:4000/employee/${employeeId}/qr-code``

After this, employees can just screenshot the QR Code and use it to checkin/checkout without internet connection (only the device scanning the code will need to have internet).

To manually checkin/checkout an employee just run the following command:
```bash
localhost:4000/employee/${employeeId}/check-in
```
