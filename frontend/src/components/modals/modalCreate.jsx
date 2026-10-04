import React, { useState } from "react";
import { usePolls } from "@/hooks/usePolls";

export function ModalCreate({ isOpen, onClose }) {
  const { createPoll } = usePolls();
  const [questionCategory, setQuestionCategory] = useState("Tecnologia");
  const [descriptionTitle, setDescriptionTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState(["", ""]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const resetForm = () => {
    setQuestionCategory("Tecnologia");
    setDescriptionTitle("");
    setDescription("");
    setOptions(["", ""]);
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!descriptionTitle.trim() || !description.trim()) return;

    setIsSubmitting(true);
    setErrorMsg("");

    const payload = {
      question: questionCategory,
      author: "Usuário",
      descriptionTitle: descriptionTitle,
      description: description,
      options: options
        .filter((opt) => opt.trim() !== "")
        .map((text) => ({ text }))
    };

    try {
      await createPoll(payload);
      resetForm();
      onClose();
    } catch (err) {
      console.error("Erro ao criar enquete:", err);
      setErrorMsg("Falha ao criar enquete no servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-lg font-bold text-slate-900">Criar Enquete</h3>
          <button
            onClick={onClose}
            type="button"
            className="text-slate-400 hover:text-slate-600 text-2xl font-semibold leading-none"
          >
            &times;
          </button>
        </div>

        {errorMsg && (
          <div className="mt-3 p-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-md">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Categoria
            </label>
            <select
              value={questionCategory}
              onChange={(e) => setQuestionCategory(e.target.value)}
              className="w-full rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-800 focus:border-[#0078d4] focus:outline-none"
            >
              <option value="Tecnologia">Tecnologia</option>
              <option value="Games">Games</option>
              <option value="Esportes">Esportes</option>
              <option value="Geral">Geral</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Título da Pergunta / Enquete
            </label>
            <input
              type="text"
              required
              value={descriptionTitle}
              onChange={(e) => setDescriptionTitle(e.target.value)}
              placeholder="Ex: Qual o melhor ecossistema Java?"
              className="w-full rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-800 focus:border-[#0078d4] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Descrição detalhada
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Vote no seu framework de desenvolvimento preferido..."
              className="w-full rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-800 focus:border-[#0078d4] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Opções de Voto
            </label>
            <div className="space-y-2">
              {options.map((opt, index) => (
                <input
                  key={index}
                  type="text"
                  required
                  value={opt}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Opção ${index + 1}`}
                  className="w-full rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-800 focus:border-[#0078d4] focus:outline-none"
                />
              ))}
            </div>
            {options.length < 5 && (
              <button
                type="button"
                onClick={handleAddOption}
                className="mt-2 text-xs text-[#0078d4] hover:underline font-medium"
              >
                + Adicionar opção
              </button>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-[#0078d4] px-4 py-2 text-sm font-medium text-white hover:bg-[#0063b1] transition-colors"
            >
              {isSubmitting ? "Criando..." : "Criar Enquete"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}