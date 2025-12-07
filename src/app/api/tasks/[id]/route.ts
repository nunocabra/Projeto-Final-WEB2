import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";
import mongoose from "mongoose";

// GET - Buscar tarefa específica
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    await connectDB();

    const userId = new mongoose.Types.ObjectId(session.user.id);

    const task = await Task.findOne({
      _id: params.id,
      userId: userId,
    });

    if (!task) {
      return NextResponse.json(
        { error: "Tarefa não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ task }, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao buscar tarefa:", error);
    return NextResponse.json(
      { error: "Erro ao buscar tarefa" },
      { status: 500 }
    );
  }
}

// PUT - Atualizar tarefa
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    const { title, description, status, priority } = await request.json();

    await connectDB();

    const userId = new mongoose.Types.ObjectId(session.user.id);

    const task = await Task.findOne({
      _id: params.id,
      userId: userId,
    });

    if (!task) {
      return NextResponse.json(
        { error: "Tarefa não encontrada" },
        { status: 404 }
      );
    }

    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (status) task.status = status;
    if (priority) task.priority = priority;

    await task.save();

    return NextResponse.json(
      { message: "Tarefa atualizada com sucesso", task },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erro ao atualizar tarefa:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar tarefa" },
      { status: 500 }
    );
  }
}

// DELETE - Deletar tarefa
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    await connectDB();

    const userId = new mongoose.Types.ObjectId(session.user.id);

    const task = await Task.findOneAndDelete({
      _id: params.id,
      userId: userId,
    });

    if (!task) {
      return NextResponse.json(
        { error: "Tarefa não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Tarefa deletada com sucesso" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erro ao deletar tarefa:", error);
    return NextResponse.json(
      { error: "Erro ao deletar tarefa" },
      { status: 500 }
    );
  }
}


