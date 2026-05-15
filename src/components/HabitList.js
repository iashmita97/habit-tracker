import { useState } from "react";

function HabitCard({ habit, onUpdate, onDelete, onAddProgress }) {
  return (
    <div className="card">
      <h3>{habit.name}</h3>
      <p className="streak">Streak: {habit.streak}</p>

      <div className="grid">
        {habit.progress.map((done, idx) => (
          <div key={idx} className={`box ${done ? "active" : ""}`}></div>
        ))}
      </div>

      <div className="nav-buttons">
        <button onClick={() => onAddProgress(habit.id)}>Add Progress</button>
        <button onClick={() => onUpdate(habit.id)}>Update</button>
        <button onClick={() => onDelete(habit.id)}>Delete</button>
      </div>
    </div>
  );
}

export default function HabitList() {
  const [habits, setHabits] = useState([
    { id: 1, name: "Exercise", streak: 3, progress: [true, true, false, false, false, false, false] },
    { id: 2, name: "Read Book", streak: 2, progress: [true, true, false, false, false, false, false] },
  ]);

  const addProgress = (id) => {
    setHabits(prev =>
      prev.map(h => {
        if (h.id === id) {
          const newProgress = [...h.progress];
          const nextIndex = newProgress.findIndex(p => p === false);
          if (nextIndex !== -1) newProgress[nextIndex] = true;
          return { ...h, progress: newProgress, streak: h.streak + 1 };
        }
        return h;
      })
    );
  };

  const updateHabit = (id) => {
    const newName = prompt("Enter new habit name:");
    if (!newName) return;
    setHabits(prev => prev.map(h => (h.id === id ? { ...h, name: newName } : h)));
  };

  const deleteHabit = (id) => {
    if (window.confirm("Are you sure you want to delete this habit?")) {
      setHabits(prev => prev.filter(h => h.id !== id));
    }
  };

  return (
    <div className="center">
      {habits.map(h => (
        <HabitCard
          key={h.id}
          habit={h}
          onAddProgress={addProgress}
          onUpdate={updateHabit}
          onDelete={deleteHabit}
        />
      ))}
    </div>
  );
}