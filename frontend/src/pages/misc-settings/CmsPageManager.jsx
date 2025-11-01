import React, { useState, useEffect } from 'react';

const initialCMSData = {
  terms: {
    title: 'Terms & Conditions',
    content: 'Enter your Terms & Conditions here...',
    updatedAt: new Date().toLocaleString(),
  },
  privacy: {
    title: 'Privacy Policy',
    content: 'Enter your Privacy Policy here...',
    updatedAt: new Date().toLocaleString(),
  },
  about: {
    title: 'About Us',
    content: 'Enter details about your company here...',
    updatedAt: new Date().toLocaleString(),
  },
  help: {
    title: 'Help & FAQ',
    content: 'Enter frequently asked questions here...',
    updatedAt: new Date().toLocaleString(),
  },
};

const CmsPageManager = () => {
  const [selectedPage, setSelectedPage] = useState('terms');
  const [cmsData, setCmsData] = useState(initialCMSData);
  const [editorContent, setEditorContent] = useState(initialCMSData.terms.content);

  useEffect(() => {
    setEditorContent(cmsData[selectedPage].content);
  }, [selectedPage]);

  const handleContentChange = (e) => {
    setEditorContent(e.target.value);
  };

  const handleSave = () => {
    const updatedTime = new Date().toLocaleString();
    const newData = {
      ...cmsData,
      [selectedPage]: {
        ...cmsData[selectedPage],
        content: editorContent,
        updatedAt: updatedTime,
      },
    };
    setCmsData(newData);
    alert(`${cmsData[selectedPage].title} saved successfully!`);
  };

  const handleRevert = () => {
    setEditorContent(cmsData[selectedPage].content);
  };

  const renderTabs = () => {
    const tabKeys = Object.keys(cmsData);
    return (
      <div style={styles.tabContainer}>
        {tabKeys.map((key) => (
          <button
            key={key}
            onClick={() => setSelectedPage(key)}
            style={{
              ...styles.tabButton,
              backgroundColor: selectedPage === key ? '#007bff' : '#f0f0f0',
              color: selectedPage === key ? '#fff' : '#000',
            }}
          >
            {cmsData[key].title}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>CMS Page Manager</h2>

      {renderTabs()}

      <div style={styles.editorSection}>
        <h3 style={styles.subHeader}>{cmsData[selectedPage].title}</h3>
        <textarea
          style={styles.textarea}
          value={editorContent}
          onChange={handleContentChange}
        />
        <div style={styles.infoText}>Last Updated: {cmsData[selectedPage].updatedAt}</div>
        <div style={styles.buttonRow}>
          <button style={styles.saveButton} onClick={handleSave}>Save Changes</button>
          <button style={styles.revertButton} onClick={handleRevert}>Revert</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '3rem',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #ccc',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.23)',
  },
  header: {
    fontSize: '24px',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  tabContainer: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  tabButton: {
    padding: '0.6rem 1.2rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
    minWidth: '140px',
  },
  editorSection: {
    backgroundColor: '#fafafa',
    padding: '1rem',
    borderRadius: '6px',
    border: '1px solid #eee',
  },
  subHeader: {
    fontSize: '18px',
    marginBottom: '0.5rem',
  },
  textarea: {
    width: '100%',
    height: '300px',
    fontSize: '14px',
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '1rem',
    resize: 'vertical',
  },
  infoText: {
    fontSize: '12px',
    color: '#777',
    marginBottom: '1rem',
  },
  buttonRow: {
    display: 'flex',
    gap: '1rem',
  },
  saveButton: {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  revertButton: {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#ffc107',
    color: '#000',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default CmsPageManager;
