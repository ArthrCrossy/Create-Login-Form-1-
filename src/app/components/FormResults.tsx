import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { CheckCircle2, Download, RotateCcw } from "lucide-react";
import { Separator } from "./ui/separator";

interface FormResultsProps {
  data: any;
  onReset: () => void;
}

export function FormResults({ data, onReset }: FormResultsProps) {
  const imc = data.peso && data.altura ? (data.peso / Math.pow(data.altura / 100, 2)).toFixed(1) : 'N/A';

  const rcq = data.cintura && data.quadril ? (data.cintura / data.quadril).toFixed(2) : 'N/A';

  const downloadJSON = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `avaliacao-nutricional-${data.nome?.replace(/\s+/g, '-').toLowerCase()}.json`;
    link.click();
  };
    return (
    <div className="space-y-6">
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="size-8 text-green-600" />
            <div>
              <h3 className="text-lg">Avaliação Enviada com Sucesso!</h3>
              <p className="text-sm text-gray-600">Os dados foram coletados e estão prontos para análise nutricional.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resumo da Avaliação</CardTitle>
          <CardDescription>Dados coletados do paciente</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">

          <div>
            <h3 className="font-semibold mb-3">Dados Pessoais</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              {data.nome && <div><span className="text-gray-600">Nome:</span> <span>{data.nome}</span></div>}
              {data.idade && <div><span className="text-gray-600">Idade:</span> <span>{data.idade} anos</span></div>}
              {data.sexo && <div><span className="text-gray-600">Sexo:</span> <span className="capitalize">{data.sexo}</span></div>}
              {data.altura && <div><span className="text-gray-600">Altura:</span> <span>{data.altura} cm</span></div>}
              {data.peso && <div><span className="text-gray-600">Peso:</span> <span>{data.peso} kg</span></div>}
              {imc !== 'N/A' && <div><span className="text-gray-600">IMC:</span> <span className="font-semibold">{imc}</span></div>}
              {data.email && <div className="col-span-2"><span className="text-gray-600">E-mail:</span> <span>{data.email}</span></div>}
              {data.telefone && <div><span className="text-gray-600">Telefone:</span> <span>{data.telefone}</span></div>}
            </div>
          </div>

          <Separator />

          {(data.cintura || data.quadril || data.braco || data.coxa) && (
            <>
              <div>
                <h3 className="font-semibold mb-3">Medidas Corporais</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  {data.cintura && <div><span className="text-gray-600">Cintura:</span> <span>{data.cintura} cm</span></div>}
                  {data.quadril && <div><span className="text-gray-600">Quadril:</span> <span>{data.quadril} cm</span></div>}
                  {rcq !== 'N/A' && <div><span className="text-gray-600">RCQ:</span> <span className="font-semibold">{rcq}</span></div>}
                  {data.braco && <div><span className="text-gray-600">Braço:</span> <span>{data.braco} cm</span></div>}
                  {data.coxa && <div><span className="text-gray-600">Coxa:</span> <span>{data.coxa} cm</span></div>}
                  {data.panturrilha && <div><span className="text-gray-600">Panturrilha:</span> <span>{data.panturrilha} cm</span></div>}
                  {data.pescoco && <div><span className="text-gray-600">Pescoço:</span> <span>{data.pescoco} cm</span></div>}
                </div>
              </div>
              <Separator />
            </>
          )}

          {data.objetivo && (
            <>
              <div>
                <h3 className="font-semibold mb-3">Objetivos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div><span className="text-gray-600">Objetivo:</span> <span className="capitalize">{data.objetivo?.replace('-', ' ')}</span></div>
                  {data.pesoDesejado && <div><span className="text-gray-600">Peso Desejado:</span> <span>{data.pesoDesejado} kg</span></div>}
                  {data.prazo && <div><span className="text-gray-600">Prazo:</span> <span>{data.prazo} meses</span></div>}
                </div>
              </div>
              <Separator />
            </>
          )}

          {data.nivelAtividade && (
            <>
              <div>
                <h3 className="font-semibold mb-3">Atividade Física</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-600">Nível de Atividade:</span> <span className="capitalize">{data.nivelAtividade?.replace('-', ' ')}</span></div>
                  {data.treinaAtualmente && <div><span className="text-gray-600">Treina Atualmente:</span> <span className="capitalize">{data.treinaAtualmente}</span></div>}
                  {data.frequenciaTreino && <div><span className="text-gray-600">Frequência:</span> <span>{data.frequenciaTreino}</span></div>}
                  {data.tipoTreino && data.tipoTreino.length > 0 && (
                    <div><span className="text-gray-600">Tipos de Treino:</span> <span>{data.tipoTreino.join(', ')}</span></div>
                  )}
                </div>
              </div>
              <Separator />
            </>
          )}

          {(data.restricoes?.length > 0 || data.alergias || data.intolerancia) && (
            <>
              <div>
                <h3 className="font-semibold mb-3">Restrições Alimentares</h3>
                <div className="space-y-2 text-sm">
                  {data.restricoes && data.restricoes.length > 0 && (
                    <div><span className="text-gray-600">Restrições:</span> <span>{data.restricoes.join(', ')}</span></div>
                  )}
                  {data.alergias && <div><span className="text-gray-600">Alergias:</span> <span>{data.alergias}</span></div>}
                  {data.intolerancia && <div><span className="text-gray-600">Intolerâncias:</span> <span>{data.intolerancia}</span></div>}
                  {data.preferenciasAlimentares && <div><span className="text-gray-600">Preferências:</span> <span>{data.preferenciasAlimentares}</span></div>}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Hábitos Alimentares */}
          {(data.numeroRefeicoes || data.consumoAgua || data.bebidaAlcoolica) && (
            <>
              <div>
                <h3 className="font-semibold mb-3">Hábitos Alimentares</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  {data.numeroRefeicoes && <div><span className="text-gray-600">Refeições/Dia:</span> <span>{data.numeroRefeicoes}</span></div>}
                  {data.consumoAgua && <div><span className="text-gray-600">Consumo de Água:</span> <span>{data.consumoAgua}</span></div>}
                  {data.bebidaAlcoolica && <div><span className="text-gray-600">Álcool:</span> <span className="capitalize">{data.bebidaAlcoolica}</span></div>}
                  {data.historicoDietas && <div className="col-span-2"><span className="text-gray-600">Histórico de Dietas:</span> <span>{data.historicoDietas}</span></div>}
                </div>
              </div>
              <Separator />
            </>
          )}

          {(data.doencas || data.medicamentos || data.cirurgias || data.suplementos) && (
            <>
              <div>
                <h3 className="font-semibold mb-3">Histórico de Saúde</h3>
                <div className="space-y-2 text-sm">
                  {data.doencas && <div><span className="text-gray-600">Doenças:</span> <span>{data.doencas}</span></div>}
                  {data.medicamentos && <div><span className="text-gray-600">Medicamentos:</span> <span>{data.medicamentos}</span></div>}
                  {data.cirurgias && <div><span className="text-gray-600">Cirurgias:</span> <span>{data.cirurgias}</span></div>}
                  {data.suplementos && <div><span className="text-gray-600">Suplementos:</span> <span>{data.suplementos}</span></div>}
                </div>
              </div>
              <Separator />
            </>
          )}

          {(data.horaAcordar || data.horaDormir || data.ocupacao) && (
            <div>
              <h3 className="font-semibold mb-3">Rotina e Estilo de Vida</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {data.horaAcordar && <div><span className="text-gray-600">Hora de Acordar:</span> <span>{data.horaAcordar}</span></div>}
                {data.horaDormir && <div><span className="text-gray-600">Hora de Dormir:</span> <span>{data.horaDormir}</span></div>}
                {data.horasSono && <div><span className="text-gray-600">Horas de Sono:</span> <span>{data.horasSono}h</span></div>}
                {data.ocupacao && <div><span className="text-gray-600">Ocupação:</span> <span>{data.ocupacao}</span></div>}
                {data.horarioTrabalho && <div><span className="text-gray-600">Horário de Trabalho:</span> <span>{data.horarioTrabalho}</span></div>}
                {data.nivelEstresse && <div><span className="text-gray-600">Nível de Estresse:</span> <span className="capitalize">{data.nivelEstresse}</span></div>}
              </div>
              {data.observacoes && (
                <div className="mt-3 text-sm">
                  <span className="text-gray-600">Observações:</span> <p className="mt-1">{data.observacoes}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button onClick={downloadJSON} variant="outline" className="flex-1">
          <Download className="mr-2 size-4" />
          Baixar JSON
        </Button>
        <Button onClick={onReset} variant="outline" className="flex-1">
          <RotateCcw className="mr-2 size-4" />
          Nova Avaliação
        </Button>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">Próximos Passos</h3>
          <ul className="text-sm space-y-1 text-gray-700">
            <li>• O nutricionista analisará todos os dados fornecidos</li>
            <li>• Será calculado o gasto energético total e necessidades nutricionais</li>
            <li>• Um plano alimentar personalizado será elaborado</li>
            <li>• Recomendações de treino serão incluídas conforme seu objetivo</li>
            <li>• Acompanhamento periódico será agendado para ajustes</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
