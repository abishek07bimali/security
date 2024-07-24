import React from 'react';

const ContentViewer = ({ contents, fontSize,fontFamily,color,paddingleft }) => {
  return (
    <div>
      <div
        style={{
          fontFamily: fontFamily || "Poppins",
          fontSize: fontSize,
          marginBottom: '20px',
          color:color,
          paddingLeft:paddingleft
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: contents }} />
      </div>
    </div>
  );
};

export default ContentViewer;
