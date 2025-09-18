# WanderDost | Travel & Stay Platform

WanderDost is a full-stack web application that enables travelers to explore destinations and property owners to list their accommodations.  
It provides an intuitive interface, secure authentication, rich media support, and map-based exploration — deployed with MongoDB Atlas and Render.

---

## Features

- **Authentication & Authorization** – Secure login/logout and role-based access using Passport.js.  
- **Listings Management** – Property owners can add, edit, and delete their listings.  
- **Image Uploads** – Integrated with **Cloudinary** for scalable media storage.  
- **Reviews & Ratings** – Travelers can leave feedback on listings.  
- **Map Integration** – Display listings on interactive maps using **Mapbox**.  
- **Search & Filters** – Browse listings by categories, price, or location.  
- **MVC Architecture** – Clean separation of concerns for maintainability.  
- **Deployment** – Backend on **Render**, database on **MongoDB Atlas**.

---

## Tech Stack

- **Frontend:** HTML, CSS, Bootstrap, Tailwind CSS, EJS  
- **Backend:** Node.js, Express.js, REST APIs  
- **Database:** MongoDB Atlas  
- **Other Tools:** Passport.js (Auth), Cloudinary (Images), Mapbox (Maps), Git/GitHub  

---

## Installation & Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/Tanmay-0101/WanderDost.git
   cd WanderDost
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Set up environment variables (.env file)**
   Create a .env file in the project root and add the following:
   ```bash
   ATLASDB_URL=your_mongodb_atlas_connection_string
   CLOUD_NAME=your_cloudinary_name
   CLOUD_API_KEY=your_cloudinary_key
   CLOUD_API_SECRET=your_cloudinary_secret
   MAP_TOKEN=your_mapbox_token
   SECRET=your_session_secret
   ```
4. **Run the app**
   ```bash
   node index.js
   ```
   or (if nodemon installed):
   ```bash
   nodemon index.js
   ```
5. **Open in browser**
   ```bash
   http://localhost:8080
   ```

---

### Deployment
**Frontend + Backend**: Hosted on Render
**Database**: Hosted on MongoDB Atlas

## Author
Tanmay Tyagi – [GitHub](https://github.com/Tanmay-0101)

## Live Demo
[WanderDost on render](https://wanderdost.onrender.com/listings)
