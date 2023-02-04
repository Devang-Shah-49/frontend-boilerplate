import httpCommon from "../http-common";

const createEvent = async (data, token) => {
    const res = await httpCommon.post(`/api/event/`, JSON.stringify(data), {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return res
};

export default {
    createEvent
}