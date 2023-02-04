import httpCommon from "../http-common";

const createClub = async (data, token) => {
    const res = await httpCommon.post(`/api/club/`, JSON.stringify(data), {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
    return res
};
const getClubs = async (token) => {
    const res = await httpCommon.get(`/api/approval-body/club`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
    return res
};
// const getClubEvents = async (token) => {
//     const res = await httpCommon.get(`/api/approval-body/club`, {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//         }
//     });
//     return res
// };

// const getApprovalBodies = async (token) => {
//     const res = await httpCommon.get(`/api/user/get/approval-bodies`, {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//         }
//     });
//     return res
// }

const updateClub = async (data, token, id) => {
    const res = await httpCommon.put(`/api/club/${id}`, JSON.stringify(data), {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
    return res
}
const getClubEvents = async (data, token, id) => {
    const res = await httpCommon.put(`/api/approval-body/club_${id}`, JSON.stringify(data), {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
    return res
}



export default {
    createClub,
    getClubs,
    getClubEvents,
    updateClub
}