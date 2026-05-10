import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Plus, DollarSign, Trash2, TrendingUp,
  ShoppingBag, Utensils, Plane, Hotel, Camera, Search
} from 'lucide-react';
import Button from '../../components/Button/Button';
import { dummyTrips } from '../../data/trips';
import styles from './BudgetTracker.module.css';

const CATEGORY_ICONS = {
  Food:      <Utensils size={15} strokeWidth={2} />,
  Transport: <Plane size={15} strokeWidth={2} />,
  Stay:      <Hotel size={15} strokeWidth={2} />,
  Activities:<Camera size={15} strokeWidth={2} />,
  Shopping:  <ShoppingBag size={15} strokeWidth={2} />,
  Other:     <DollarSign size={15} strokeWidth={2} />,
};

const DUMMY_EXPENSES = [
  { id: 'e1', desc: 'Hotel Novotel',    category: 'Stay',      amount: 320, date: '2026-07-10' },
  { id: 'e2', desc: 'Flight to Paris',  category: 'Transport', amount: 580, date: '2026-07-09' },
  { id: 'e3', desc: 'Eiffel Dinner',    category: 'Food',      amount: 95,  date: '2026-07-10' },
  { id: 'e4', desc: 'Louvre Tickets',   category: 'Activities',amount: 50,  date: '2026-07-11' },
  { id: 'e5', desc: 'Souvenir Market',  category: 'Shopping',  amount: 70,  date: '2026-07-12' },
  { id: 'e6', desc: 'Street Food Tour', category: 'Food',      amount: 45,  date: '2026-07-11' },
];

const CATEGORIES = Object.keys(CATEGORY_ICONS);

const BudgetTracker = () => {
  const { id } = useParams();
  const trip = dummyTrips.find(t => t.id === id) || dummyTrips[0];

  const [expenses, setExpenses]     = useState(DUMMY_EXPENSES);
  const [search, setSearch]         = useState('');
  const [filterCat, setFilterCat]   = useState('All');
  const [showForm, setShowForm]     = useState(false);
  const [form, setForm]             = useState({ desc: '', category: 'Food', amount: '' });

  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);
  const remaining  = trip.budget - totalSpent;
  const spentPct   = Math.min(100, Math.round((totalSpent / trip.budget) * 100));
  const isOver     = totalSpent > trip.budget;

  const byCategory = CATEGORIES.map(cat => ({
    cat,
    total: expenses.filter(e => e.category === cat).reduce((s, e) => s + e.amount, 0),
  })).filter(c => c.total > 0).sort((a, b) => b.total - a.total);

  const filtered = expenses.filter(e => {
    const matchSearch = e.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat    = filterCat === 'All' || e.category === filterCat;
    return matchSearch && matchCat;
  });

  const addExpense = (e) => {
    e.preventDefault();
    if (!form.desc || !form.amount) return;
    setExpenses(prev => [...prev, { id: `e${Date.now()}`, ...form, amount: parseFloat(form.amount), date: new Date().toISOString().slice(0, 10) }]);
    setForm({ desc: '', category: 'Food', amount: '' });
    setShowForm(false);
  };

  const deleteExpense = (expId) => setExpenses(prev => prev.filter(e => e.id !== expId));

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h1>Budget Tracker</h1>
          <p>{trip.name}</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowForm(s => !s)}>
          <Plus size={16} strokeWidth={2.5} /> Add Expense
        </Button>
      </div>

      {/* SUMMARY CARDS */}
      <div className={styles.summaryRow}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryLabel}>Total Budget</div>
          <div className={styles.summaryValue} style={{ color: 'var(--color-ocean)' }}>
            ${trip.budget.toLocaleString()}
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryLabel}>Total Spent</div>
          <div className={styles.summaryValue} style={{ color: isOver ? 'var(--color-coral)' : 'var(--color-ink)' }}>
            ${totalSpent.toLocaleString()}
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryLabel}>Remaining</div>
          <div className={styles.summaryValue} style={{ color: isOver ? 'var(--color-coral)' : '#059669' }}>
            {isOver ? '-' : ''}${Math.abs(remaining).toLocaleString()}
          </div>
        </div>
      </div>

      {/* BUDGET PROGRESS */}
      <div className={styles.progressCard}>
        <div className={styles.progressHeader}>
          <span>{spentPct}% of budget used</span>
          {isOver && <span className={styles.overBudgetTag}>Over Budget</span>}
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${spentPct}%`,
              background: isOver ? 'var(--color-coral)' : spentPct > 75 ? 'var(--color-amber)' : 'var(--gradient-ocean)',
            }}
          />
        </div>
        <div className={styles.progressLabels}>
          <span>${totalSpent.toLocaleString()} spent</span>
          <span>${trip.budget.toLocaleString()} total</span>
        </div>
      </div>

      {/* CATEGORY BREAKDOWN */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>By Category</h2>
        <div className={styles.categoryGrid}>
          {byCategory.map(({ cat, total }) => (
            <div key={cat} className={styles.catCard}>
              <div className={styles.catIcon}>{CATEGORY_ICONS[cat]}</div>
              <div className={styles.catName}>{cat}</div>
              <div className={styles.catAmount}>${total}</div>
              <div className={styles.catBar}>
                <div style={{ width: `${(total / totalSpent) * 100}%`, height: '100%', background: 'var(--gradient-ocean)', borderRadius: 'var(--radius-full)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD EXPENSE FORM */}
      {showForm && (
        <div className={styles.formCard}>
          <h3 className={styles.formTitle}>Add Expense</h3>
          <form onSubmit={addExpense} className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Description</label>
                <input className={styles.input} placeholder="e.g. Hotel stay" value={form.desc}
                  onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} required />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Amount ($)</label>
                <input className={styles.input} type="number" placeholder="0.00" value={form.amount}
                  onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} required />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Category</label>
                <select className={styles.input} value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className={styles.formActions}>
              <Button type="submit" variant="primary" size="sm">Add</Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      {/* EXPENSE LIST */}
      <div className={styles.section}>
        <div className={styles.listHeader}>
          <h2 className={styles.sectionTitle}>Expenses</h2>
          <div className={styles.listControls}>
            <div className={styles.searchWrap}>
              <Search size={15} className={styles.searchIcon} />
              <input
                className={styles.searchInput}
                placeholder="Search expenses…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select className={styles.catFilter} value={filterCat} onChange={e => setFilterCat(e.target.value)}>
              <option value="All">All Categories</option>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className={styles.expenseList}>
          {filtered.map(exp => (
            <div key={exp.id} className={styles.expenseRow}>
              <div className={styles.expIcon}>{CATEGORY_ICONS[exp.category]}</div>
              <div className={styles.expInfo}>
                <div className={styles.expDesc}>{exp.desc}</div>
                <div className={styles.expMeta}>
                  <span className={styles.expCat}>{exp.category}</span>
                  <span>·</span>
                  <span>{new Date(exp.date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className={styles.expAmount}>${exp.amount}</div>
              <button className={styles.expDelete} onClick={() => deleteExpense(exp.id)}>
                <Trash2 size={14} strokeWidth={2} />
              </button>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className={styles.emptyList}>No expenses found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;
