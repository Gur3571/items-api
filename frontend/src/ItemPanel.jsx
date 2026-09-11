import { useEffect, useState } from 'react'
import { createItem, getItem, updateItem } from './api'
import { formatTimestamp } from './format'
import styles from './ItemPanel.module.css'

/**
 * Side drawer panel component that handles displaying, editing, 
 * and creating individual collection items.
 */

export function ItemPanel({ mode, itemId, onClose, onSaved }) {
  const [item, setItem] = useState(null)
  const [loadingItem, setLoadingItem] = useState(false)
  const [loadError, setLoadError] = useState(null)

  // mode prop is the starting point; the panel switches from view to edit and vice-versa itself
  const [localMode, setLocalMode] = useState(mode)
  const [name, setName] = useState('')
  const [group, setGroup] = useState('primary')
  const [saving, setSaving] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})

  // Close on Escape, cleaned up when the panel unmounts
  useEffect(() => {
    if (!mode) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mode, onClose])

  // Reset when the panel opens or switches to a different item
  useEffect(() => {
    setLocalMode(mode)
    setFieldErrors({})
  }, [mode, itemId])

  // Fetch by id whenever the panel opens for an existing item
  useEffect(() => {
    if (!itemId) {
      setItem(null)
      return
    }
    // Guards against an out-of-order response overwriting newer data
    let cancelled = false
    setLoadingItem(true)
    setLoadError(null)

    getItem(itemId)
      .then((data) => {
        if (!cancelled) setItem(data)
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err)
      })
      .finally(() => {
        if (!cancelled) setLoadingItem(false)
      })

    return () => {
      cancelled = true
    }
  }, [itemId])

  // Edit starts from the item's current values; create starts empty
  useEffect(() => {
    if (localMode === 'edit' && item) {
      setName(item.name)
      setGroup(item.group)
      setFieldErrors({})
    }
    if (localMode === 'create') {
      setName('')
      setGroup('primary')
      setFieldErrors({})
    }
  }, [localMode, item])

  async function handleSave() {
    // Caught here as well as on the server so the error is instant
    if (!name.trim()) {
      setFieldErrors({ name: ['Name cannot be blank.'] })
      return
    }

    setSaving(true)
    setFieldErrors({})
    try {
      await updateItem(itemId, { name, group })
      onSaved()
      setLocalMode('view')
      // Refresh the panel's own copy so the timestamps update
      const fresh = await getItem(itemId)
      setItem(fresh)
    } catch (err) {
      if (err.status === 400) {
        setFieldErrors(err.data)
      } else {
        setFieldErrors({ non_field_errors: ['Something went wrong. Try again.'] })
      }
    } finally {
      setSaving(false)
    }
  }

  // Validates inputs and submits a new item  
  async function handleCreate() {
    if (!name.trim()) {
      setFieldErrors({ name: ['Name cannot be blank.'] })
      return
    }

    setSaving(true)
    setFieldErrors({})
    try {
      await createItem({ name, group })
      onSaved()
      onClose()
    } catch (err) {
      if (err.status === 400) {
        setFieldErrors(err.data)
      } else {
        setFieldErrors({ non_field_errors: ['Something went wrong. Try again.'] })
      }
    } finally {
      setSaving(false)
    }
  }

  if (!mode) return null

  const groupLabel = (value) => (value === 'primary' ? 'Primary' : 'Secondary')
  const showForm = localMode === 'edit' || localMode === 'create'

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <aside className={styles.panel} role="dialog" aria-modal="true">
        <div className={styles.topRow}>
          <span className={styles.eyebrow}>
            {localMode === 'create'
              ? 'Add to collection'
              : localMode === 'edit'
                ? 'Edit item'
                : 'Item details'}
          </span>
          <button className={styles.close} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        {localMode === 'create' && <h2 className={styles.heading}>New item</h2>}

        {loadingItem && <p className={styles.eyebrow}>Loading…</p>}
        {loadError && <p className={styles.eyebrow}>Couldn't load this item.</p>}

        {item && !loadingItem && localMode === 'view' && (
          <>
            <h2 className={styles.heading}>
              {item.name}
              <span
                className={`${styles.badge} ${
                  item.group === 'primary'
                    ? styles.badgePrimary
                    : styles.badgeSecondary
                }`}
              >
                {groupLabel(item.group)}
              </span>
            </h2>

            <table className={styles.meta}>
              <tbody>
                <tr className={styles.metaRow}>
                  <th className={styles.metaLabel}>ID</th>
                  <td className={styles.metaValue}>{item.id}</td>
                </tr>
                <tr className={styles.metaRow}>
                  <th className={styles.metaLabel}>Created</th>
                  <td className={styles.metaValue}>
                    {formatTimestamp(item.created_at)}
                  </td>
                </tr>
                <tr className={styles.metaRow}>
                  <th className={styles.metaLabel}>Updated</th>
                  <td className={styles.metaValue}>
                    {formatTimestamp(item.updated_at)}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        {showForm && (
          <>
            <label className={styles.label} htmlFor="item-name">
              Name
            </label>
            <input
              id="item-name"
              className={`${styles.input} ${fieldErrors.name ? styles.inputError : ''}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Rock"
              autoFocus
            />
            {fieldErrors.name && (
              <p className={styles.error}>{fieldErrors.name[0]}</p>
            )}

            <label className={styles.label} htmlFor="item-group">
              Group
            </label>
            <select
              id="item-group"
              className={`${styles.input} ${
                fieldErrors.non_field_errors ? styles.inputError : ''
              }`}
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
            </select>
            {fieldErrors.non_field_errors && (
              <p className={styles.error}>{fieldErrors.non_field_errors[0]}</p>
            )}
            {localMode === 'create' && !fieldErrors.non_field_errors && (
              <p className={styles.hint}>Names must be unique within a group.</p>
            )}
          </>
        )}

        <div className={styles.footer}>
          {localMode === 'view' && item && (
            <button
              className={styles.primaryButton}
              onClick={() => setLocalMode('edit')}
            >
              Edit
            </button>
          )}
          {localMode === 'edit' && (
            <>
              <button
                className={styles.primaryButton}
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? 'Saving…' : 'Save changes'}
              </button>
              <button
                className={styles.secondaryButton}
                onClick={() => setLocalMode('view')}
              >
                Cancel
              </button>
            </>
          )}
          {localMode === 'create' && (
            <button
              className={styles.primaryButton}
              onClick={handleCreate}
              disabled={saving}
            >
              {saving ? 'Creating…' : 'Create item'}
            </button>
          )}
          {localMode !== 'edit' && (
            <button className={styles.secondaryButton} onClick={onClose}>
              {localMode === 'create' ? 'Cancel' : 'Close'}
            </button>
          )}
        </div>
      </aside>
    </>
  )
}