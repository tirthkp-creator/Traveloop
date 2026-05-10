import React, { useState } from 'react';
import { Search, Check, ChevronDown } from 'lucide-react';
import styles from './Checklist.module.css';

/* dummy rich checklist for display */
const CHECKLIST = [
  { id: 1, category: 'Documents',  item: 'Passport',              checked: false },
  { id: 2, category: 'Documents',  item: 'Travel insurance docs', checked: false },
  { id: 3, category: 'Documents',  item: 'Hotel confirmations',   checked: true  },
  { id: 4, category: 'Documents',  item: 'Flight tickets',        checked: true  },
  { id: 5, category: 'Clothing',   item: 'T-shirts (3)',          checked: false },
  { id: 6, category: 'Clothing',   item: 'Comfortable shoes',     checked: false },
  { id: 7, category: 'Clothing',   item: 'Rain jacket',           checked: true  },
  { id: 8, category: 'Clothing',   item: 'Sunglasses',            checked: false },
  { id: 9, category: 'Essentials', item: 'Phone charger',         checked: true  },
  { id: 10,category: 'Essentials', item: 'Power adapter',         checked: false },
  { id: 11,category: 'Essentials', item: 'Cash / cards',          checked: true  },
  { id: 12,category: 'Health',     item: 'Sunscreen SPF50',       checked: false },
  { id: 13,category: 'Health',     item: 'First aid kit',         checked: false },
  { id: 14,category: 'Health',     item: 'Prescription meds',     checked: true  },
];

const CATEGORIES = [...new Set(CHECKLIST.map(i => i.category))];

const Checklist = () => {
  const [items, setItems]         = useState(CHECKLIST);
  const [search, setSearch]       = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [collapsed, setCollapsed] = useState({});

  const toggle = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, checked: !i.checked } : i));
  const toggleCollapse = (cat) => setCollapsed(prev => ({ ...prev, [cat]: !prev[cat] }));

  const checkedCount = items.filter(i => i.checked).length;
  const totalCount   = items.length;
  const pct          = Math.round((checkedCount / totalCount) * 100);

  const visible = items.filter(i => {
    const matchSearch = i.item.toLowerCase().includes(search.toLowerCase());
    const matchTab    = activeTab === 'All' || i.category === activeTab;
    return matchSearch && matchTab;
  });

  const grouped = CATEGORIES.reduce((acc, cat) => {
    const catItems = visible.filter(i => i.category === cat);
    if (catItems.length) acc[cat] = catItems;
    return acc;
  }, {});

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h1>Packing Checklist</h1>
          <p>Track everything you need for your trip.</p>
        </div>
        {/* Progress Ring */}
        <div className={styles.progressRing}>
          <svg width="72" height="72" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r="30" fill="none" stroke="var(--color-border-medium)" strokeWidth="6" />
            <circle
              cx="36" cy="36" r="30"
              fill="none"
              stroke={pct === 100 ? '#10B981' : 'var(--color-ocean)'}
              strokeWidth="6"
              strokeDasharray={`${(pct / 100) * 188} 188`}
              strokeDashoffset="47"
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 0.6s ease' }}
            />
          </svg>
          <div className={styles.ringLabel}>
            <span className={styles.ringPct}>{pct}%</span>
          </div>
        </div>
      </div>

      {/* PROGRESS SUMMARY */}
      <div className={styles.summary}>
        <div className={styles.summaryBar}>
          <div className={styles.summaryFill} style={{ width: `${pct}%` }} />
        </div>
        <p className={styles.summaryText}>
          {checkedCount} of {totalCount} items packed
          {pct === 100 && ' — You\'re ready!'}
        </p>
      </div>

      {/* SEARCH + TABS */}
      <div className={styles.controls}>
        <div className={styles.searchWrap}>
          <Search size={15} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder="Search items…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.tabs}>
          {['All', ...CATEGORIES].map(tab => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* CHECKLIST */}
      <div className={styles.listWrap}>
        {Object.entries(grouped).map(([cat, catItems]) => (
          <div key={cat} className={styles.group}>
            <button className={styles.groupHeader} onClick={() => toggleCollapse(cat)}>
              <span className={styles.groupTitle}>{cat}</span>
              <div className={styles.groupMeta}>
                <span className={styles.groupCount}>
                  {catItems.filter(i => i.checked).length}/{catItems.length}
                </span>
                <ChevronDown
                  size={16}
                  strokeWidth={2.5}
                  className={`${styles.chevron} ${collapsed[cat] ? styles.chevronDown : ''}`}
                />
              </div>
            </button>

            {!collapsed[cat] && (
              <div className={styles.groupItems}>
                {catItems.map(item => (
                  <button
                    key={item.id}
                    className={`${styles.checkItem} ${item.checked ? styles.checkItemDone : ''}`}
                    onClick={() => toggle(item.id)}
                  >
                    <div className={`${styles.checkbox} ${item.checked ? styles.checkboxChecked : ''}`}>
                      {item.checked && <Check size={12} strokeWidth={3} />}
                    </div>
                    <span className={styles.itemLabel}>{item.item}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {Object.keys(grouped).length === 0 && (
          <div className={styles.empty}>No items match your search.</div>
        )}
      </div>
    </div>
  );
};

export default Checklist;
