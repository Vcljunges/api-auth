export const sanitizeEmail = (email: string): string => {
  return String(email || "")
    .trim()
    .toLowerCase()
}

export const basicValidationRegister = (email: string, password: string) => {
  if (!email || !password) return "E-mail e senha são obrigatórios"

  if (password.length < 8) return "A senha deve ter pelo menos 8 caracteres"

  return null
}
