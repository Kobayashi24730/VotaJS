import { Calendar,  ArrowUpRight, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Cards(poll) {
  const pollFormat = poll.poll;
  return (
    <Card className="group relative mx-auto w-full max-w-sm overflow-hidden border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-slate-300">
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="poll.question"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

        {/* Tags */}
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-white/90 text-slate-800 backdrop-blur-md border border-slate-200/60 font-semibold shadow-xs hover:bg-white">
            {pollFormat?.question}
          </Badge>
        </div>
      </div>

      {/* Conteúdo do Card */}
      <CardHeader className="p-5 pb-2">
        <CardTitle className="text-base font-bold text-slate-900 line-clamp-1 group-hover:text-[#0078d4] transition-colors">
          {pollFormat.descriptionTitle ? pollFormat.descriptionTitle : pollFormat.question}
        </CardTitle>
        <CardDescription className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {pollFormat.description ? pollFormat.description : pollFormat.question}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-5 py-2 flex justify-between">
        {/* dados rápidos */}
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <BarChart3 className="h-3.5 w-3.5 text-[#0078d4]" />
          <span>{pollFormat.votesCount} votos</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <Calendar className="h-3.5 w-3.5 text-[#0078d4]" />
          <span>{pollFormat.date.split("T")[0]}</span>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-3">
        <Button className="w-full gap-2 bg-[#0078d4] hover:bg-[#0063b1] text-white font-medium shadow-xs transition-all">
          <span>Participar da Enquete</span>
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}