'use client';

export default function NotFound() {
    return (
        <div className="not-found-container">
            <div className="not-found-card">
                <h1 className="not-found-title">404</h1>
                <h2 className="not-found-subtitle">Page Not Found</h2>
                <p className="not-found-description">
                    Sorry, the page you are looking for does not exist or has been moved.
                </p>
            </div>
        </div>
    );
}
