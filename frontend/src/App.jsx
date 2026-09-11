import { useState } from 'react'
import { useItems } from './useItems'
import { formatTimestamp } from './format'
import { ItemPanel } from './ItemPanel'
import styles from './App.module.css'

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
]

function App() {
  const { items, loading, error, refetch } = useItems()
  const [activeTab, setActiveTab] = useState('all')
  const [panel, setPanel] = useState({ mode: null, id: null })

  const visibleItems =
    activeTab === 'all' ? items : items.filter((item) => item.group === activeTab)

  const groupCount = new Set(items.map((item) => item.group)).size

  const closePanel = () => setPanel({ mode: null, id: null })

  const ready = !loading && !error

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Items</h1>
            {ready && (
              <p className={styles.count}>
                {items.length} {items.length === 1 ? 'item' : 'items'} across{' '}
                {groupCount} {groupCount === 1 ? 'group' : 'groups'}
              </p>
            )}
          </div>
          <button
            className={styles.newButton}
            onClick={() => setPanel({ mode: 'create', id: null })}
          >
            New item
          </button>
        </header>

        <nav className={styles.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Same columns and widths as the real table, so nothing shifts on load */}
        {loading && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th} style={{ width: '24%' }}>Name</th>
                <th className={styles.th} style={{ width: '20%' }}>Group</th>
                <th className={styles.th} style={{ width: '28%' }}>Created</th>
                <th className={styles.th} style={{ width: '28%' }}>Updated</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className={styles.skeletonRow}>
                  <td className={styles.skeletonCell}>
                    <div className={styles.shimmer} style={{ width: '60%' }} />
                  </td>
                  <td className={styles.skeletonCell}>
                    <div className={styles.shimmer} style={{ width: '70%' }} />
                  </td>
                  <td className={styles.skeletonCell}>
                    <div className={styles.shimmer} style={{ width: '85%' }} />
                  </td>
                  <td className={styles.skeletonCell}>
                    <div className={styles.shimmer} style={{ width: '85%' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {error && <p className={styles.status}>Couldn't load items.</p>}

        {ready && items.length === 0 && (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>No items yet</p>
            <p className={styles.emptyHint}>Create your first item to get started.</p>
          </div>
        )}

        {ready && items.length > 0 && visibleItems.length === 0 && (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>
              Nothing in {activeTab === 'primary' ? 'Primary' : 'Secondary'}
            </p>
            <p className={styles.emptyHint}>Try another group.</p>
          </div>
        )}

        {ready && visibleItems.length > 0 && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th} style={{ width: '24%' }}>Name</th>
                <th className={styles.th} style={{ width: '20%' }}>Group</th>
                <th className={styles.th} style={{ width: '28%' }}>Created</th>
                <th className={styles.th} style={{ width: '28%' }}>Updated</th>
              </tr>
            </thead>
            <tbody>
              {visibleItems.map((item) => (
                <tr
                  key={item.id}
                  className={styles.row}
                  tabIndex={0}
                  onClick={() => setPanel({ mode: 'view', id: item.id })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setPanel({ mode: 'view', id: item.id })
                  }}
                >
                  <td className={styles.td}>{item.name}</td>
                  <td className={styles.td}>
                    <span
                      className={`${styles.badge} ${
                        item.group === 'primary'
                          ? styles.badgePrimary
                          : styles.badgeSecondary
                      }`}
                    >
                      {item.group === 'primary' ? 'Primary' : 'Secondary'}
                    </span>
                  </td>
                  <td className={`${styles.td} ${styles.tdCreated}`}>
                    {formatTimestamp(item.created_at)}
                  </td>
                  <td className={`${styles.td} ${styles.tdUpdated}`}>
                    {formatTimestamp(item.updated_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ItemPanel
        mode={panel.mode}
        itemId={panel.id}
        onClose={closePanel}
        onSaved={refetch}
        existingItems={items}
      />
    </div>
  )
}

export default App