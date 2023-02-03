import httpCommon from "../http-common";

const login = (data) => {
    return httpCommon.post(`/api/auth/typer/signin`, data);
};

const verifyOTP = async (data, token) => {
    const res = await httpCommon.post(`/api/auth/typer/verify-otp`, JSON.stringify(data), {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return res
};


const signup = (data) => {
    return httpCommon.post(`/api/auth/typer/signup`, data);
};

export default {
    login,
    signup,
    verifyOTP
}