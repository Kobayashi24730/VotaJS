import { api } from "@/api/api";

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('@App:token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export const pollServices = {
    getAllPolls: async () => {
        const response = await api.get('/polls');
        return response.data;
    },
    getPollById: async (id) => {
        const response = await api.get(`/polls/${id}`);
        return response.data;
    },
    createPoll: async (poll) => {
        const response = await api.post('/polls', poll);
        return response.data;
    },
    vote: async (pollId, optionId, email) => {
        const response = await api.post(`/polls/${pollId}/vote?optionId=${optionId}`, { email: email });
        return response.data.hasVoted;
    },
    deletePoll: async (pollId, userEmail) => {
        await api.delete(`/polls/${pollId}?userEmail=${userEmail}`);
    }
}