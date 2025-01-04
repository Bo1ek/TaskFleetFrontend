const styles: Record<string, React.CSSProperties> = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#282c34',
    color: '#ffffff',
    textAlign: 'center',
    padding: '20px',
  },
    appLogo: {
      height: '40vmin',
      pointerEvents: 'none',
      animation: 'App-logo-spin infinite 20s linear',
    },
    appHeader: {
      backgroundColor: '#282c34',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'calc(10px + 2vmin)',
      color: 'white',
    },
    appLink: {
      color: '#61dafb',
    },
    home: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    homeHeader: {
      fontSize: '2.5rem',

    },
    homeMessage: {
      color: 'green',
    },
    homeError: {
      color: 'red',
    },
    body: {
      margin: '0',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    code: {
      fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
    },
    homeParagraph: {
      fontSize: '1.25rem',
      lineHeight: '1.6',
      maxWidth: '600px',
      margin: '0 auto',
    },
    homeLink: {
      fontWeight: 'bold',
    },
    callToAction: {
      marginTop: '2rem',
      fontSize: '1.1rem',
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem',
      backgroundColor: '#282c34',
      color: 'white',
    },
    navLink: {
      textDecoration: 'none',
      color: 'white',
      fontSize: '1.2rem',
    },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#333',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  },
  formTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '15px',
    alignItems: 'flex-start',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    width: '100%',
  },
  input: {
    padding: '10px',
    width: '95%',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#444',
    color: '#fff',
  },
  select: {
    padding: '10px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#444',
    color: '#fff',
  },
  button: {
    backgroundColor: '#fff',
    color: '#000',
    fontWeight: 'bold',
    padding: '10px 0',
    borderRadius: '50px',
    width: '200px',
    maxWidth: '200px',
    marginTop: '30px',
  },
  successMessage: {
    color: 'green',
    marginTop: '20px',
  },
  errorMessage: {
    color: 'red',
    marginTop: '20px',
  },
  tableContainer: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    width: '95%',
    maxWidth: '1400px',
  },
  tableHeader: {
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  tableCell: {
    color: '#fff',
  },
  link: {
    color: '#00bfff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  glassCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  inputField: {
    color: '#fff',
    background: 'rgba(255,255,255,0.1)',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
  },
  };
  
  export default styles;
  