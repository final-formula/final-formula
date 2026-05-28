import React, { useState, useEffect } from 'react';
import '../styles/galery.css';

export default function Galery() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // Slike iz /General direktorijuma provera
    const images = [

        {
            id: 1,
            src: '/General/F1-2013-Legends-Edition.jpg',
            title: 'Formula 1 Legend',
            category: 'Racing'
        },
        {
            id: 2,
            src: '/General/Kaciga.png',
            title: 'Driver Helmet',
            category: 'Equipment'
        },
        {
            id: 3,
            src: '/General/Teams.png',
            title: 'Teams Overview',
            category: 'Teams'
        },
        {
            id: 4,
            src: '/General/Kaciga.png',
            title: 'Modern Design',
            category: 'Equipment'
        },
        {
            id: 5,
            src: '/General/F1-2013-Legends-Edition.jpg',
            title: 'Championship',
            category: 'History'
        },
        {
            id: 6,
            src: '/General/Teams.png',
            title: 'Team Strategy',
            category: 'Teams'
        },
    ];

    return (
        <div className="gallery-container">
            {/* Header */}
            <div className="gallery-header">
                <h1 className="gallery-title">Galerija</h1>
                <p className="gallery-subtitle">Formula 1 Koleksija</p>
            </div>

            {/* Grid */}
            <div className="gallery-grid">
                {images.map((image, index) => (
                    <div
                        key={image.id}
                        className="gallery-item"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => setSelectedImage(image)}
                        role="button"
                        tabIndex={0}
                    >
                        <div className="gallery-image-wrapper">
                            <img
                                src={image.src}
                                alt={image.title}
                                className="gallery-image"
                            />
                            <div className="gallery-overlay">
                                <div className="overlay-content">
                                    <h3>{image.title}</h3>
                                    <span className="category-badge">{image.category}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <p></p>

            {/* Lightbox */}
            {selectedImage && (
                <div
                    className="lightbox"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="lightbox-content">
                        <button
                            className="lightbox-close"
                            onClick={() => setSelectedImage(null)}
                            aria-label="Close"
                        >
                            ✕
                        </button>
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.title}
                            className="lightbox-image"
                        />
                        <div className="lightbox-info">
                            <h2>{selectedImage.title}</h2>
                            <p>{selectedImage.category}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );


}
