module.exports = {
  root: true,
  env: { 
    browser: true, 
    es2020: true,
    node: true 
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules'],
  parserOptions: { 
    ecmaVersion: 'latest', 
    sourceType: 'module' 
  },
  settings: { 
    react: { 
      version: '18.2' 
    } 
  },
  plugins: ['react-refresh'],
  rules: {
    // Disable prop-types validation (you're not using PropTypes)
    'react/prop-types': 'off',
    
    // Disable unused variables warnings (can be annoying during development)
    'no-unused-vars': 'off',
    
    // Disable unescaped entities (allows quotes in JSX)
    'react/no-unescaped-entities': 'off',
    
    // Disable unknown property for Three.js (allows custom props like intensity, position, etc.)
    'react/no-unknown-property': 'off',
    
    // Disable case declarations in switch
    'no-case-declarations': 'off',
    
    // Disable exhaustive deps for useEffect (can be annoying)
    'react-hooks/exhaustive-deps': 'off',
    
    // Allow React to be unused (when using JSX runtime)
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    
    // Fast refresh rules - make them warnings instead of errors
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    
    // Allow anonymous components
    'react/display-name': 'off',
    
    // Allow process.env usage
    'no-undef': 'off',
  },
}