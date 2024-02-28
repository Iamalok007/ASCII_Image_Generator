
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageToAscii = () => {
  const [asciiArt, setAsciiArt] = useState('');
  const [imageSrc, setImageSrc] = useState('');

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();
      image.src = reader.result;

      image.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Resize the image to a smaller size
        const width = 100;
        const height = (image.height / image.width) * width;
        canvas.width = width;
        canvas.height = height;

        // Draw the image on the canvas
        context.drawImage(image, 0, 0, width, height);

        // Get pixel data
        const imageData = context.getImageData(0, 0, width, height).data;

        // Map pixel data to ASCII characters
        let asciiImage = '';
        for (let i = 0; i < imageData.length; i += 4) {
          const grayscale = (imageData[i] + imageData[i + 1] + imageData[i + 2]) / 3;
          const asciiChar = getAsciiChar(grayscale);
         // Add line break at the end of each row
         if ((i / 4 + 1) % width === 0) {
            asciiImage += asciiChar + '\n';
          } else {
            asciiImage += asciiChar;
          }
        }

        setAsciiArt(asciiImage);
        setImageSrc(reader.result);
      };
    };

    reader.readAsDataURL(file);
  };

  const getAsciiChar = (grayscaleValue) => {
    const asciiChars = '@%#*+=-:. ';
    const index = Math.floor((grayscaleValue / 255) * (asciiChars.length - 1));
    return asciiChars[index];
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop an image here, or click to select one</p>
      </div>
      {imageSrc && (
        <div>
          <h2>Original Image</h2>
          <img src={imageSrc} alt="Original" style={{ maxWidth: '100%' }} />
        </div>
      )}
      {asciiArt && (
        <div>
          <h2>ASCII Art</h2>
          <pre>{asciiArt}</pre>
        </div>
      )}
    </div>
  );
};

export default ImageToAscii;