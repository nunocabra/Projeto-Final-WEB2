"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { ITask } from "@/models/Task";
import { MoreVertical, Trash2, Edit } from "lucide-react";

interface TaskCardProps {
  task: ITask;
  onEdit: (task: ITask) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, newStatus: ITask["status"]) => void;
}

const statusColors: Record<ITask["status"], "default" | "primary" | "success"> = {
  pendente: "default",
  "em-andamento": "primary",
  concluida: "success",
};

const statusLabels: Record<ITask["status"], string> = {
  pendente: "Pendente",
  "em-andamento": "Em Andamento",
  concluida: "Concluída",
};

const priorityColors: Record<ITask["priority"], "default" | "warning" | "danger"> = {
  baixa: "default",
  media: "warning",
  alta: "danger",
};

const priorityLabels: Record<ITask["priority"], string> = {
  baixa: "Baixa",
  media: "Média",
  alta: "Alta",
};

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  return (
    <Card className="w-full hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-l-4 border-l-transparent hover:border-l-primary">
      <CardHeader className="flex justify-between items-start pb-3">
        <div className="flex flex-col gap-3 flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
            {task.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            <Chip
              size="sm"
              color={statusColors[task.status]}
              variant="flat"
              className="font-medium"
            >
              {statusLabels[task.status]}
            </Chip>
            <Chip
              size="sm"
              color={priorityColors[task.priority]}
              variant="flat"
              className="font-medium"
            >
              {priorityLabels[task.priority]}
            </Chip>
          </div>
        </div>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button 
              isIconOnly 
              size="sm" 
              variant="light"
              className="min-w-unit-8 w-unit-8 h-unit-8"
            >
              <MoreVertical size={18} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Task actions" variant="flat">
            <DropdownItem
              key="edit"
              startContent={<Edit size={16} />}
              onPress={() => onEdit(task)}
            >
              Editar
            </DropdownItem>
            <DropdownItem
              key="status"
              onPress={() => {
                const nextStatus: ITask["status"] =
                  task.status === "pendente"
                    ? "em-andamento"
                    : task.status === "em-andamento"
                    ? "concluida"
                    : "pendente";
                onStatusChange(task._id!, nextStatus);
              }}
            >
              Alterar Status
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              startContent={<Trash2 size={16} />}
              onPress={() => onDelete(task._id!)}
            >
              Deletar
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardHeader>
      <CardBody className="pt-0">
        {task.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
            {task.description}
          </p>
        )}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <span className="font-medium">Criada em:</span> {new Date(task.createdAt!).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric"
            })}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}


