
my-nextjs-app/
├── .next/
├── node_modules/
├── public/
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── app/
│   │   ├── layout.js
│   │   ├── page.js
│   │   ├── landingpage/
│   │   │   └── page.js
│   │   ├── dashboard/
│   │   │   └── page.js
│   │   ├── profile/
│   │   │   └── page.js
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── page.js
│   │   │   ├── register/
│   │   │   │   └── page.js
│   │   │   └── activate/
│   │   │       └── page.js
│   ├── components/
│   │   ├── AuthProvider.js
│   │   ├── ProtectedRoute.js
│   │   ├── LoginForm.js
│   │   ├── RegisterForm.js
│   │   ├── ActivateAccount.js
│   │   └── UserProfile.js
│   ├── redux/
│   │   ├── actions/
│   │   │   └── authActions.js
│   │   ├── reducers/
│   │   │   └── authReducer.js
│   │   └── store.js
│   ├── lib/
│   │   └── auth.js
│   ├── middleware/
│   │   └── withAuth.js
│   ├── utils/
│   │   └── fetch.js
│   ├── styles/
│   │   └── globals.css
├── .env.local
├── .eslint.json
├── .gitignore
├── next.config.js
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
└── ...
