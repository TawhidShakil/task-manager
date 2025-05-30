import { useState } from 'react';
import AddTaskModal from './AddTaskModal';
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskLists from "./TaskLists";
import NoTaskFound from './NoTaskFound';




export default function TaskBoard() {
    const defaultTask = {
        'id': crypto.randomUUID(),
        'title': "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex, maiores.",
        'description': "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate minima necessitatibus, fuga obcaecati dolore mollitia.",
        'tags': ["web", "AI", "Cyber"],
        'priority': "high",
        'isFavourite': true

    }

    const [tasks, setTasks] = useState([defaultTask])
    const [showAddModal, setShowAddModal] = useState(false)
    const [taskToUpdate, setTaskToUpdate] = useState(null)

    function handleAddTask(newTask, isAdd) {
        if (isAdd) {
            setTasks([
                ...tasks, newTask
            ])
        } else {
            setTasks(
                tasks.map((task) => {
                    if (task.id === newTask.id) {
                        return newTask
                    }
                    return task
                })
            )
        }

        handleCloseClick();
    }

    function handleEditTask(task) {
        setTaskToUpdate(task)
        setShowAddModal(true)

    }

    function handleCloseClick() {
        setShowAddModal(false)
        setTaskToUpdate(null)
    }

    function handleDeleteTask(taskId) {
        const taskfterDelete = tasks.filter(task => task.id !== taskId)
        setTasks(taskfterDelete)
    }

    function handleDeleteAllTask() {
        tasks.length = 0
        setTasks([...tasks])
    }

    function handleFavourite(taskId) {
        const taskIndex = tasks.findIndex(task => task.id === taskId)
        const newTasks = [...tasks]
        newTasks[taskIndex].isFavourite = !newTasks[taskIndex].isFavourite
        setTasks(newTasks)
    }

    function handleSearch(searchTerm) {
        console.log(searchTerm);

        const filtered = tasks.filter((task) =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setTasks([...filtered]);

    }


    return (

        <section className="mb-20" id="tasks">
            {showAddModal && <AddTaskModal
                onSave={handleAddTask}
                onCloseClick={handleCloseClick}
                taskToUpdate={taskToUpdate} />}
            <div className="container">
                <div className="p-2 flex justify-end">
                    <SearchTask onSearch={handleSearch} />
                </div>

                <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B]  px-6 py-8 md:px-9 md:py-16">

                    <TaskAction
                        onAddClick={() => { setShowAddModal(true) }}
                        onDeleteAllTask={handleDeleteAllTask} />
                    {
                        tasks.length > 0 ? 
                        (<TaskLists
                            tasks={tasks}
                            onEdit={handleEditTask}
                            onDelete={handleDeleteTask}
                            onFav={handleFavourite} />)
                            : <NoTaskFound/>
                    }

                </div>
            </div>
        </section>

    )
}
