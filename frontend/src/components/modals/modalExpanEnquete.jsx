import React from "react";
import { X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import votaLogo from "@/assets/votaLogo.svg";
import { usePolls } from "@/hooks/usePolls";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export function ModalExpanEnquete({ poll, isOpen, onClose, onVote }) {
    const {submitVote: vote} = usePolls();
    const { signed, user } = useAuth();
    if (!isOpen) return null;


    const totalVotes = poll?.options?.reduce((acc, curr) => acc + (curr.votes || 0), 0) || 0;

    const handleVote = async (pollId, optionId, user) => {
        if (signed !== true) return toast.error("Faça login para votar.");
        const response = await vote(pollId, optionId, user);
        console.log(response);
        if (response) return toast.success("Voto realizado com sucesso!");
        else return toast.error("Erro ao votar na enquete.");
        onClose();
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
            {/* Caixa Principal do Modal */}
            <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/50">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">{poll?.title || "Detalhes da enquete"}</h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Criada por: <span className="font-medium text-slate-700">{poll?.author || poll?.createdBy || "Desconhecido"}</span>
                        </p>
                    </div>
                    
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="h-8 w-8 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {/* Conteúdo */}
                <div className="p-6 overflow-y-auto space-y-5 flex-1">
                    <p className="text-sm text-slate-600 leading-relaxed">
                        {poll?.description || "Selecione uma das opções abaixo para registar o seu voto e acompanhar os resultados em tempo real."}
                    </p>

                    {/* Lista de Opções Estilizada */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Opções disponíveis</h4>
                        
                        <div className="flex flex-col gap-2.5">
                            {poll?.options && poll.options.length > 0 ? (
                                poll.options.map((op) => {
                                    //? Calcula a percentagem de votos de cada opção
                                    const percentage = totalVotes > 0 ? Math.round((op.votes / totalVotes) * 100) : 0;

                                    return (
                                        <button
                                            key={op.id}
                                            onClick={() => handleVote(poll.id, op.id, user)}
                                            className="group relative w-full text-left overflow-hidden rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs transition-all duration-200 hover:border-[#0078d4] hover:shadow-md hover:bg-slate-50/50 active:scale-[0.99]"
                                        >
                                            <div 
                                                className="absolute inset-y-0 left-0 bg-[#0078d4]/10 transition-all duration-500" 
                                                style={{ width: `${percentage}%` }}
                                            />
                                            <div className="relative z-10 flex items-center justify-between gap-4">
                                                <span className="text-sm font-medium text-slate-800 group-hover:text-[#0078d4] transition-colors">
                                                    {op.text}
                                                </span>
                                                
                                                <div className="flex items-center gap-3 shrink-0">
                                                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md group-hover:bg-[#0078d4]/10 group-hover:text-[#0078d4] transition-colors">
                                                        {op.votes} {op.votes === 1 ? "voto" : "votos"} ({percentage}%)
                                                    </span>
                                                    <CheckCircle2 className="h-4 w-4 text-slate-300 group-hover:text-[#0078d4] transition-colors" />
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })
                            ) : (
                                <p className="text-sm text-slate-400 italic text-center py-4">Nenhuma opção registada nesta enquete.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 px-6 py-4 bg-slate-50/50 gap-3 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                        <img src={votaLogo} alt="Logo site" className="h-5 w-5" />
                        <span className="font-semibold text-slate-700">Vota<span className="text-[#0078d4]">Js</span></span>
                    </div>
                    <p className="text-center sm:text-right">
                        Todos os direitos reservados ao dev kobayashi &copy; <strong>2026</strong>.
                    </p>
                </div>
            </div>
        </div>
    );
}