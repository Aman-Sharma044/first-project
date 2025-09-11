import { useEffect, useState } from 'react'
return (
<div>
<div className="card-header">
<h3>Appointments</h3>
<Radio.Group value={view} onChange={(e) => setView(e.target.value)}>
<Radio.Button value="list">List</Radio.Button>
<Radio.Button value="day">Day</Radio.Button>
<Radio.Button value="week">Week</Radio.Button>
<Radio.Button value="month">Month</Radio.Button>
</Radio.Group>
</div>


<div style={{ marginTop: 12 }}>
<div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
<Button onClick={() => setFiltersOpen(true)}>Filter</Button>
<DatePicker onChange={(d) => d && setSelectedDate(d.format('YYYY-MM-DD'))} />
<Input.Search placeholder="Search patients" style={{ width: 220 }} />
</div>


<div className="card-body">
{view === 'list' && (
<div>
<ul>
{filtered.map(ev => <li key={ev.id}>{ev.date} — {ev.title} ({ev.type})</li>)}
</ul>
</div>
)}


{view !== 'list' && (
<div style={{ display: 'flex', gap: 16 }}>
<div style={{ flex: 1 }}>
<Calendar fullscreen={false} dateCellRender={dateCellRender} onSelect={(d) => d && setSelectedDate(d.format('YYYY-MM-DD'))} />
</div>


<div style={{ width: 340 }}>
<div style={{ padding: 12 }}>
<h4>Details for {selectedDate}</h4>
<ul>
{filtered.filter(e => e.date === selectedDate).length === 0 && <li style={{ color: '#888' }}>Please select a provider to view appointments.</li>}
{filtered.filter(e => e.date === selectedDate).map(ev => <li key={ev.id}>{ev.title} — <small>{ev.type}</small></li>)}
</ul>
</div>
</div>
</div>
)}
</div>
</div>


<Modal title="Filter events" open={filtersOpen} onCancel={() => setFiltersOpen(false)} onOk={() => setFiltersOpen(false)}>
<label><input type="checkbox" checked={selectedTypes.includes('general')} onChange={(e) => setSelectedTypes(s => e.target.checked ? [...s, 'general'] : s.filter(x => x !== 'general'))} /> General</label>
<br />
<label><input type="checkbox" checked={selectedTypes.includes('lab')} onChange={(e) => setSelectedTypes(s => e.target.checked ? [...s, 'lab'] : s.filter(x => x !== 'lab'))} /> Lab</label>
<br />
<label><input type="checkbox" checked={selectedTypes.includes('followup')} onChange={(e) => setSelectedTypes(s => e.target.checked ? [...s, 'followup'] : s.filter(x => x !== 'followup'))} /> Follow-up</label>
</Modal>
</div>
)
}