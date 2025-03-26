# 🚀 My Portfolio  

![Portfolio Screenshot](https://via.placeholder.com/1200x600?text=Portfolio+Preview)

## 🌟 About the Project  
This is my personal portfolio website built with **Vite**, **React**, **TypeScript**, **ShadCN**, and **Tailwind CSS**. It showcases my skills, projects, and contact information in an interactive and responsive design.

## 🛠️ Tech Stack  
- **Frontend:** React (Vite) + TypeScript  
- **UI Components:** ShadCN (Radix UI)  
- **Styling:** Tailwind CSS  
- **State Management:** React Hooks  
- **Map & Navigation:** Leaflet  
- **Form Handling:** Email.js  

## 🚀 Features  
✅ **Dynamic & Interactive UI** – Smooth animations and transitions  
✅ **Responsive Design** – Fully mobile-friendly  
✅ **Projects Section** – Highlights my best work  
✅ **Contact Form** – Users can reach out via Email.js  
✅ **Live Location Map** – Displays user location with Leaflet  
✅ **Dark & Light Mode** – Custom theme support  

## 📦 Installation & Setup  
Follow these steps to run the project locally:  

1️⃣ **Clone the repository**  
```sh
git clone https://github.com/your-username/your-portfolio.git
cd your-portfolio


Create a .env file in the root directory and add:
VITE_ORS_API_KEY=your_openrouteservice_api_key
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

Run the development server
npm run dev
# or
yarn dev


Build for production
npm run build


You can deploy this portfolio on Vercel, Netlify, or GitHub Pages. Example deployment:
npm run build
vercel deploy


🤝 Contributing
If you'd like to contribute, follow these steps:

Fork the repository

Create a new branch (feature-new-section)

Make your changes and commit

Push to GitHub and open a pull request



📬 Contact
📧 Email: scitmungai@example.com



🌟 Star this repo if you found it useful! 🚀

---

### 🔥 **What’s Included?**
- **Project Overview** 📌
- **Tech Stack** 🛠️
- **Features** 🎨
- **Setup Instructions** 🏗️
- **Deployment Guide** 🚀
- **Contribution Steps** 🤝
- **Contact Details** 📬  

💡 **Next Steps:**  
1. **Replace placeholders** (`your-username`, `your-email@example.com`, etc.)  
2. **Upload a project screenshot** (replace `Portfolio Screenshot` link)  
3. **Push to GitHub** 🎯  

Let me know if you need any tweaks! 🚀






# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
