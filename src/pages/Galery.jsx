import React, { useState, useEffect } from 'react';
import '../styles/galery.css';

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Dinamički učitaj sve slike iz /Drivers direktorijuma
    useEffect(() => {
        const loadImages = async () => {
            try {
                // Ako imaš API endpoint koji vraća sve slike
                // const response = await fetch('/api/drivers/images');
                // const data = await response.json();
                setImages(data);
            } catch (error) {
                console.log('Korišćenje fallback slika...');
                // Fallback - koristi ovaj kod ako nemaš API
                const fallbackImages = [
                    { id: 1, src: '/galery/slika1.jpg', title: 'slika 1', category: 'Drivers' },
                    { id: 2, src: '/galery/slika2.jpg', title: 'Driver 2', category: 'Drivers' },
                    { id: 3, src: '/galery/slika3.jpg', title: 'Driver 3', category: 'Drivers' },
                    { id: 4, src: '/galery/slika4.jpg', title: 'Driver 4', category: 'Drivers' },
                    { id: 5, src: '/galery/slika5.jpg', title: 'Driver 5', category: 'Drivers' },
                    { id: 6, src: '/galery/slika6.jpg', title: 'Driver 6', category: 'Drivers' },
                    { id: 7, src: '/galery/slika7.jpg', title: 'Driver 7', category: 'Drivers' },
                    { id: 8, src: '/galery/slika27.jpg', title: 'Driver 8', category: 'Drivers' },
                    { id: 9, src: '/galery/slika28.jpg', title: 'Driver 9', category: 'Drivers' },
                    { id: 10, src: '/galery/slika10.jpg', title: 'Driver 10', category: 'Drivers' },
                    { id: 11, src: '/galery/slika11.jpg', title: 'Driver 11', category: 'Drivers' },
                    { id: 12, src: '/galery/slika12.jpg', title: 'Driver 12', category: 'Drivers' },
                    { id: 13, src: '/galery/slika13.jpg', title: 'Driver 13', category: 'Drivers' },
                    { id: 14, src: '/galery/slika14.jpg', title: 'Driver 14', category: 'Drivers' },
                    { id: 15, src: '/galery/slika15.jpg', title: 'Driver 15', category: 'Drivers' },
                    { id: 16, src: '/galery/slika16.jpg', title: 'Driver 16', category: 'Drivers' },
                    { id: 17, src: '/galery/slika17.jpg', title: 'Driver 17', category: 'Drivers' },
                    { id: 18, src: '/galery/slika18.jpg', title: 'Driver 18', category: 'Drivers' },
                    { id: 19, src: '/galery/slika19.jpg', title: 'Driver 19', category: 'Drivers' },
                    { id: 20, src: '/galery/slika20.jpg', title: 'Driver 20', category: 'Drivers' },
                    { id: 21, src: '/galery/slika21.jpg', title: 'Driver 21', category: 'Drivers' },
                    { id: 22, src: '/galery/slika22.jpg', title: 'Driver 22', category: 'Drivers' },
                    { id: 23, src: '/galery/slika26.jpg', title: 'Driver 23', category: 'Drivers' },
                    { id: 24, src: '/galery/slika24.jpg', title: 'Driver 24', category: 'Drivers' },
                    { id: 25, src: '/galery/slika25.jpg', title: 'Driver 25', category: 'Drivers' },
                    { id: 26, src: '/galery/slika29.jpg', title: 'Driver 26', category: 'Drivers' },
                    { id: 27, src: '/galery/slika30.jpg', title: 'Driver 27', category: 'Drivers' },
                    { id: 28, src: '/galery/slika31.jpg', title: 'Driver 28', category: 'Drivers' },
                    { id: 29, src: '/galery/slika32.jpg', title: 'Driver 29', category: 'Drivers' },
                    { id: 30, src: '/galery/slika33.jpg', title: 'Driver 30', category: 'Drivers' },
                    { id: 32, src: '/galery/slika34.jpg', title: 'Driver 31', category: 'Drivers' },
                    { id: 33, src: '/galery/slika35.jpg', title: 'Driver 32', category: 'Drivers' },
                    { id: 31, src: '/galery/slika 12.jpg', title: 'Driver 26', category: 'Drivers' }
                ];
                setImages(fallbackImages);
            } finally {
                setLoading(false);
            }
        };

        loadImages();
    }, []);

    if (loading) {
        return <div className="gallery-container"><p style={{ color: '#fff', textAlign: 'center', paddingTop: '50px' }}>Učitavanje galerije...</p></div>;
    }

    return (
        <div className="gallery-container">
            {/* Header */}
            <div className="gallery-header">
                <h1 className="gallery-title">Galerija</h1>
                <p className="gallery-subtitle">Formula 1 Piloti - {images.length} slika</p>
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
                                onError={(e) => {
                                    e.target.src = '/Drivers/placeholder.jpg';
                                }}
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
