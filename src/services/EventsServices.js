import httpCommon from "../http-common";

const createEvent = async (data, token) => {
    const res = await httpCommon.post(`/api/event/`, JSON.stringify(data), {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
    return res
};
const getEvents = async (token) => {
    const res = await httpCommon.get(`/api/event/`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
    return res
};

const getApprovalBodies = async (token) => {
    const res = await httpCommon.get(`/api/user/get/approval-bodies`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
    return res
}

const updateEvent = async (data, token, id) => {
    const res = await httpCommon.put(`/api/event/${id}`, JSON.stringify(data), {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
    return res
}

const publishEvent = async (token, id) => {
    const res = await httpCommon.patch(`/api/event/publish/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
    return res
}



export default {
    createEvent,
    getEvents,
    getApprovalBodies,
    updateEvent,
    publishEvent
}