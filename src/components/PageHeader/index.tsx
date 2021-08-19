import React from 'react';

import './styles.css'

interface IPageHeaderProps {
    title?: string;
    description?: string;
    page: string;
}

const PageHeader: React.FC<IPageHeaderProps> = ({ children, title, description, page }) => {
    return (
        <header className="page-header">
            <div className="top-bar">
                <span>{page}</span>
            </div>

            <div className="header-content">
                {title && <strong>{title}</strong>}
                {description && <p>{description}</p>}

                {children}
            </div>
        </header>
    )
}

export default PageHeader