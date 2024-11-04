export const CUSTOM_STYLES = {
    terminalDialogStyles: {
        modal: {
            backgroundColor: '#1e1e1e', // Terminal dark background
            color: '#00ff00', // Terminal green text color
            fontFamily: '"Courier New", Courier, monospace', // Monospaced font
            border: '1px solid #333', // Dark border
            borderRadius: 1,
        },
        title: {
            position: 'relative',
            display: 'flex',
            padding: '8px',
            backgroundColor: '#333', // Dark header background
            color: '#fff', // White text for header
        },
        closeButton: {
            
            color: '#ff5f56', // Red color for close icon
        },
        headerDotsContainer: {
            display: 'flex',
            gap: '8px',
            marginBottom: '8px',
        },
        dot: {
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            display: 'inline-block',
        },
        red: {
            backgroundColor: '#ff5f56', // Red dot
        },
        yellow: {
            backgroundColor: '#ffbd2e', // Yellow dot
        },
        green: {
            backgroundColor: '#27c93f', // Green dot
        },
        content: {
            padding: '16px',
            overflowY: 'auto',
            maxHeight: '400px',
            wordBreak: 'break-word', 
            whiteSpace: 'pre-wrap', // Preserve log formatting
        },
        line: {
            marginBottom: '4px', // Spacing for each log line
        },
    }

};