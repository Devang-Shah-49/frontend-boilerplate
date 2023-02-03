import axios from "axios";


export default function httpCommon(){
    axios.create({
    baseURL: "https://typer-api.onrender.com",

    headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    mode: "cors"
})};