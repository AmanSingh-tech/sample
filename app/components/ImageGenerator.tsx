'use client';

import { useState } from 'react';
import { api } from '~/utils/api';

interface ImageGeneratorProps {
  onClose: () => void;
}

export default function ImageGenerator({ onClose }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState<'flux' | 'stable-diffusion' | 'dalle-mini'>('flux');
  const [selectedSize, setSelectedSize] = useState<'512x512' | '768x768' | '1024x1024'>('1024x1024');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<any>(null);

  const generateImageMutation = api.image.generateImage.useMutation({
    onSuccess: (response) => {
      setGeneratedImage(response);
      setIsGenerating(false);
    },
    onError: (error) => {
      console.error('Error generating image:', error);
      setIsGenerating(false);
    }
  });

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      await generateImageMutation.mutateAsync({ 
        prompt, 
        model: selectedModel,
        size: selectedSize 
      });
    } catch (error) {
      console.error('Failed to generate image:', error);
    }
  };

  return (
    <div 
      className="modal show d-block" 
      style={{ 
        backgroundColor: 'rgba(15, 20, 25, 0.8)',
        backdropFilter: 'blur(4px)'
      }}
    >
      <div className="modal-dialog modal-lg">
        <div 
          className="modal-content"
          style={{
            backgroundColor: '#0f1419',
            border: '1px solid #2a3441',
            borderRadius: '12px'
          }}
        >
          <div 
            className="modal-header border-bottom"
            style={{ borderColor: '#2a3441' }}
          >
            <h5 className="modal-title d-flex align-items-center" style={{ color: '#ffffff' }}>
              <div 
                className="d-flex align-items-center justify-content-center me-3"
                style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  borderRadius: '8px'
                }}
              >
                <i className="bi bi-image text-white"></i>
              </div>
              Generate Image
            </h5>
            <button 
              type="button" 
              className="btn-close"
              onClick={onClose}
              style={{
                filter: 'invert(1)',
                opacity: '0.7'
              }}
            ></button>
          </div>
          
          <div className="modal-body p-4">
            <div className="mb-4">
              <label 
                htmlFor="imagePrompt" 
                className="form-label mb-3"
                style={{ 
                  color: '#ffffff',
                  fontWeight: '600',
                  fontSize: '1rem'
                }}
              >
                Describe the image you want to generate:
              </label>
              <textarea
                id="imagePrompt"
                className="form-control"
                rows={4}
                placeholder="A beautiful sunset over a mountain range with a lake in the foreground..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isGenerating}
                style={{
                  backgroundColor: '#1e2936',
                  borderColor: '#2a3441',
                  color: '#ffffff',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontSize: '1rem',
                  lineHeight: '1.5',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Model Selection */}
            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label" style={{ color: '#ffffff', fontWeight: '600' }}>
                  AI Model:
                </label>
                <select
                  className="form-select"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value as typeof selectedModel)}
                  disabled={isGenerating}
                  style={{
                    backgroundColor: '#1e2936',
                    borderColor: '#2a3441',
                    color: '#ffffff',
                    borderRadius: '8px',
                  }}
                >
                  <option value="flux">FLUX.1-dev (Recommended)</option>
                  <option value="stable-diffusion">Stable Diffusion 2.1</option>
                  <option value="dalle-mini">DALL-E Mini (Craiyon)</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label" style={{ color: '#ffffff', fontWeight: '600' }}>
                  Image Size:
                </label>
                <select
                  className="form-select"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value as typeof selectedSize)}
                  disabled={isGenerating}
                  style={{
                    backgroundColor: '#1e2936',
                    borderColor: '#2a3441',
                    color: '#ffffff',
                    borderRadius: '8px',
                  }}
                >
                  <option value="512x512">512×512 (Fast)</option>
                  <option value="768x768">768×768 (Balanced)</option>
                  <option value="1024x1024">1024×1024 (High Quality)</option>
                </select>
              </div>
            </div>

            {generatedImage && (
              <div 
                className="rounded-3 p-4 mb-4"
                style={{
                  backgroundColor: '#1e2936',
                  border: '1px solid #2a3441'
                }}
              >
                {generatedImage.imageUrl ? (
                  <>
                    <div className="text-center mb-3">
                      <img 
                        src={generatedImage.imageUrl} 
                        alt={generatedImage.prompt}
                        className="img-fluid rounded-3"
                        style={{ 
                          borderRadius: '8px',
                          maxHeight: '400px',
                          objectFit: 'contain'
                        }}
                      />
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 
                        className="mb-0"
                        style={{ 
                          color: '#ffffff',
                          fontWeight: '600'
                        }}
                      >
                        Generated Image
                      </h6>
                      <button
                        className="btn btn-sm"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = generatedImage.imageUrl;
                          link.download = `generated-image-${generatedImage.id}.png`;
                          link.click();
                        }}
                        style={{
                          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                          border: 'none',
                          color: '#ffffff',
                          borderRadius: '6px',
                          padding: '4px 12px'
                        }}
                      >
                        <i className="bi bi-download me-1"></i>
                        Download
                      </button>
                    </div>
                    <p 
                      className="mb-2"
                      style={{ 
                        color: '#e8e8e8',
                        lineHeight: '1.6',
                        fontSize: '0.9rem'
                      }}
                    >
                      <strong>Prompt:</strong> {generatedImage.prompt}
                    </p>
                    {generatedImage.model && (
                      <p 
                        className="mb-2"
                        style={{ 
                          color: '#9ca3af',
                          fontSize: '0.875rem'
                        }}
                      >
                        <strong>Model:</strong> {generatedImage.model} | <strong>Size:</strong> {generatedImage.size}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <h6 
                      className="mb-3"
                      style={{ 
                        color: '#ffffff',
                        fontWeight: '600'
                      }}
                    >
                      Description:
                    </h6>
                    <p 
                      className="mb-3"
                      style={{ 
                        color: '#e8e8e8',
                        lineHeight: '1.6'
                      }}
                    >
                      {generatedImage.description}
                    </p>
                  </>
                )}
                
                {generatedImage.error && (
                  <div 
                    className="alert alert-warning mt-3"
                    style={{
                      backgroundColor: '#2a1f0f',
                      borderColor: '#4a3728',
                      color: '#d1a441'
                    }}
                  >
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {generatedImage.error}
                  </div>
                )}
                
                {!generatedImage.imageUrl && !generatedImage.error && (
                  <small 
                    className="d-block mt-3"
                    style={{ 
                      color: '#9ca3af',
                      fontSize: '0.875rem'
                    }}
                  >
                    Add your Hugging Face API key to .env.local as HUGGINGFACE_API_KEY to enable actual image generation.
                  </small>
                )}
              </div>
            )}

            {isGenerating && (
              <div className="text-center py-5">
                <div 
                  className="spinner-grow mb-3"
                  style={{ 
                    color: '#4f46e5',
                    width: '3rem',
                    height: '3rem'
                  }}
                ></div>
                <p 
                  className="mb-2"
                  style={{ 
                    color: '#e8e8e8',
                    fontSize: '1.1rem',
                    fontWeight: '600'
                  }}
                >
                  Generating your image...
                </p>
                <p 
                  className="mb-0"
                  style={{ 
                    color: '#9ca3af',
                    fontSize: '0.9rem'
                  }}
                >
                  Using {selectedModel} model • {selectedSize} resolution
                </p>
                <small 
                  className="d-block mt-2"
                  style={{ 
                    color: '#9ca3af',
                    fontSize: '0.8rem'
                  }}
                >
                  This may take 30-60 seconds depending on the model...
                </small>
              </div>
            )}
          </div>

          <div 
            className="modal-footer border-top d-flex gap-3"
            style={{ borderColor: '#2a3441' }}
          >
            <button 
              type="button" 
              className="btn"
              onClick={onClose}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #2a3441',
                color: '#e8e8e8',
                borderRadius: '8px',
                padding: '8px 16px'
              }}
            >
              Close
            </button>
            <button 
              type="button" 
              className="btn"
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              style={{
                background: (!prompt.trim() || isGenerating) 
                  ? '#2a3441' 
                  : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                border: 'none',
                color: '#ffffff',
                borderRadius: '8px',
                padding: '8px 16px',
                fontWeight: '500'
              }}
            >
              {isGenerating ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
