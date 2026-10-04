import { useState, useEffect, useCallback } from "react";
import { pollServices } from "@/services/pollSevices";

export function usePolls() {
    const [polls, setPolls] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPolls = useCallback(async () => {
        try {
            setLoading(true);
            const data = await pollServices.getAllPolls();
            setPolls(data);
        } catch (err) {
            setError("Erro ao carregar as encontrada.");
        } finally {
            setLoading(false);
        }
    }, []);

    const createPoll = async (newPoll) => {
        try {
            const response = await pollServices.createPoll(newPoll);
            setPolls((prev) => [...prev, response]);
            return response;
        } catch (err) {
            console.error("Detalhes do erro:", err.response?.data || err);
            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "Erro ao criar uma nova enquete.";

            throw new Error(errorMessage);
        }
    };

    const submitVote = async (pollId, optionId) => {
        try {
            const response = await pollServices.vote(pollId, optionId);
            await fetchPolls();
        } catch (err) {
            throw new Error("Erro ao votar na enquete.");
        }
    };

    useEffect(() => {
        fetchPolls();
    }, [fetchPolls]);

    return { polls, loading, error, createPoll, fetchPolls, submitVote };
}