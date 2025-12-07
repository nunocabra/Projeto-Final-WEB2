"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { ITask } from "@/models/Task";
import { useState, useEffect } from "react";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Partial<ITask>) => Promise<void>;
  task?: ITask | null;
}

export function TaskModal({ isOpen, onClose, onSave, task }: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<ITask["status"]>("pendente");
  const [priority, setPriority] = useState<ITask["priority"]>("media");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setStatus(task.status);
      setPriority(task.priority);
    } else {
      setTitle("");
      setDescription("");
      setStatus("pendente");
      setPriority("media");
    }
  }, [task, isOpen]);

  const handleSave = async () => {
    if (!title.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      await onSave({
        title: title.trim(),
        description: description.trim(),
        status,
        priority,
      });
      onClose();
    } catch (error) {
      console.error("Erro ao salvar tarefa:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {task ? "Editar Tarefa" : "Nova Tarefa"}
        </ModalHeader>
        <ModalBody>
          <Input
            label="Título"
            placeholder="Digite o título da tarefa"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            isRequired
            autoFocus
          />
          <Textarea
            label="Descrição"
            placeholder="Digite a descrição da tarefa (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minRows={3}
          />
          <div className="flex gap-4">
            <Select
              label="Status"
              selectedKeys={[status]}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as ITask["status"];
                setStatus(selected);
              }}
            >
              <SelectItem key="pendente" value="pendente">
                Pendente
              </SelectItem>
              <SelectItem key="em-andamento" value="em-andamento">
                Em Andamento
              </SelectItem>
              <SelectItem key="concluida" value="concluida">
                Concluída
              </SelectItem>
            </Select>
            <Select
              label="Prioridade"
              selectedKeys={[priority]}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as ITask["priority"];
                setPriority(selected);
              }}
            >
              <SelectItem key="baixa" value="baixa">
                Baixa
              </SelectItem>
              <SelectItem key="media" value="media">
                Média
              </SelectItem>
              <SelectItem key="alta" value="alta">
                Alta
              </SelectItem>
            </Select>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancelar
          </Button>
          <Button
            color="primary"
            onPress={handleSave}
            isLoading={isLoading}
            isDisabled={!title.trim()}
          >
            {task ? "Atualizar" : "Criar"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}



