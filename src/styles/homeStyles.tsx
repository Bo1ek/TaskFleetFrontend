const homeStyles: Record<string, React.CSSProperties> = {
    container: {
      height: '95vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#282c34',
      color: '#fff',
      textAlign: 'center',
      padding: '20px',
    },
    header: {
      flex: '1 0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
      fontSize: '2.5rem',
      marginBottom: '1rem',
    },
    description: {
      fontSize: '1.25rem',
      lineHeight: '1.6',
      maxWidth: '600px',
      marginBottom: '1.5rem',
    },
    buttonGroup: {
      display: 'flex',
      gap: '15px',
    },
    button: {
      backgroundColor: '#61dafb',
      color: '#282c34',
      textDecoration: 'none',
      fontWeight: 'bold',
      padding: '10px 20px',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease',
    },
    featuresSection: {
      flex: '1 0 auto',
    },
    featuresTitle: {
      fontSize: '1.5rem',
      marginBottom: '1rem',
    },
    featuresList: {
      listStyle: 'none',
      padding: 0,
      fontSize: '1rem',
      lineHeight: '1.5',
    },
    footer: {
      flexShrink: 0,
      fontSize: '0.875rem',
      color: '#aaa',
    },
  };
  
  export default homeStyles;
  