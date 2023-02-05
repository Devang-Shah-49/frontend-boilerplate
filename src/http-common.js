import axios from "axios";


export default axios.create({
    baseURL: "https://typer-api-c29c.onrender.com",
    // baseURL: "https://typer-production.up.railway.app",


    headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    mode: "cors"
});