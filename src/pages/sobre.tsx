import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface InfoCardProps {
  title: string
  content: string
}

const InfoCard: React.FC<InfoCardProps> = ({ title, content }) => (
  <Card className="w-full max-w-md mx-auto my-4">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p>{content}</p>
    </CardContent>
  </Card>
)

const Sobre: React.FC = () => {

  return (
    <div className="min-h-screen flex flex-col items-center bg-background">
      <div className="flex flex-col items-center mb-10 w-full max-w-4xl px-4">
        <div className="mt-10 bg-primary text-primary-foreground p-4 rounded-md">
          <h2 className="text-xl font-semibold">O que é o OpenEduSim?</h2>
        </div>

        <InfoCard
          title="OpenEduSim"
          content="O OpenEduSim é uma plataforma de simulação de provas de vestibulares e concursos públicos. Aqui você pode fazer simulados de provas de vestibulares e concursos públicos de forma gratuita e participar do nosso ranking."
        />

        <InfoCard
          title="Objetivo"
          content="O objetivo do OpenEduSim é ajudar estudantes a se prepararem para provas de vestibulares e concursos públicos. Aqui você pode fazer simulados de provas de vestibulares e concursos públicos de forma gratuita e participar do nosso ranking."
        />

        <InfoCard
          title="Público-alvo"
          content="O público-alvo deste projeto são os estudantes que estão se preparando para o ENEM"
        />

        <InfoCard
          title="Banco de dados"
          content="O banco de dados das questões do site foi criado a partir de um algoritmo que utiliza de OCR (Reconhecimento Ótico de Caracteres) para reconhecer todos os caracteres das provas anteriores do ENEM, juntamente com a utilização de expressões regulares para separar cada pergunta, formulando um banco para criar esta aplicação web que simula as avaliações."
        />
      </div>
    </div>
  )
}

export default Sobre;