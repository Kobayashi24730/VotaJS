import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { Cards } from "@/components/cards";
import { usePolls } from "@/hooks/usePolls";
import { ModalFilters } from "@/components/modals/modalFilters";
export function Enquetes(){
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState({
        category: "",
        sortBy: "newest",
    });
    const { polls, loading, fetchPolls } = usePolls();

    const handleApplyFilters = (filters) => {
        setActiveFilter(filters);
        setModalIsOpen(false);
    }
    return(
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                        Painel de Enquetes
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Gerencie, busque e crie novas votações para o seu público.
                    </p>
                </div>

                <Button className="bg-[#0078d4] hover:bg-[#0063b1] text-white gap-2 font-medium shadow-sm transition-all rounded-md px-5 self-start md:self-auto">
                    <Plus className="h-4 w-4" />
                    Criar Enquete
                </Button>
            </div>

            {/* Barra de Busca e Filtros */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
                {/* Campo de Pesquisa */}
                <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                    type="text"
                    placeholder="Pesquisar enquete..."
                    className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:border-transparent transition-all shadow-xs"
                    />
                </div>

                {/* Botão de Filtros */}
                <Button
                    variant="outline"
                    className="w-full sm:w-auto border-slate-200 text-slate-700 hover:bg-slate-50 gap-2 rounded-md font-medium px-4"
                    onClick={() => setModalIsOpen(true)}
                >
                    <SlidersHorizontal className="h-4 w-4 text-slate-500" />
                    Filtros
                </Button>
            </div>
            {modalIsOpen && <ModalFilters isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} onApplyFilters={handleApplyFilters} />}

            {/* Lista */}
            <div className="pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2.5">
                    <h3 className="text-lg font-bold tracking-tight text-slate-900">
                        Enquetes Criadas
                    </h3>
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 border border-slate-200/60">
                        {polls.length}
                    </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {polls.map((poll) => {
                        return (
                            <Cards key={poll.id} poll={poll} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}