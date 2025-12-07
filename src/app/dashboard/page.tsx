"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardBody,
  Spinner,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { Plus, CheckSquare, Clock, CheckCircle2, ListTodo, TrendingUp, LogOut } from "lucide-react";
import { TaskCard } from "@/components/TaskCard";
import { TaskModal } from "@/components/TaskModal";
import { ITask } from "@/models/Task";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<ITask | null>(null);
  const [filter, setFilter] = useState<"all" | ITask["status"]>("all");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchTasks();
    }
  }, [session]);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/tasks");
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao buscar tarefas:", errorData);
        return;
      }
      
      const data = await response.json();
      setTasks(data.tasks || []);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      alert("Erro ao carregar tarefas. Verifique o console para mais detalhes.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: ITask) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (taskData: Partial<ITask>) => {
    try {
      const url = editingTask
        ? `/api/tasks/${editingTask._id}`
        : "/api/tasks";
      const method = editingTask ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        const data = await response.json();
        await fetchTasks();
        setIsModalOpen(false);
        setEditingTask(null);
        // Feedback visual
        if (editingTask) {
          console.log("Tarefa atualizada com sucesso!");
        } else {
          console.log("Tarefa criada com sucesso!");
        }
      } else {
        const data = await response.json();
        console.error("Erro na resposta:", data);
        alert(data.error || "Erro ao salvar tarefa. Verifique o console.");
      }
    } catch (error) {
      console.error("Erro ao salvar tarefa:", error);
      alert("Erro ao salvar tarefa. Verifique sua conexão e tente novamente.");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm("Tem certeza que deseja deletar esta tarefa?")) {
      return;
    }

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchTasks();
      } else {
        alert("Erro ao deletar tarefa");
      }
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      alert("Erro ao deletar tarefa");
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: ITask["status"]) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        await fetchTasks();
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" label="Carregando..." />
      </div>
    );
  }

  if (status === "unauthenticated") {
    // Redirecionar para login se não estiver autenticado
    router.push("/auth/login");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" label="Redirecionando..." />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" label="Verificando autenticação..." />
      </div>
    );
  }

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  const stats = {
    total: tasks.length,
    pendente: tasks.filter((t) => t.status === "pendente").length,
    "em-andamento": tasks.filter((t) => t.status === "em-andamento").length,
    concluida: tasks.filter((t) => t.status === "concluida").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
              Dashboard
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Bem-vindo de volta, <span className="font-semibold text-primary">{session.user?.name}</span>! 👋
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              color="primary"
              size="lg"
              className="font-semibold shadow-lg hover:shadow-xl transition-shadow"
              startContent={<Plus size={20} />}
              onPress={handleCreateTask}
            >
              Nova Tarefa
            </Button>
            <Button
              color="danger"
              variant="bordered"
              size="lg"
              className="font-semibold border-2"
              startContent={<LogOut size={20} />}
              onPress={handleSignOut}
            >
              Sair
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <ListTodo className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </CardBody>
          </Card>

          <Card className="border-l-4 border-l-yellow-500 hover:shadow-lg transition-shadow">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pendentes</p>
                <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                  <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.pendente}</p>
            </CardBody>
          </Card>

          <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Em Andamento</p>
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats["em-andamento"]}</p>
            </CardBody>
          </Card>

          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Concluídas</p>
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.concluida}</p>
            </CardBody>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <Tabs
            selectedKey={filter}
            onSelectionChange={(key) => setFilter(key as typeof filter)}
            variant="underlined"
            classNames={{
              tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
              cursor: "w-full bg-primary",
              tab: "max-w-fit px-4 h-12",
              tabContent: "group-data-[selected=true]:text-primary font-semibold",
            }}
          >
            <Tab key="all" title="Todas" />
            <Tab key="pendente" title="Pendentes" />
            <Tab key="em-andamento" title="Em Andamento" />
            <Tab key="concluida" title="Concluídas" />
          </Tabs>
        </div>

        {/* Tasks List */}
        {filteredTasks.length === 0 ? (
          <Card className="border-2 border-dashed">
            <CardBody className="text-center py-16">
              {filter === "all" ? (
                <div className="space-y-4">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                    Nenhuma tarefa criada ainda
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Comece organizando suas tarefas! Clique no botão abaixo para criar sua primeira tarefa.
                  </p>
                  <Button
                    color="primary"
                    size="lg"
                    startContent={<Plus size={20} />}
                    onPress={handleCreateTask}
                  >
                    Criar Primeira Tarefa
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-gray-500 text-lg">
                    Nenhuma tarefa com status {filter} encontrada.
                  </p>
                  <p className="text-sm text-gray-400">
                    Tente outro filtro ou crie uma nova tarefa.
                  </p>
                </div>
              )}
            </CardBody>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </div>
  );
}
