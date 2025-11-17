-- CreateTable
CREATE TABLE "consultorias" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "consentimento" BOOLEAN NOT NULL DEFAULT true,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alterado_em" TIMESTAMP(3) NOT NULL,
    "responsavel" TEXT,
    "observacoes" TEXT,
    "data_atendimento" TIMESTAMP(3),

    CONSTRAINT "consultorias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "consultorias_email_idx" ON "consultorias"("email");

-- CreateIndex
CREATE INDEX "consultorias_status_idx" ON "consultorias"("status");

-- CreateIndex
CREATE INDEX "consultorias_criado_em_idx" ON "consultorias"("criado_em");
