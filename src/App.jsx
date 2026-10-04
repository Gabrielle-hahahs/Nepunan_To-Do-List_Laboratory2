import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  // Add the task only when the input has something in it.
  function addTask(event) {
    event.preventDefault();

    if (newTask.trim() === "") return;

    const task = {
      id: Date.now(),
      name: newTask.trim(),
      isDone: false
    };

    setTasks([...tasks, task]);
    setNewTask("");
  }

  // Switch a task between Done and Not Done.
  function changeStatus(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isDone: !task.isDone };
      }
      return task;
    });

    setTasks(updatedTasks);
  }

  function removeTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function clearList() {
    if (tasks.length === 0) return;

    const sure = window.confirm("Clear all tasks from your list?");
    if (sure) setTasks([]);
  }

  const finishedCount = tasks.filter((task) => task.isDone).length;

  return (
    <div className="page">
      <main className="todo-card">
        <header className="top">
          <div className="little-leaf">✿</div>
          <p className="eyebrow">A little progress every day</p>
          <h1>Task Garden</h1>
          <p className="subtitle">Plant your plans. Get things done.</p>
        </header>

        <section className="progress-area">
          <div>
            <p className="section-label">Today's list</p>
            <p className="progress-text">
              {finishedCount === tasks.length && tasks.length > 0
                ? "Everything is done. Nice work!"
                : `${finishedCount} of ${tasks.length} tasks finished`}
            </p>
          </div>
          <button
            className="help-button"
            type="button"
            onClick={() => setShowHelp(!showHelp)}
          >
            {showHelp ? "Close guide" : "How it works"}
          </button>
        </section>

        {showHelp && (
          <aside className="guide">
            <strong>Quick guide</strong>
            <p>1. Write a task and press Add task.</p>
            <p>2. Tap the small circle to mark it Done or Not Done.</p>
            <p>3. Use the × button to remove a task.</p>
            <p>4. Clear list removes all tasks at once.</p>
          </aside>
        )}

        <form className="add-form" onSubmit={addTask}>
          <input
            type="text"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            placeholder="Something you want to finish..."
            aria-label="Enter a task"
          />
          <button type="submit">+ Add task</button>
        </form>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <span className="empty-flower">✾</span>
            <p className="empty-title">Your page is fresh and clear.</p>
            <p>Add a task when you're ready to begin.</p>
          </div>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <div className={`task-row ${task.isDone ? "finished" : ""}`} key={task.id}>
                <button
                  type="button"
                  className="status-button"
                  onClick={() => changeStatus(task.id)}
                  aria-label={task.isDone ? "Mark as not done" : "Mark as done"}
                >
                  {task.isDone ? "✓" : ""}
                </button>

                <span className="task-name">{task.name}</span>
                <span className="status-word">
                  {task.isDone ? "Done" : "Not Done"}
                </span>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => removeTask(task.id)}
                  aria-label="Delete task"
                  title="Delete task"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {tasks.length > 0 && (
          <footer className="list-footer">
            <span>{tasks.length - finishedCount} still growing</span>
            <button type="button" onClick={clearList}>Clear list</button>
          </footer>
        )}
      </main>
      <p className="bottom-note">Made for your everyday to-dos <span>♡</span></p>
    </div>
  );
}

export default App;
