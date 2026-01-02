import { useEffect, useMemo, useRef, useState } from 'react'

import Button from '../components/Button'
import Card from '../components/Card'

import type {
  ChangeEvent,
  DragEvent,
  KeyboardEvent,
  ReactElement,
} from 'react'

function formatBytes(bytes: number | null | undefined): string {
  if (bytes === null || bytes === undefined) return ''
  const units = ['B', 'KB', 'MB', 'GB']
  let i = 0
  let v = bytes
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024
    i += 1
  }
  return `${v.toFixed(v >= 10 || i === 0 ? 0 : 1)} ${units[i]}`
}

export default function Detect(): ReactElement {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState<boolean>(false)

  const previewUrl = useMemo<string | null>(() => {
    if (!file) return null
    return URL.createObjectURL(file)
  }, [file])

  useEffect(() => {
    // Avoid leaking object URLs when the user changes images.
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  function onPickFile(nextFile: File | undefined): void {
    if (!nextFile) return
    if (!nextFile.type?.startsWith('image/')) return
    setFile(nextFile)
  }

  function onBrowse(): void {
    inputRef.current?.click()
  }

  function onDrop(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault()
    setIsDragging(false)

    const dropped = e.dataTransfer.files?.[0]
    onPickFile(dropped)
  }

  function onDragOver(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault()
    setIsDragging(true)
  }

  function onDragLeave(): void {
    setIsDragging(false)
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onBrowse()
    }
  }

  function onClear(): void {
    setFile(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  function onChangeFile(e: ChangeEvent<HTMLInputElement>): void {
    onPickFile(e.target.files?.[0])
  }

  return (
    <section className="section">
      <div className="container">
        <div className="sectionHeader">
          <h2 className="sectionHeader__title">Detect</h2>
          <p className="sectionHeader__subtitle">
            Upload a crop/leaf image. This is a frontend-only demo — prediction output is a placeholder.
          </p>
        </div>

        <div className="detectLayout">
          <div>
            <Card title="Upload image" icon="⬆️">
              <div
                className={`dropzone ${isDragging ? 'dropzone--active' : ''}`}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onKeyDown={onKeyDown}
                role="button"
                tabIndex={0}
                aria-label="Upload image via drag and drop"
              >
                <div className="dropzone__inner">
                  <p className="dropzone__title">Drag & drop an image here</p>
                  <p className="dropzone__hint muted">or browse from your device</p>

                  <div className="dropzone__actions">
                    <Button onClick={onBrowse} variant="primary">
                      Browse
                    </Button>
                    <Button onClick={onClear} variant="ghost" disabled={!file}>
                      Clear
                    </Button>
                  </div>

                  <input
                    ref={inputRef}
                    className="srOnly"
                    type="file"
                    accept="image/*"
                    onChange={onChangeFile}
                  />
                </div>
              </div>

              {file && (
                <div className="fileMeta">
                  <p className="fileMeta__name">{file.name}</p>
                  <p className="fileMeta__info muted">
                    {file.type || 'image'} • {formatBytes(file.size)}
                  </p>
                </div>
              )}
            </Card>
          </div>

          <div>
            <Card title="Preview" icon="🔎">
              {!file ? (
                <div className="emptyState">
                  <p className="emptyState__title">No image selected</p>
                  <p className="emptyState__text muted">Choose an image to preview it here.</p>
                </div>
              ) : (
                <div className="preview">
                  <img
                    className="preview__img"
                    src={previewUrl ?? ''}
                    alt="Selected crop"
                  />
                </div>
              )}
            </Card>

            <div className="spacer" />

            <Card title="Prediction (placeholder)" icon="🧠">
              <div className="result">
                <div className="result__row">
                  <p className="result__label">Predicted class</p>
                  <p className="result__value">{file ? 'Leaf Spot (example)' : '—'}</p>
                </div>
                <div className="result__row">
                  <p className="result__label">Confidence</p>
                  <p className="result__value">{file ? '0.87 (mock)' : '—'}</p>
                </div>
                <div className="result__row">
                  <p className="result__label">Recommendation</p>
                  <p className="result__value muted">
                    {file
                      ? 'Connect your inference API to replace this placeholder output.'
                      : 'Upload an image to see a sample result.'}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
