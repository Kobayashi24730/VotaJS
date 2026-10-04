import React, { useState } from "react";

export function ModalCreate({ isOpen, onClose, onApplyFilters }) {
  const [category, setCategory] = useState("");
  const [voteRange, setVoteRange] = useState("Todos");
  const [sortBy, setSortBy] = useState("newest");

  if (!isOpen) return null;

  const handleApplyFilters = () => {
    onApplyFilters({ category, voteRange, sortBy });
    onClose();
  };

  const handleResetFilters = () => {
    setCategory("");
    setVoteRange("Todos");
    setSortBy("newest");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl border border-slate-100">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-lg font-bold text-slate-900">Filtrar Enquetes</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl font-semibold leading-none"
          >
            &times;
          </button>
        </div>

        <div className="mt-4 space-y-5">
          {/* Categoria / Tema */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Categoria
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-800 focus:border-[#0078d4] focus:outline-none"
            >
              <option value="">Todas as Categorias</option>
              <option value="tecnologia">Tecnologia</option>
              <option value="games">Games</option>
              <option value="esportes">Esportes</option>
              <option value="geral">Geral</option>
            </select>
          </div>

          {/* Filtro por Quantidade de Votos */}
          <div>
            <span className="block text-sm font-medium text-slate-700 mb-2">
              Volume de Votos
            </span>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="votes"
                  value="all"
                  checked={voteRange === "all"}
                  onChange={(e) => setVoteRange(e.target.value)}
                  className="text-[#0078d4] focus:ring-[#0078d4]"
                />
                <span className="text-sm text-slate-600">Qualquer quantidade</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="votes"
                  value="under-50"
                  checked={voteRange === "under-50"}
                  onChange={(e) => setVoteRange(e.target.value)}
                  className="text-[#0078d4] focus:ring-[#0078d4]"
                />
                <span className="text-sm text-slate-600">Até 50 votos</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="votes"
                  value="over-50"
                  checked={voteRange === "over-50"}
                  onChange={(e) => setVoteRange(e.target.value)}
                  className="text-[#0078d4] focus:ring-[#0078d4]"
                />
                <span className="text-sm text-slate-600">Mais de 50 votos</span>
              </label>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="mt-6 flex justify-end space-x-3 border-t border-slate-100 pt-4">
          <button
            onClick={handleResetFilters}
            className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Limpar Filtros
          </button>
          <button
            onClick={handleApplyFilters}
            className="rounded-md bg-[#0078d4] px-4 py-2 text-sm font-medium text-white hover:bg-[#0063b1] transition-colors"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  );
}