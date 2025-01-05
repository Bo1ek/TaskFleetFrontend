import React from 'react';
import './Loading.css'; 

interface LoadingProps {
  text?: string; 
  fullPage?: boolean; 
}

const Loading: React.FC<LoadingProps> = ({ text = 'Loading...', fullPage = true }) => (
  <div
    style={{
      height: fullPage ? '100vh' : 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: fullPage ? '#282c34' : 'transparent',
    }}
  >
    <div className="wheel-and-hamster">
      <div className="wheel"></div>
      <div className="hamster">
        <div className="hamster__body">
          <div className="hamster__head">
            <div className="hamster__ear"></div>
            <div className="hamster__eye"></div>
            <div className="hamster__nose"></div>
          </div>
          <div className="hamster__limb hamster__limb--fr"></div>
          <div className="hamster__limb hamster__limb--fl"></div>
          <div className="hamster__limb hamster__limb--br"></div>
          <div className="hamster__limb hamster__limb--bl"></div>
          <div className="hamster__tail"></div>
        </div>
      </div>
      <div className="spoke"></div>
    </div>
    {text && (
      <p style={{ color: '#fff', fontSize: '1.5em', marginTop: '20px', textAlign: 'center' }}>
        {text}
      </p>
    )}
  </div>
);

export default Loading;
