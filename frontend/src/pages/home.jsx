import { React, useState } from "react";
import { motion } from "framer-motion";
import { Vote, Activity, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Enquetes } from "@/components/sections/enquetes";
import { AnimateSections } from "@/components/animateSections";
import imgEs from "../assets/Checklist-removebg-preview.png";
import { ModalCreate } from "@/components/modals/modalCreate";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export function Home() {
  const { signed } = useAuth();
  const navigate = useNavigate(); 
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const handleCreatePoll = (newPollData) => {
    if (!signed) {
      navigate("/login");
      return;
    }
    setIsOpenCreateModal(false);
  }

  return (
    <div className="w-full bg-white overflow-hidden">
      <section className="relative min-h-[calc(80vh-4rem)] flex items-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <motion.div
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-10 right-10 -z-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"
        />

        <motion.div
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-10 left-10 -z-10 w-[30rem] h-[30rem] bg-sky-400/10 rounded-full blur-[120px]"
        />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Lado Esquerdo: Conteúdo textual com delays escalonados */}
          <div className="flex flex-col items-start gap-6">
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#0078d4] shadow-xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0078d4] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0078d4]"></span>
              </span>
              Sistema VotaJS em Tempo Real
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 text-left leading-[1.15]"
            >
              Sistema de enquetes em{" "}
              <span className="text-[#0078d4] underline decoration-[#0078d4]/30 decoration-wavy underline-offset-8">
                Java
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 text-left max-w-xl leading-relaxed"
            >
              Aqui você vota em tempo real. Crie votações instantâneas, acompanhe os resultados ao vivo e analise a participação do seu público.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Button size="lg" variant="outline" onClick={() => setIsOpenCreateModal(true)} className="gap-2 font-medium bg-[#0078d4] hover:bg-[#0063b1] text-white shadow-md hover:shadow-lg transition-all rounded-md px-6">
                Criar Enquete
                <ArrowRight className="h-4 w-4" />
              </Button>
              {isOpenCreateModal && (
                <ModalCreate
                  isOpen={isOpenCreateModal}
                  onClose={() => setIsOpenCreateModal(false)}
                  onConfirm={handleCreatePoll}
                />
              )}
              <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 rounded-md px-6">
                Ver Resultados
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200/80 w-full"
            >
              <div className="flex items-center gap-2.5 text-sm text-slate-600 font-medium">
                <CheckCircle2 className="h-4 w-4 text-[#0078d4]" />
                <span>Alta Concorrência</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-600 font-medium">
                <Activity className="h-4 w-4 text-[#0078d4]" />
                <span>Atualização Instantânea</span>
              </div>
            </motion.div>
          </div>

          {/* Lado Direito: Imagem e Card Flutuante */}
          <div className="relative flex justify-center items-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10 w-full max-w-md lg:max-w-none group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl blur-md opacity-25 group-hover:opacity-40 transition duration-500"></div>

              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-2xl">
                <img
                  src={imgEs}
                  alt="Foto do Painel de Enquetes"
                  className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-500"
                />
              </div>
            </motion.div>

            {/* Card Flutuante */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: 30 }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                y: [0, -8, 0] 
              }}
              transition={{ 
                opacity: { duration: 0.5, delay: 0.5 },
                x: { duration: 0.5, delay: 0.5 },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute -bottom-4 -left-2 z-30 hidden sm:flex items-center gap-3.5 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xl"
            >
              <div className="p-3 rounded-lg bg-blue-50 text-[#0078d4] border border-blue-100">
                <Vote className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Votos computados</p>
                <p className="text-lg font-bold text-slate-900">+10.000 hoje</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimateSections delay={0.1}>
        <section className="w-full">
          <Enquetes />
        </section>
      </AnimateSections>
    </div>
  )
}