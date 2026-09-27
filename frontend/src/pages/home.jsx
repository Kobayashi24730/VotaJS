import { motion } from "framer-motion"
import { Vote, Activity, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Home() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden flex items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Cards/Blobs Flutuantes de Fundo */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-10 right-10 -z-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 left-10 -z-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Lado Esquerdo: Texto e Ações */}
        <div className="flex flex-col items-start gap-6">
          {/* Badge de status */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Sistema VotaJS em Tempo Real
          </motion.div>

          {/* Título Principal */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground text-left"
          >
            Sistema de enquetes em <span className="text-primary underline decoration-primary/30 decoration-wavy">Java</span>
          </motion.h1>

          {/* Subtítulo animado */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground text-left max-w-xl"
          >
            Aqui você vota em tempo real. Crie votações instantâneas, acompanhe os resultados em live e analise a participação do seu público.
          </motion.p>

          {/* Botões de Ação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <Button size="lg" className="gap-2 font-semibold shadow-lg shadow-primary/25">
              Criar Enquete
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Ver Resultados
            </Button>
          </motion.div>

          {/* Recursos / Destaques */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 gap-4 pt-6 border-t border-border/60 w-full"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Alta Concorrência</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Activity className="h-4 w-4 text-primary" />
              <span>Atualização Instantânea</span>
            </div>
          </motion.div>
        </div>

        {/* Lado Direito: Imagem e Card Flutuante */}
        <div className="relative flex justify-center items-center">
          {/* Imagem do Hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 w-full max-w-md lg:max-w-none"
          >
            <img
              src="hero.png"
              alt="foto topo"
              className="w-full h-auto object-cover rounded-2xl border border-border shadow-2xl"
            />
          </motion.div>

          {/* Card Flutuante sobreposto à imagem */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 30 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              y: [0, -10, 0] 
            }}
            transition={{ 
              opacity: { duration: 0.5, delay: 0.5 },
              x: { duration: 0.5, delay: 0.5 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -bottom-6 -left-6 z-20 hidden sm:flex items-center gap-3 p-4 rounded-xl bg-card/90 backdrop-blur-md border border-border/80 shadow-xl"
          >
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <Vote className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Votos computados</p>
              <p className="text-lg font-bold text-foreground">+10.000 hoje</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}