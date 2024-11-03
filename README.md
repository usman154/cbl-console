# CBL Console

CBL Console is a web application built with React for the frontend and Node.js for the backend. It provides a real-time interface to manage jobs and view logs through WebSocket communication.

## Features

- **Real-time Job Management**: Start jobs and receive real-time updates on their status.
- **Log Viewer**: View logs for each job in real time through a modal interface.
- **WebSocket Integration**: Utilizes WebSocket for persistent, low-latency communication between the frontend and backend.

## Technologies Used

- **Frontend**: React, Material-UI
- **Backend**: Node.js, Express
- **WebSocket**: WebSocket for real-time communication
- **Environment Variables**: Configured using `.env` for environment-specific settings.

## Getting Started

### Prerequisites

- Node.js (version 14 or above)
- npm (Node Package Manager)

### Setting Up the Project

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/cbl-console.git
   cd cbl-console
   ```

2. **Set up the backend:**

   - Navigate to the `backend` directory:
   
   ```bash
   cd backend
   ```

   - Install the necessary packages:
   
   ```bash
   npm install
   ```

   - Start the backend server:
   
   ```bash
   npm start
   ```

   Ensure the backend is running on the expected port (e.g., `localhost:3000`).

3. **Set up the frontend:**

   - Navigate to the `frontend` directory:
   
   ```bash
   cd ../frontend
   ```

   - Install the necessary packages:
   
   ```bash
   npm install
   ```

   - Create a `.env` file in the `frontend` directory and set the WebSocket URL:

   ```plaintext
   REACT_APP_WEBSOCKET_URL=ws://localhost:3000
   ```

   - Start the frontend application:
   
   ```bash
   npm start
   ```

   The application should open in your default web browser at `http://localhost:3000`.

## Usage

1. **Token Input**: On the initial load, you will be prompted to enter a token. This token is required for authenticating WebSocket connections.

2. **Starting Jobs**: Click on the "Start Job" buttons corresponding to each job type. The application will send a request to the backend to initiate the job.

3. **Viewing Job Status**: The status of each job will be displayed in real-time. You can click the "View" button next to each job's status to open a modal and view real-time logs.

4. **Error Handling**: If there are issues starting a job or if the WebSocket connection fails, appropriate error messages will be displayed.

## Components

- **useWebSocket**: Custom React hook for managing WebSocket connections and job statuses.
- **JobStatus**: Component that displays the status and provides a button to view logs for a job.
- **LogViewer**: Component that shows real-time logs for a specific job.
- **TokenInput**: Component for entering the authentication token.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any features or fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
