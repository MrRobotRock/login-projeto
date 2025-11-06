-- DropForeignKey
ALTER TABLE "public"."usuarioxrole" DROP CONSTRAINT "usuarioxrole_roleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."usuarioxrole" DROP CONSTRAINT "usuarioxrole_userId_fkey";

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "recuperacao_senha" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha_aleatoria" TEXT NOT NULL,
    "data_expiracao" TIMESTAMP(3) NOT NULL,
    "utilizado" BOOLEAN NOT NULL DEFAULT false,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "recuperacao_senha_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "recuperacao_senha_email_idx" ON "recuperacao_senha"("email");

-- CreateIndex
CREATE INDEX "recuperacao_senha_senha_aleatoria_idx" ON "recuperacao_senha"("senha_aleatoria");

-- CreateIndex
CREATE INDEX "recuperacao_senha_data_expiracao_idx" ON "recuperacao_senha"("data_expiracao");

-- CreateIndex
CREATE INDEX "usuarios_status_idx" ON "usuarios"("status");

-- AddForeignKey
ALTER TABLE "usuarioxrole" ADD CONSTRAINT "usuarioxrole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarioxrole" ADD CONSTRAINT "usuarioxrole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recuperacao_senha" ADD CONSTRAINT "recuperacao_senha_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
