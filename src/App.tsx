function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: 'blue' }}>🎉 Cursor Meetup 测试页面</h1>
      <p>如果你能看到这个页面，说明 React 应用正常启动！</p>
      <p>当前时间: {new Date().toLocaleString()}</p>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <h3>测试信息：</h3>
        <ul>
          <li>✅ React 应用正常启动</li>
          <li>✅ JavaScript 正常执行</li>
          <li>✅ 页面渲染成功</li>
        </ul>
      </div>
    </div>
  )
}

export default App
