# Business Card Parser

## Description

Parses Name Phone and Email address out of business card text.

## Quickstart

## Requirements

- Node 16
- NPM 7

or

- Docker

### Steps to Run With NPM

Run the Following:
```bash
npm install
npm start
```

### Steps to Run With Docker

Run the Following:
```bash
docker build . -t business-card-reader
docker run -p 8080:8080 business-card-reader
```

Navigate to localhost:8080.

Enter the business card text in the text box.

## Testing

There are jasmine unit tests to test functionality. Those tests are run as follows:

### Steps to Run With NPM

Run the following: 
```bash
npm install
npm test
```

### Steps to Run With Docker

Run the Following:
```bash
docker build . -t business-card-reader
docker run business-card-reader npm test
```