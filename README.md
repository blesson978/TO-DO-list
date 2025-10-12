# TO-DO-list
A simple Python To-Do List application to add, view, and remove tasks. Helps organize daily activities, track completed tasks, and manage priorities. Reinforces Python basics including lists, functions, and logic in a practical, interactive project.
# ✅ To-Do List Project

*Repository Name:* todo-list-python  
*Type:* Python Application  
*Objective:* Create a simple task manager to add, view, and remove tasks  

---

## 💻 Features
- Add new tasks  
- View all tasks  
- Remove tasks  
- Simple, user-friendly interface  

---

## ⚡ Sample Code Snippet
```python
# Simple Python To-Do List
tasks = []

def add_task(task):
    tasks.append(task)
    print(f"Added task: {task}")

def view_tasks():
    print("Tasks:")
    for idx, task in enumerate(tasks, start=1):
        print(f"{idx}. {task}")

def remove_task(index):
    if 0 <= index < len(tasks):
        removed = tasks.pop(index)
        print(f"Removed task: {removed}")
    else:
        print("Invalid task number")

# Example usage
add_task("Complete DSA")
add_task("Practice Python")
view_tasks()
remove_task(0)
view_tasks()
