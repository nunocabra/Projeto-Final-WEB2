# TaskFlow - Gerenciador de Tarefas - Web II

## Equipe
nuno gabriel

## Descrição

TaskFlow é um sistema completo de gerenciamento de tarefas e projetos desenvolvido com Next.js. A aplicação permite que usuários criem, organizem e gerenciem suas tarefas de forma eficiente, com funcionalidades de filtragem por status, priorização e acompanhamento de progresso.

O sistema resolve o problema de organização pessoal e profissional, oferecendo uma interface moderna e intuitiva para gerenciar tarefas do dia a dia, com autenticação segura e persistência de dados em banco NoSQL.

## Tecnologias

- Next.js 14+ (App Router)
- MongoDB Atlas & Mongoose
- HeroUI (NextUI) & Tailwind CSS
- NextAuth.js (Auth.js)

## Funcionalidades

- [x] Cadastro e Login de Usuários
- [x] CRUD Completo de Tarefas (Create, Read, Update, Delete)
- [x] Filtragem de tarefas por status (Pendente, Em Andamento, Concluída)
- [x] Sistema de prioridades (Baixa, Média, Alta)
- [x] Dashboard com estatísticas de tarefas
- [x] Proteção de rotas (área privada)
- [x] Interface responsiva (mobile e desktop)
- [x] Feedback visual com loading states
- [x] Tratamento de erros com try/catch

## Estrutura do Projeto

```
projeto-final-web2/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/     # Configuração NextAuth
│   │   │   │   └── register/          # API de registro
│   │   │   └── tasks/
│   │   │       ├── route.ts           # GET e POST de tarefas
│   │   │       └── [id]/
│   │   │           └── route.ts       # GET, PUT e DELETE por ID
│   │   ├── auth/
│   │   │   ├── login/                 # Página de login
│   │   │   └── register/              # Página de registro
│   │   ├── dashboard/                 # Dashboard protegido
│   │   ├── layout.tsx                 # Layout principal
│   │   ├── loading.tsx                # Loading state
│   │   ├── not-found.tsx              # Página 404
│   │   ├── page.tsx                   # Página inicial
│   │   └── providers.tsx              # Providers (NextUI + NextAuth)
│   ├── components/
│   │   ├── Navbar.tsx                 # Barra de navegação
│   │   ├── TaskCard.tsx               # Card de tarefa
│   │   └── TaskModal.tsx              # Modal para criar/editar tarefas
│   ├── lib/
│   │   └── mongodb.ts                 # Conexão com MongoDB
│   └── models/
│       ├── User.ts                    # Schema de Usuário
│       └── Task.ts                    # Schema de Tarefa
├── .env.local                         # Variáveis de ambiente (não versionado)
├── package.json
├── tsconfig.json
└── README.md
```

## Configuração

### Pré-requisitos

- Node.js 18+ instalado
- Conta no MongoDB Atlas (gratuita)
- Conta no Vercel para deploy (gratuita)

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd projeto-final-web2
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o arquivo `.env.local`**
   
   Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:
   ```env
   # MongoDB Atlas Connection String
   MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/nome-do-banco?retryWrites=true&w=majority
   
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=seu-secret-key-aqui
   ```
   
   **Importante:**
   - Obtenha a string de conexão do MongoDB Atlas em: https://www.mongodb.com/cloud/atlas
   - Para gerar o `NEXTAUTH_SECRET`, execute no terminal:
     ```bash
     openssl rand -base64 32
     ```

4. **Execute o projeto em desenvolvimento**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**
   
   Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Deploy

### Deploy na Vercel

1. **Conecte seu repositório GitHub à Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com sua conta GitHub
   - Clique em "New Project"
   - Selecione o repositório do projeto

2. **Configure as Variáveis de Ambiente**
   
   Na configuração do projeto na Vercel, adicione as seguintes variáveis:
   - `MONGODB_URI`: Sua string de conexão do MongoDB Atlas
   - `NEXTAUTH_URL`: URL da sua aplicação na Vercel (ex: https://seu-projeto.vercel.app)
   - `NEXTAUTH_SECRET`: O mesmo secret usado no `.env.local`

3. **Deploy**
   
   A Vercel fará o deploy automaticamente. Aguarde alguns minutos e sua aplicação estará no ar!

### Configuração do MongoDB Atlas

1. Crie uma conta gratuita em [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crie um novo cluster (opção gratuita disponível)
3. Configure um usuário de banco de dados
4. Adicione seu IP à whitelist (ou use 0.0.0.0/0 para permitir todos)
5. Obtenha a connection string e substitua `<password>` pela senha do usuário

## Funcionalidades Detalhadas

### Autenticação
- Sistema de registro com validação de email único
- Login seguro com NextAuth.js
- Proteção de rotas (dashboard só acessível logado)
- Sessão persistente com JWT

### Gerenciamento de Tarefas
- **Criar**: Adicione novas tarefas com título, descrição, status e prioridade
- **Listar**: Visualize todas as suas tarefas em cards organizados
- **Editar**: Atualize qualquer informação da tarefa
- **Deletar**: Remova tarefas que não são mais necessárias
- **Filtrar**: Filtre tarefas por status (Todas, Pendentes, Em Andamento, Concluídas)
- **Estatísticas**: Dashboard mostra contadores de tarefas por status

## Arquitetura

### Server Components vs Client Components
- **Server Components** (padrão): Usados em `layout.tsx`, `page.tsx` (home), `dashboard/layout.tsx`
- **Client Components** (`use client`): Usados em componentes interativos como `Navbar`, `TaskCard`, `TaskModal`, `dashboard/page.tsx`

### API Routes
Todas as rotas de API estão em `src/app/api/`:
- `/api/auth/[...nextauth]` - Autenticação NextAuth
- `/api/auth/register` - Registro de novos usuários
- `/api/tasks` - CRUD de tarefas (GET, POST)
- `/api/tasks/[id]` - Operações específicas por ID (GET, PUT, DELETE)

### Banco de Dados
- **Mongoose** para modelagem e validação
- **Schemas** definidos em `src/models/`
- Conexão reutilizável em `src/lib/mongodb.ts`
- Índices automáticos para performance

## Tratamento de Erros

Todas as rotas de API incluem tratamento de erros com try/catch:
- Validação de dados de entrada
- Mensagens de erro amigáveis
- Logs de erro no servidor
- Respostas HTTP apropriadas (400, 401, 404, 500)

## Boas Práticas Implementadas

- ✅ Código limpo e organizado
- ✅ Componentes reutilizáveis
- ✅ TypeScript para type safety
- ✅ Variáveis de ambiente para configuração
- ✅ Tratamento de erros robusto
- ✅ Loading states para melhor UX
- ✅ Design responsivo
- ✅ Acessibilidade básica

## Licença

Este projeto foi desenvolvido para fins educacionais.

---

**Desenvolvido com ❤️ para a disciplina de Desenvolvimento Web II**


