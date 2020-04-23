import React from 'react';
const NotFound = () => {
    return (
        <div className="white" style={
            {
                height: "90vh",
                paddingTop: ".1",
                backgroundImage: "url(https://c4.wallpaperflare.com/wallpaper/1016/946/462/half-life-2-minimalism-lambda-wallpaper-preview.jpg)",
                backgroundSize: "100%"

            }}>

            <h1 style={{ paddingTop: "10vh", fontSize: "15vh" }}>404 not found</h1>
            <p style={{ width: "50vw", fontSize: "5vh" }}>The page you have requested doesn't exist or you are not authorized to access</p>
        </div>
    )
}
export default NotFound;