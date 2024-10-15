-- CreateTable
CREATE TABLE "user_login" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_login_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student" (
    "reg_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "X_per" DOUBLE PRECISION NOT NULL,
    "XII_per" DOUBLE PRECISION NOT NULL,
    "branch_assign" TEXT NOT NULL,
    "father_name" TEXT NOT NULL,
    "pref_1" TEXT NOT NULL,
    "pref_2" TEXT NOT NULL,
    "pref_3" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("reg_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_login_email_key" ON "user_login"("email");

-- CreateIndex
CREATE UNIQUE INDEX "student_email_key" ON "student"("email");

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_login"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
