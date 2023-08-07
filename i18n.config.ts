export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'br',
    messages: {
        en: {
            password: 'Password',
            placeholder_mail: "example{'@'}example.com",
            sign_up: 'Sign up',
            home: 'Home',
            ngos: 'NGOs',
            name: 'Name',
            placeholder_document: '00.000.000/0000-00',
            document: 'Document',
            initial_info: 'Initial info',
            contacts: 'Contacts',
            placeholder_description_ngos: 'Briefly describe the purpose and history of the NGO',
            description: 'Description',
            ngo_registration: 'NGO registration',
            enter_details_to_get_started: 'Enter your details to get started',
        },
        br: {
            password: 'Senha',
            placeholder_mail: "exemplo{'@'}exemplo.com",
            sign_up: 'Cadastrar',
            home: 'Início',
            ngos: 'ONGs',
            name: 'Nome',
            placeholder_document: '00.000.000/0000-00',
            document: 'CNPJ',
            initial_info: 'Informações iniciais',
            contacts: 'Contatos',
            placeholder_description_ngos: 'Descreva a finalidade e a história da ONG de maneira breve',
            description: 'Descrição',
            ngo_registration: 'Cadastro de ONG',
            enter_details_to_get_started: 'Insira seus dados para começar',
        }
    }
}))