"use client";

import { format, formatDistanceToNow } from "date-fns";
import { Calendar, Edit, MoreVertical, Trash2 } from "lucide-react";
import type { Task } from "@/lib/types";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type TaskItemProps = {
  task: Task;
  onToggleComplete: (id: string, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
};

export function TaskItem({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}: TaskItemProps) {
  const isOverdue =
    task.dueDate && !task.completed ? new Date(task.dueDate) < new Date() : false;

  return (
    <Card
      className={cn(
        "transition-all duration-300",
        task.completed
          ? "bg-card/50"
          : "hover:shadow-md"
      )}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Checkbox
              id={`task-${task.id}`}
              checked={task.completed}
              onCheckedChange={(checked) =>
                onToggleComplete(task.id, !!checked)
              }
              className="size-6"
              aria-label="Mark task as complete"
            />
            <CardTitle
              className={cn(
                "text-lg transition-colors",
                task.completed && "text-muted-foreground line-through"
              )}
            >
              {task.description}
            </CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(task)}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(task.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription>
          Created {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {task.dueDate && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{format(new Date(task.dueDate), "PPP")}</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {isOverdue && <Badge variant="destructive">Overdue</Badge>}
      </CardFooter>
    </Card>
  );
}
