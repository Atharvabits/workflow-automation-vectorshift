// submit.js

import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [popup, setPopup] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const pluralize = (count, singular, plural = `${singular}s`) => {
        return `${count} ${count === 1 ? singular : plural}`;
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('Failed to parse pipeline');
            }

            const { num_nodes, num_edges, is_dag } = await response.json();
            const statusMessage = is_dag
                ? 'Your pipeline is valid and has no cycles.'
                : 'Your pipeline has a cycle. Remove the loop before running it.';

            setPopup({
                title: 'Pipeline Check Complete',
                type: is_dag ? 'success' : 'warning',
                message: statusMessage,
                details: [
                    pluralize(num_nodes, 'node'),
                    pluralize(num_edges, 'connection'),
                    `DAG: ${is_dag ? 'Yes' : 'No'}`,
                ],
            });
        } catch (error) {
            setPopup({
                title: 'Could Not Check Pipeline',
                type: 'error',
                message: 'Please make sure the backend is running at http://localhost:8000, then try again.',
                details: [],
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const popupAccent = '#6d67e8';
    const popupStatusColor = popup?.type === 'success' ? '#327a55' : popup?.type === 'warning' ? '#9a6a00' : '#9b2c2c';
    const popupStatusBackground = popup?.type === 'success' ? '#eefaf3' : popup?.type === 'warning' ? '#fff8e6' : '#fff0f0';

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '14px 0 18px',
            background: '#fbfbff'
        }}>
            <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                style={{
                    border: '1px solid #7d78f2',
                    borderRadius: 6,
                    background: isSubmitting ? '#9b98e8' : '#6d67e8',
                    color: '#ffffff',
                    padding: '8px 18px',
                    fontWeight: 600,
                    boxShadow: '0 8px 18px rgba(109, 103, 232, 0.24)',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
            >
                {isSubmitting ? 'Checking...' : 'Submit'}
            </button>
            {popup && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="pipeline-result-title"
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(36, 35, 56, 0.34)',
                        padding: 20,
                    }}
                >
                    <div
                        style={{
                            width: 'min(420px, 100%)',
                            borderRadius: 14,
                            border: '1px solid #e7e5fb',
                            background: '#ffffff',
                            boxShadow: '0 24px 70px rgba(49, 45, 101, 0.22)',
                            overflow: 'hidden',
                        }}
                    >
                        <div style={{ height: 6, background: 'linear-gradient(90deg, #6d67e8, #8a84f7)' }} />
                        <div style={{ padding: 24 }}>
                            <h2
                                id="pipeline-result-title"
                                style={{
                                    margin: '0 0 10px',
                                    color: '#242338',
                                    fontSize: 22,
                                }}
                            >
                                {popup.title}
                            </h2>
                            <p
                                style={{
                                    margin: '0 0 18px',
                                    border: '1px solid #ecebff',
                                    borderLeft: `4px solid ${popupStatusColor}`,
                                    borderRadius: 10,
                                    padding: '10px 12px',
                                    color: popupStatusColor,
                                    background: popupStatusBackground,
                                    lineHeight: 1.5,
                                }}
                            >
                                {popup.message}
                            </p>
                            {popup.details.length > 0 && (
                                <div
                                    style={{
                                        display: 'grid',
                                        gap: 8,
                                        marginBottom: 22,
                                    }}
                                >
                                    {popup.details.map((detail) => (
                                        <div
                                            key={detail}
                                            style={{
                                                border: '1px solid #e8e6f8',
                                                borderRadius: 8,
                                                padding: '10px 12px',
                                                color: '#34324f',
                                                background: '#fbfbff',
                                            }}
                                        >
                                            {detail}
                                        </div>
                                    ))}
                                </div>
                            )}
                            <button
                                type="button"
                                onClick={() => setPopup(null)}
                                style={{
                                    width: '100%',
                                    border: '1px solid #7d78f2',
                                    borderRadius: 8,
                                    background: popupAccent,
                                    color: '#ffffff',
                                    padding: '10px 14px',
                                    fontWeight: 700,
                                    boxShadow: '0 8px 18px rgba(109, 103, 232, 0.24)',
                                    cursor: 'pointer',
                                }}
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
