# 🚀 Express + MongoDB GridFS File Uploader with Logging

This project is an **Express.js API** that allows users to **upload multiple files** directly to **MongoDB GridFS**. Additionally, it logs all server activity to **MongoDB**, ensuring persistent logging.

## 🌟 Features
✅ Upload **multiple files** directly to **MongoDB GridFS**  
✅ Uses **Multer** for handling file uploads  
✅ Saves logs (errors, uploads, server events) to **MongoDB**  
✅ Supports **Windows & Linux** environments  
✅ Clean **TypeScript** implementation  

---

## 🛠️ **Installation & Setup**
### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo
2️⃣ Install Dependencies
npm install
3️⃣ Set Up Environment Variables
Create a .env file in the root directory:
ATLAS_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/yourDatabase
LOGS_BUCKET_NAME=logs
UPLOADS_BUCKET_NAME=uploads
PORT=3000
4️⃣ Start the Server
npm run dev
🚀 Uploading Multiple Files

This API supports multiple file uploads in a single request.
📌 Endpoint:
POST /upload
Request Type: multipart/form-data
Form Field Name: files
📌 Example Request (Using cURL)
curl -X POST -F "files=@file1.jpg" -F "files=@file2.png" http://localhost:3000/upload
📌 Example Response
{
  "message": "Files uploaded successfully",
  "files": [
    {
      "filename": "file1.jpg",
      "size": 204800
    },
    {
      "filename": "file2.png",
      "size": 512000
    }
  ]
}
📜 Logging to MongoDB

This project logs all important events (uploads, errors, server status) into a MongoDB collection.
📌 Example Log Entry
{
  "timestamp": "2025-03-08T13:42:00.915Z",
  "level": "info",
  "message": "User uploaded 2 files"
}
🛠️ Built With

    Express.js – Backend framework
    Multer – File uploads
    MongoDB GridFS – Large file storage
    Winston – Logging
    TypeScript – Strongly typed JavaScript
