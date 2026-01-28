# KGL Procurement API

A robust Node.js REST API designed to manage procurement records for KGL. This application uses a local file-based storage system (`data.json`) to persist data, allowing users to view existing records and append new ones via HTTP requests.

**Live Deployment:** [INSERT YOUR RENDER URL HERE]
*(Example: https://kgl-api-moaz.onrender.com/kgl/procurement)*

## 🚀 Features

* **Data Persistence:** Uses the file system (`fs` module) to store records in a JSON file.
* **RESTful Endpoints:**
    * `GET /kgl/procurement`: Retrieve all procurement records.
    * `POST /kgl/procurement`: Add a new procurement record.
* **Error Handling:** Robust handling for missing files, invalid JSON syntax, and bad requests.
* **Async/Await:** Built using modern JavaScript asynchronous patterns.

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Storage:** Local JSON file (`data.json`)

## ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/kgl-procurement-api.git](https://github.com/YOUR_USERNAME/kgl-procurement-api.git)
    cd kgl-procurement-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the server:**
    ```bash
    node server.js
    ```
    The server will start on port `3000` (or the port defined in your environment variables).

## 📡 API Usage

### 1. Get All Records
Retrieves the list of all procurement entries.

* **URL:** `/kgl/procurement`
* **Method:** `GET`
* **Success Response:** `200 OK`

**Example Request:**
```bash
curl http://localhost:3000/kgl/procurement