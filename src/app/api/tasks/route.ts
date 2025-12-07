import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";
import mongoose from "mongoose";

// GET - Listar todas as tarefas do usuário
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    await connectDB();

    // Converter userId string para ObjectId
    const userId = new mongoose.Types.ObjectId(session.user.id);

    const tasks = await Task.find({ userId }).sort({
      createdAt: -1,
    });

    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao buscar tarefas:", error);
    return NextResponse.json(
      { error: "Erro ao buscar tarefas" },
      { status: 500 }
    );
  }
}

// POST - Criar nova tarefa
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    const { title, description, status, priority } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: "Título é obrigatório" },
        { status: 400 }
      );
    }

    await connectDB();

    // Converter userId string para ObjectId
    const userId = new mongoose.Types.ObjectId(session.user.id);

    const task = await Task.create({
      title,
      description: description || "",
      status: status || "pendente",
      priority: priority || "media",
      userId: userId,
    });

    return NextResponse.json(
      { message: "Tarefa criada com sucesso", task },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erro ao criar tarefa:", error);
    return NextResponse.json(
      { error: "Erro ao criar tarefa" },
      { status: 500 }
    );
  }
}


