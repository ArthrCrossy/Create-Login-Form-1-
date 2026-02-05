import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { User, Activity, Target, Apple, Heart, Calendar, ClipboardList } from "lucide-react";
import { toast } from "sonner";

interface NutritionFormData {
  nome: string;
  idade: number;
  sexo: string;
  altura: number;
  peso: number;
  telefone: string;
  email: string;
  
  cintura: number;
  quadril: number;
  braco: number;
  coxa: number;
  panturrilha: number;
  pescoco: number;
  
  objetivo: string;
  pesoDesejado: number;
  prazo: string;
  
  nivelAtividade: string;
  treinaAtualmente: string;
  frequenciaTreino: string;
  tipoTreino: string[];
  
  restricoes: string[];
  alergias: string;
  intolerancia: string;
  preferenciasAlimentares: string;
  
  doencas: string;
  medicamentos: string;
  cirurgias: string;
  suplementos: string;
  
  horaAcordar: string;
  horaDormir: string;
  horasSono: number;
  ocupacao: string;
  horarioTrabalho: string;
  nivelEstresse: string;
  
  numeroRefeicoes: string;
  consumoAgua: string;
  bebidaAlcoolica: string;
  historicoDietas: string;
  
  observacoes: string;
}

interface NutritionFormProps {
  onSubmit: (data: NutritionFormData) => void;
}

export function NutritionForm({ onSubmit }: NutritionFormProps) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<NutritionFormData>();
  
  const tipoTreinoOptions = ["Musculação", "Cardio", "Funcional", "Crossfit", "Pilates", "Yoga", "Natação", "Corrida", "Ciclismo"];
  const restricoesOptions = ["Vegetariano", "Vegano", "Sem Glúten", "Sem Lactose", "Kosher", "Halal", "Sem Açúcar"];

  const handleFormSubmit = (data: NutritionFormData) => {
    // Calcular IMC
    const imc = data.peso / Math.pow(data.altura / 100, 2);
    toast.success(`Formulário enviado com sucesso! IMC: ${imc.toFixed(1)}`);
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Tabs defaultValue="pessoais" className="w-full">
        <TabsList className="grid w-full grid-cols-7 mb-6">
          <TabsTrigger value="pessoais" className="flex items-center gap-1">
            <User className="size-4" />
            <span className="hidden sm:inline">Pessoais</span>
          </TabsTrigger>
          <TabsTrigger value="antropometricos" className="flex items-center gap-1">
            <Activity className="size-4" />
            <span className="hidden sm:inline">Medidas</span>
          </TabsTrigger>
          <TabsTrigger value="objetivos" className="flex items-center gap-1">
            <Target className="size-4" />
            <span className="hidden sm:inline">Objetivos</span>
          </TabsTrigger>
          <TabsTrigger value="atividade" className="flex items-center gap-1">
            <Activity className="size-4" />
            <span className="hidden sm:inline">Atividade</span>
          </TabsTrigger>
          <TabsTrigger value="alimentacao" className="flex items-center gap-1">
            <Apple className="size-4" />
            <span className="hidden sm:inline">Alimentação</span>
          </TabsTrigger>
          <TabsTrigger value="saude" className="flex items-center gap-1">
            <Heart className="size-4" />
            <span className="hidden sm:inline">Saúde</span>
          </TabsTrigger>
          <TabsTrigger value="rotina" className="flex items-center gap-1">
            <Calendar className="size-4" />
            <span className="hidden sm:inline">Rotina</span>
          </TabsTrigger>
        </TabsList>

        {/* Dados Pessoais */}
        <TabsContent value="pessoais">
          <Card>
            <CardHeader>
              <CardTitle>Dados Pessoais</CardTitle>
              <CardDescription>Informações básicas do paciente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input id="nome" {...register("nome", { required: true })} placeholder="João Silva" />
                  {errors.nome && <span className="text-sm text-red-500">Campo obrigatório</span>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input id="email" type="email" {...register("email", { required: true })} placeholder="joao@email.com" />
                  {errors.email && <span className="text-sm text-red-500">Campo obrigatório</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="idade">Idade *</Label>
                  <Input id="idade" type="number" {...register("idade", { required: true, min: 1 })} placeholder="30" />
                  {errors.idade && <span className="text-sm text-red-500">Campo obrigatório</span>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sexo">Sexo *</Label>
                  <Select onValueChange={(value) => setValue("sexo", value)}>
                    <SelectTrigger id="sexo">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="feminino">Feminino</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" {...register("telefone")} placeholder="(11) 99999-9999" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="altura">Altura (cm) *</Label>
                  <Input id="altura" type="number" {...register("altura", { required: true, min: 1 })} placeholder="170" />
                  {errors.altura && <span className="text-sm text-red-500">Campo obrigatório</span>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="peso">Peso Atual (kg) *</Label>
                  <Input id="peso" type="number" step="0.1" {...register("peso", { required: true, min: 1 })} placeholder="75.5" />
                  {errors.peso && <span className="text-sm text-red-500">Campo obrigatório</span>}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dados Antropométricos */}
        <TabsContent value="antropometricos">
          <Card>
            <CardHeader>
              <CardTitle>Medidas Corporais</CardTitle>
              <CardDescription>Medidas antropométricas em centímetros</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cintura">Cintura (cm)</Label>
                  <Input id="cintura" type="number" {...register("cintura")} placeholder="80" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quadril">Quadril (cm)</Label>
                  <Input id="quadril" type="number" {...register("quadril")} placeholder="95" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="braco">Braço (cm)</Label>
                  <Input id="braco" type="number" {...register("braco")} placeholder="30" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="coxa">Coxa (cm)</Label>
                  <Input id="coxa" type="number" {...register("coxa")} placeholder="55" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="panturrilha">Panturrilha (cm)</Label>
                  <Input id="panturrilha" type="number" {...register("panturrilha")} placeholder="35" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="pescoco">Pescoço (cm)</Label>
                  <Input id="pescoco" type="number" {...register("pescoco")} placeholder="35" />
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Dica:</strong> As medidas corporais ajudam a acompanhar a evolução além do peso. Meça sempre no mesmo horário e local do corpo.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Objetivos */}
        <TabsContent value="objetivos">
          <Card>
            <CardHeader>
              <CardTitle>Objetivos</CardTitle>
              <CardDescription>Qual é o seu objetivo principal?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Objetivo Principal *</Label>
                <RadioGroup onValueChange={(value) => setValue("objetivo", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="emagrecer" id="emagrecer" />
                    <Label htmlFor="emagrecer">Emagrecer / Perder Gordura</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ganhar-massa" id="ganhar-massa" />
                    <Label htmlFor="ganhar-massa">Ganhar Massa Muscular</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="manter" id="manter" />
                    <Label htmlFor="manter">Manter Peso / Saúde</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="recomposicao" id="recomposicao" />
                    <Label htmlFor="recomposicao">Recomposição Corporal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="performance" id="performance" />
                    <Label htmlFor="performance">Melhorar Performance Esportiva</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pesoDesejado">Peso Desejado (kg)</Label>
                  <Input id="pesoDesejado" type="number" step="0.1" {...register("pesoDesejado")} placeholder="70" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="prazo">Prazo Desejado</Label>
                  <Select onValueChange={(value) => setValue("prazo", value)}>
                    <SelectTrigger id="prazo">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-3">1 a 3 meses</SelectItem>
                      <SelectItem value="3-6">3 a 6 meses</SelectItem>
                      <SelectItem value="6-12">6 a 12 meses</SelectItem>
                      <SelectItem value="12+">Mais de 12 meses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Atividade Física */}
        <TabsContent value="atividade">
          <Card>
            <CardHeader>
              <CardTitle>Atividade Física</CardTitle>
              <CardDescription>Informações sobre sua rotina de exercícios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Nível de Atividade Física Atual *</Label>
                <RadioGroup onValueChange={(value) => setValue("nivelAtividade", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sedentario" id="sedentario" />
                    <Label htmlFor="sedentario">Sedentário (pouco ou nenhum exercício)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="leve" id="leve" />
                    <Label htmlFor="leve">Levemente ativo (1-3 dias/semana)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderado" id="moderado" />
                    <Label htmlFor="moderado">Moderadamente ativo (3-5 dias/semana)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intenso" id="intenso" />
                    <Label htmlFor="intenso">Muito ativo (6-7 dias/semana)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="atleta" id="atleta" />
                    <Label htmlFor="atleta">Atleta (treino intenso diário)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Treina Atualmente? *</Label>
                <RadioGroup onValueChange={(value) => setValue("treinaAtualmente", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="treina-sim" />
                    <Label htmlFor="treina-sim">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="treina-nao" />
                    <Label htmlFor="treina-nao">Não</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="parou" id="treina-parou" />
                    <Label htmlFor="treina-parou">Parou recentemente</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequenciaTreino">Frequência de Treino</Label>
                <Select onValueChange={(value) => setValue("frequenciaTreino", value)}>
                  <SelectTrigger id="frequenciaTreino">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nao-treina">Não treina</SelectItem>
                    <SelectItem value="1-2">1-2 vezes por semana</SelectItem>
                    <SelectItem value="3-4">3-4 vezes por semana</SelectItem>
                    <SelectItem value="5-6">5-6 vezes por semana</SelectItem>
                    <SelectItem value="todos">Todos os dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Tipo de Treino (selecione todos que pratica)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {tipoTreinoOptions.map((tipo) => (
                    <div key={tipo} className="flex items-center space-x-2">
                      <Checkbox
                        id={tipo}
                        onCheckedChange={(checked) => {
                          const current = watch("tipoTreino") || [];
                          if (checked) {
                            setValue("tipoTreino", [...current, tipo]);
                          } else {
                            setValue("tipoTreino", current.filter((t) => t !== tipo));
                          }
                        }}
                      />
                      <Label htmlFor={tipo} className="cursor-pointer">{tipo}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alimentação */}
        <TabsContent value="alimentacao">
          <Card>
            <CardHeader>
              <CardTitle>Restrições e Preferências Alimentares</CardTitle>
              <CardDescription>Informações sobre sua alimentação atual</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Restrições Alimentares (selecione todas que se aplicam)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {restricoesOptions.map((restricao) => (
                    <div key={restricao} className="flex items-center space-x-2">
                      <Checkbox
                        id={restricao}
                        onCheckedChange={(checked) => {
                          const current = watch("restricoes") || [];
                          if (checked) {
                            setValue("restricoes", [...current, restricao]);
                          } else {
                            setValue("restricoes", current.filter((r) => r !== restricao));
                          }
                        }}
                      />
                      <Label htmlFor={restricao} className="cursor-pointer">{restricao}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alergias">Alergias Alimentares</Label>
                <Textarea id="alergias" {...register("alergias")} placeholder="Ex: amendoim, camarão, etc." rows={2} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="intolerancia">Intolerâncias</Label>
                <Textarea id="intolerancia" {...register("intolerancia")} placeholder="Ex: lactose, glúten, frutose, etc." rows={2} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferenciasAlimentares">Preferências e Aversões Alimentares</Label>
                <Textarea 
                  id="preferenciasAlimentares" 
                  {...register("preferenciasAlimentares")} 
                  placeholder="Alimentos que você gosta ou não gosta de comer"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numeroRefeicoes">Número de Refeições por Dia</Label>
                <Select onValueChange={(value) => setValue("numeroRefeicoes", value)}>
                  <SelectTrigger id="numeroRefeicoes">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 refeições</SelectItem>
                    <SelectItem value="3">3 refeições</SelectItem>
                    <SelectItem value="4">4 refeições</SelectItem>
                    <SelectItem value="5">5 refeições</SelectItem>
                    <SelectItem value="6+">6 ou mais refeições</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="consumoAgua">Consumo de Água Diário</Label>
                <Select onValueChange={(value) => setValue("consumoAgua", value)}>
                  <SelectTrigger id="consumoAgua">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="menos-1">Menos de 1 litro</SelectItem>
                    <SelectItem value="1-2">1 a 2 litros</SelectItem>
                    <SelectItem value="2-3">2 a 3 litros</SelectItem>
                    <SelectItem value="mais-3">Mais de 3 litros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bebidaAlcoolica">Consumo de Bebida Alcoólica</Label>
                <Select onValueChange={(value) => setValue("bebidaAlcoolica", value)}>
                  <SelectTrigger id="bebidaAlcoolica">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nao">Não consome</SelectItem>
                    <SelectItem value="raro">Raramente (menos de 1x/mês)</SelectItem>
                    <SelectItem value="social">Social (1-4x/mês)</SelectItem>
                    <SelectItem value="regular">Regularmente (1-3x/semana)</SelectItem>
                    <SelectItem value="frequente">Frequentemente (mais de 3x/semana)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="historicoDietas">Histórico de Dietas Anteriores</Label>
                <Textarea 
                  id="historicoDietas" 
                  {...register("historicoDietas")} 
                  placeholder="Já fez alguma dieta? Qual funcionou? Qual não funcionou?"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Saúde */}
        <TabsContent value="saude">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Saúde</CardTitle>
              <CardDescription>Informações médicas importantes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="doencas">Doenças Crônicas ou Condições Médicas</Label>
                <Textarea 
                  id="doencas" 
                  {...register("doencas")} 
                  placeholder="Ex: diabetes, hipertensão, hipotireoidismo, SOP, etc."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicamentos">Medicamentos em Uso</Label>
                <Textarea 
                  id="medicamentos" 
                  {...register("medicamentos")} 
                  placeholder="Liste todos os medicamentos que você toma regularmente"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cirurgias">Cirurgias Realizadas</Label>
                <Textarea 
                  id="cirurgias" 
                  {...register("cirurgias")} 
                  placeholder="Ex: bariátrica, cesariana, apendicectomia, etc."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="suplementos">Suplementos Alimentares</Label>
                <Textarea 
                  id="suplementos" 
                  {...register("suplementos")} 
                  placeholder="Suplementos que você toma atualmente ou já tomou"
                  rows={3}
                />
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Importante:</strong> Essas informações são cruciais para que o nutricionista possa elaborar um plano seguro e adequado às suas necessidades.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rotina */}
        <TabsContent value="rotina">
          <Card>
            <CardHeader>
              <CardTitle>Rotina e Estilo de Vida</CardTitle>
              <CardDescription>Informações sobre seu dia a dia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="horaAcordar">Hora que Acorda</Label>
                  <Input id="horaAcordar" type="time" {...register("horaAcordar")} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="horaDormir">Hora que Dorme</Label>
                  <Input id="horaDormir" type="time" {...register("horaDormir")} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="horasSono">Horas de Sono</Label>
                  <Input id="horasSono" type="number" step="0.5" {...register("horasSono")} placeholder="7" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ocupacao">Ocupação/Profissão</Label>
                <Input id="ocupacao" {...register("ocupacao")} placeholder="Ex: Analista de Sistemas, Professor, etc." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="horarioTrabalho">Horário de Trabalho</Label>
                <Input id="horarioTrabalho" {...register("horarioTrabalho")} placeholder="Ex: 8h às 18h, noturno, turno, etc." />
              </div>

              <div className="space-y-3">
                <Label>Nível de Estresse</Label>
                <RadioGroup onValueChange={(value) => setValue("nivelEstresse", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="baixo" id="estresse-baixo" />
                    <Label htmlFor="estresse-baixo">Baixo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderado" id="estresse-moderado" />
                    <Label htmlFor="estresse-moderado">Moderado</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="alto" id="estresse-alto" />
                    <Label htmlFor="estresse-alto">Alto</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="muito-alto" id="estresse-muito-alto" />
                    <Label htmlFor="estresse-muito-alto">Muito Alto</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações Adicionais</Label>
                <Textarea 
                  id="observacoes" 
                  {...register("observacoes")} 
                  placeholder="Qualquer informação adicional que você considere importante..."
                  rows={4}
                />
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full" size="lg">
                  <ClipboardList className="mr-2 size-5" />
                  Enviar Avaliação Completa
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
}
