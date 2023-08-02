export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'br',
    messages: {
        en: {
            password: 'Password',
            placeholder_mail: 'example@example.com',
            sign_up: 'Sign up',
        },
        br: {
            password: 'Senha',
            placeholder_mail: 'exemplo@exemplo.com',
            sign_up: 'Cadastrar',
        }
    }
}))