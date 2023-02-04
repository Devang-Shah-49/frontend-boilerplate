import httpCommon from "../http-common";

const createCommittee = async (data, token) => {
    const res = await httpCommon.post(`/api/approval-body/create-club-account/`, JSON.stringify(data), {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
    return res
};

const raiseQuery = async (data, token) => {
    const res = await httpCommon.post(`/api/approval-body/raise-query/`, JSON.stringify(data), {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
    return res
}

export default {
    createCommittee
}