const styles: Record<string, React.CSSProperties> = {
    app: {
      textAlign: 'center',
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
  };
  
  export default styles;
  