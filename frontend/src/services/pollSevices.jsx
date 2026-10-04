import { api } from "@/api/api";

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
    vote: async (pollId, optionId) => {
        const response = await api.post(`/polls/${pollId}/vote`, {optionId});
        return response.data;
    }
}