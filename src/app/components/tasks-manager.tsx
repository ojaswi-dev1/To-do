"use client";

import { useState, useMemo, useEffect } from "react";
import { z } from "zod";
import { Plus, Filter, ArrowUpDown } from "lucide-react";
import type { Task } from "@/lib/types";
import { TaskForm, taskSchema } from "./task-form";
import { TaskItem } from "./task-item";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type FilterType = "all" | "active" | "completed";
type SortType = "createdAt" | "dueDate";
type DialogState = { type: "add" | "edit"; task?: Task } | null;

const initialTasks: Task[] = [
  {
    id: "1",
    description: "Set up project repository",
    completed: true,
    dueDate: new Date(new Date().setDate(new Date().getDate() - 2)),
    createdAt: new Date(new Date().setDate(new Date().getDate() - 3)),
  },
  {
    id: "2",
    description: "Design the main UI components",
    completed: false,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)),
  },
  {
    id: "3",
    description: "Implement the theme toggle feature",
    completed: false,
    dueDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
];

export function TasksManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("createdAt");
  const [dialogState, setDialogState] = useState<DialogState>(null);
  const [deleteDialog, setDeleteDialog] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading tasks
    setTasks(initialTasks);
  }, []);

  const handleAddTask = (values: z.infer<typeof taskSchema>) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date(),
      ...values,
    };
    setTasks((prev) => [newTask, ...prev]);
    setDialogState(null);
  };

  const handleEditTask = (values: z.infer<typeof taskSchema>) => {
    if (!dialogState || !dialogState.task) return;
    setTasks((prev) =>
      prev.map((task) =>
        task.id === dialogState.task?.id ? { ...task, ...values } : task
      )
    );
    setDialogState(null);
  };

  const handleToggleComplete = (id: string, completed: boolean) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed } : task))
    );
  };

  const handleDeleteTask = () => {
    if (!deleteDialog) return;
    setTasks((prev) => prev.filter((task) => task.id !== deleteDialog));
    setDeleteDialog(null);
  };

  const filteredTasks = useMemo(() => {
    let filtered = tasks;
    if (filter === "active") {
      filtered = tasks.filter((task) => !task.completed);
    } else if (filter === "completed") {
      filtered = tasks.filter((task) => task.completed);
    }
    return filtered.sort((a, b) => {
      if (sort === "dueDate") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [tasks, filter, sort]);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterType)}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <ArrowUpDown className="h-4 w-4" />
                <span>Sort</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={sort} onValueChange={(v) => setSort(v as SortType)}>
                <DropdownMenuRadioItem value="createdAt">Creation Date</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dueDate">Due Date</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Dialog open={!!dialogState} onOpenChange={(open) => !open && setDialogState(null)}>
          <DialogTrigger asChild>
            <Button onClick={() => setDialogState({ type: "add" })}>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{dialogState?.type === "edit" ? "Edit Task" : "Add New Task"}</DialogTitle>
            </DialogHeader>
            <TaskForm
              onSubmit={dialogState?.type === "edit" ? handleEditTask : handleAddTask}
              initialData={dialogState?.type === "edit" ? dialogState.task : undefined}
              buttonLabel={dialogState?.type === "edit" ? "Save Changes" : "Create Task"}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onEdit={(t) => setDialogState({ type: "edit", task: t })}
              onDelete={(id) => setDeleteDialog(id)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-20 text-center">
            <Filter className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">No Tasks Found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {filter === "all" ? "Get started by adding a new task!" : "No tasks match the current filter."}
            </p>
          </div>
        )}
      </div>

      <AlertDialog open={!!deleteDialog} onOpenChange={(open) => !open && setDeleteDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTask}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
