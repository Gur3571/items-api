import { useState } from 'react'
import { useItems } from './useItems'
import { formatTimestamp } from './format'
import styles from './App.module.css'

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
]

function App() {
  const { items, loading, error } = useItems()
  const [activeTab, setActiveTab] = useState('all')

  const visibleItems =
    activeTab === 'all' ? items : items.filter((item) => item.group === activeTab)

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Items</h1>
            <p className={styles.count}>{items.length} items across 2 groups</p>
          </div>
          <button className={styles.newButton}>New item</button>
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

        {loading && <p>Loading…</p>}
        {error && <p>Failed to load items.</p>}

        {!loading && !error && (
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
                <tr key={item.id} className={styles.row}>
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
    </div>
  )
}

export default App