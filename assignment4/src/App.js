// AdminDashboardApp.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

// Sample chart data
const data = [
  { name: 'Jan', uv: 400 },
  { name: 'Feb', uv: 300 },
  { name: 'Mar', uv: 500 },
  { name: 'Apr', uv: 200 }
];

// Initial Kanban tasks
const initialTasks = {
  todo: [
    { id: '1', content: 'Design UI' },
    { id: '2', content: 'Write documentation' }
  ],
  inProgress: [{ id: '3', content: 'API Integration' }],
  done: [{ id: '4', content: 'Login Page' }]
};

// Sample table data
const sampleTableData = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com' }
];

function Dashboard() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function CalendarPage() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Calendar</h2>
      <FullCalendar plugins={[dayGridPlugin, interactionPlugin]} initialView="dayGridMonth" />
    </div>
  );
}

function KanbanBoard() {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    const sourceCol = [...tasks[source.droppableId]];
    const destCol = [...tasks[destination.droppableId]];
    const [removed] = sourceCol.splice(source.index, 1);
    destCol.splice(destination.index, 0, removed);
    setTasks({
      ...tasks,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Kanban Board</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4">
          {Object.entries(tasks).map(([colId, colTasks]) => (
            <Droppable droppableId={colId} key={colId}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-gray-100 p-4 rounded w-1/3 min-h-[200px]"
                >
                  <h3 className="font-semibold capitalize mb-2">{colId}</h3>
                  {colTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="bg-white p-2 rounded shadow mb-2"
                        >
                          {task.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

function TablePage() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Table</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-blue-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {sampleTableData.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ThemeToggler({ theme, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className="absolute top-4 right-4 px-4 py-2 bg-gray-800 text-white rounded"
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <aside className="w-64 bg-blue-800 text-white p-4">
          <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
          <nav className="space-y-2">
            <Link to="/" className="block hover:bg-blue-700 p-2 rounded">Dashboard </Link>
            <Link to="/calendar" className="block hover:bg-blue-700 p-2 rounded">Calendar</Link>
            <Link to="/kanban" className="block hover:bg-blue-700 p-2 rounded">Kanban</Link>
            <Link to="/table" className="block hover:bg-blue-700 p-2 rounded">Table</Link>
          </nav>
        </aside>
        <main className="flex-1 overflow-auto p-4">
          <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/kanban" element={<KanbanBoard />} />
            <Route path="/table" element={<TablePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
