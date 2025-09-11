import React from 'react'


export default function Placeholder({ title }: { title: string }) {
return (
<div style={{ padding: 12, background: '#fff', borderRadius: 8 }}>
<h3>{title}</h3>
<p>Placeholder content.</p>
</div>
)
}


--- File: src/styles/index.css ---
:root {
--bg: #f5f7fa;
}
body {
margin: 0;
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
background: var(--bg);
}


.login-wrap { min-height: 100vh; display:flex; align-items:center; justify-content:center; padding:24px }
.login-card { width:420px; background:#fff; padding:20px; border-radius:8px; box-shadow: 0 8px 24px rgba(0,0,0,0.06) }
.login-header { display:flex; gap:12px; align-items:center }
.login-header .logo { width:56px }
.login-form { margin-top:12px }
.login-note { margin-top:12px; color:#666 }


.app-header { background:#fff; padding:8px 24px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #f0f0f0 }
.sider-logo { height:64px; display:flex; align-items:center; justify-content:center }
.sider-logo img { width:130px }
.card-header { display:flex; justify-content:space-between; align-items:center; background:#fff; padding:12px; border-radius:8px }
.card-body { background:#fff; padding:12px; border-radius:8px }


/* small adjustments to mimic screenshot spacing */
.ant-layout-sider { background: #fff }


---



