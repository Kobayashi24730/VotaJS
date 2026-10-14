import { useState, useEffect, useCallback } from "react";
import { pollServices } from "@/services/pollSevices";
import { toast } from "sonner";
import { EqualSquareIcon } from "lucide-react";

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
            //? Agora atualiza via SSE, mas mesmo assim pode mantar o mesmo -> setPolls((prev) => [...prev, response]);
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

    const submitVote = async (pollId, optionId, email) => {
        try {
            const hasVoted = await pollServices.vote(pollId, optionId, email); //? Atualiza imediatamente para o poprio ultilizador.
            if (hasVoted) {
                toast.error("Atenção: Você já votou nesta enquete!")
            } else {
                toast.success("Voto realizado com sucesso!");
                await fetchPolls();
            }
        } catch (err) {
            throw new Error(err.response?.data?.message || "Erro ao registar o voto na enquete.");
        }
    };

    const deletePoll = async (pollId, userEmail) => {
        try {

            const deleted = await pollServices.deletePoll(pollId, userEmail);
            if (deleted) {
                toast.success("Enquete apagada com sucesso!");
                await fetchPolls();
            } else {
                toast.error("Erro ao apagar a enquete.");
            }
        } catch (err) {
            throw new Error(err.response?.data?.message || "Erro ao apagar a enquete.");
        }
    }

    //? Carrega as enquetes iniciais.
    useEffect(() => {
        fetchPolls();
    }, [fetchPolls]);

    //? configuração da conexão SSE.
    useEffect(() => {
        const eventSource = new EventSource("http://localhost:8080/api/polls/stream");

        eventSource.addEventListener("polls-update", (event) => {
            try {
                const updatePolls = JSON.parse(event.data);

                setPolls((prevPolls) => {
                    const index = prevPolls.findIndex((p) => p.id === updatePolls.id);
                    if (index !== -1) {
                        const copy = [...prevPolls];
                        copy[index] = updatePolls;
                        return copy;
                    } else {
                        return [...prevPolls, updatePolls];
                    }
                });
            } catch (err) {
                console.error("Erro ao processar event SEE.", err);
            }
        });

        eventSource.onerror = (err) => {
            console.log("Erro na conexão SSE.", err);
            eventSource.close();
        }
        return () => {
            eventSource.close();
        }
    }, []);

    return { polls, loading, error, createPoll, fetchPolls, submitVote, deletePoll };
}