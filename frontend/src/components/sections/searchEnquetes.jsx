import { Button } from "@/components/ui/button";
import { CalendarPlus, Search, SlidersHorizontal, TrendingUp } from "lucide-react";
import { Cards } from "@/components/cards";
import { AnimateSections } from "@/components/animateSections";
import { usePolls } from "@/hooks/usePolls";
import { useMemo, useState } from "react";

export function SearchEnquetes() {
  const { polls, loading, fetchPolls } = usePolls();

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Todos");

  const filterPolls = useMemo(() => {
    if (!polls) return [];

    let result = polls.filter((poll) => {
      const term = search.toLowerCase();
      const question = poll.question?.toLowerCase().includes(term);
      const description = poll.description?.toLowerCase().includes(term);
      const tilematch = poll.descriptionTitle?.toLowerCase().includes(term);

      return question || description || tilematch;
    });

    if (sortBy === "popular") {
      result = [...result].sort((a, b) => (b.votesCount || 0) - (a.votesCount || 0));
    } else if (sortBy === "date") {
      result = result.sort((a, b) => new Date(b.vote) - new Date(a.vote));
    }

    return result;
  }, [polls, search, sortBy]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      <AnimateSections delay={0.1}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <p className="text-sm text-slate-500 mt-1">
              Busque enquetes de acordo com o seu gosto.
            </p>
          </div>
        </div>
      </AnimateSections>

      {/* Barra de Busca e Filtros */}
      <AnimateSections delay={0.2}>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar enquete..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:border-transparent transition-all shadow-xs"
            />
          </div>

          <Button
            variant="outline"
            className="w-full sm:w-auto border-slate-200 text-slate-700 hover:bg-slate-50 gap-2 rounded-md font-medium px-4"
          >
            <SlidersHorizontal className="h-4 w-4 text-slate-500" />
            Filtros
          </Button>
          <Button
            variant={sortBy === "date" ? "default" : "outline"}
            onClick={(e) => setSortBy("date")}
            className="bg-[#0078d4] hover:bg-[#0063b1] text-white gap-2 font-medium shadow-sm transition-all rounded-md px-5 self-start md:self-auto"
          >
            <CalendarPlus className="h-4 w-4" />
            Data
          </Button>
          <Button
            variant={sortBy === "popular" ? "default" : "outline"}
            onClick={() => setSortBy("popular")}
            className="bg-[#0078d4] hover:bg-[#0063b1] text-white gap-2 font-medium shadow-sm transition-all rounded-md px-5 self-start md:self-auto"
          >
            <TrendingUp className="h-4 w-4" />
            Populares
          </Button>
        </div>
      </AnimateSections>

      {/* Lista de Enquetes */}
      <AnimateSections delay={0.3}>
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
            {polls.map((poll, key) => {
              return (
                <Cards id={key} poll={poll}/>
              )
            })}
          </div>
        </div>
      </AnimateSections>
    </div>
  );
}

