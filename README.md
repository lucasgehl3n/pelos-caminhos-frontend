
# [English] Pelos Caminhos - Frontend

Hello. I'm glad you found my project. "Pelos Caminhos" is a project presented as a Final Course Project in the Computer Science program at the University of Caxias do Sul (UCS). Its goal is to be a platform that combines three profiles: the adopting user, the institution administrator, and volunteers. The complete thesis can be read [here](https://drive.google.com/file/d/1wGspejLclOVXlhErvAr8gK0-ASYVHKiR/view?usp=sharing).

It features backend permission systems with ACL implementation, public and private pages, animal registration and management, a public profile that can be shared using a QRCode, and an administration area for NGOs with the ability to view existing animals. Additionally, it incorporates many responsive visual elements.

The software includes a feature for animal recognition based on breed identification, using the [Dog Breed Classification](https://github.com/stormy-ua/dog-breeds-classification) project as a foundation.

The architecture can be viewed [here](https://drive.google.com/file/d/1fjh1XuPdnr3KRJ3xh2vTvBD_iZ-qgDKM/view?usp=sharing).

## Technologies used in the frontend

-   Vue 3
-   Nuxt
-   Capacitor JS
-   Tailwind
-   Flowbite

# Installation

The code is Code First, so there is no need to create the database manually. Just configure an .env file with the NODE_ENV and corresponding DATABASE_URL, like this:
`NODE_ENV='production'
BACKEND_URL='http://localhost:8000'` 

If you are going to use the image recognition flow, make the Docker container available on a port and add it to your .env with the corresponding port, something like:
`AI_BREED_URL='http://localhost:5000/predict'` 

To install dependencies:
`npm i` 

To run:
`npm run dev` 

Alternatively, for production:

`npm run build && npm run generate` 

## Link to the backend project

[Click here to access](https://github.com/lucasgehl3n/pelos-caminhos-backend)

## Pictures
![dog](https://i.ibb.co/MBsRmmd/Screenshot-1.png=1366x768)
![list animals](https://i.ibb.co/NsF36cQ/17-3.png=1366x768)
![search by image ](https://i.ibb.co/mJGrZdZ/23-2.png=375x768)
![register](https://i.ibb.co/d6qbMqF/1-1.png=1366x768)


# [Português] Pelos Caminhos - Frontend
Olá. Fico feliz que tenha encontrado o meu projeto. O "Pelos Caminhos" é um projeto apresentado como Trabalho de Conclusão de Curso no Curso de Ciência da Computação na Universidade de Caxias do Sul (UCS). Ele tem o objetivo de ser uma plataforma que mescla três perfis: o usuário adotante, o administrador de instituições e os voluntários. O trabalho completo pode ser lido [neste link](https://drive.google.com/file/d/1wGspejLclOVXlhErvAr8gK0-ASYVHKiR/view?usp=sharing). 

  
Ele conta com recursos como sistemas de permissões back-end com implementação de ACL, páginas públicas e privadas, cadastro e gerenciamento de animais, perfil público que pode ser compartilhado utilizando um QRCode.  Conta também com a área para administração da ONG e visualização de animais existentes. Além disso, possui muitos elementos visuais responsivos. 
 

O software conta com um recurso para reconhecimento de animais a partir da identificação de raças, que utiliza como base o projeto [Dog Breed Classification](https://github.com/stormy-ua/dog-breeds-classification).
  
A arquitetura pode ser visualizada [neste link](https://drive.google.com/file/d/1fjh1XuPdnr3KRJ3xh2vTvBD_iZ-qgDKM/view?usp=sharing).

  
## Tecnologias utilizadas no frontend

-   Vue 3
-   Nuxt
-   Capacitor JS
-   Tailwind
-   Flowbite

# Instalação

O código é Code First, não é necessário criar o banco de dados manualmente, apenas configurar um arquivo .env com o NODE_ENV e a DATABASE_URL correspondente, desta forma:

    NODE_ENV='production'
    BACKEND_URL='http://localhost:8000'

Caso vá utilizar o fluxo de reconhecimento de imagem, disponibilize o container Docker em uma porta e adicione no seu .env com a porta correspondente. Algo como: 

    AI_BREED_URL='http://localhost:5000/predict'

Para instalar as dependências

    npm i

Para executar

    npm run dev 

 
 Ou alternativamente, em produção:
 

    npm run build && npm run generate

## Link do projeto back-end
[Clique aqui para acessar](https://github.com/lucasgehl3n/pelos-caminhos-backend)




