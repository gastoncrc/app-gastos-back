import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = async (_: Request, res: Response) => {
  try {
    const users = await User.find({});
    if (users.length == 0) {
      return res.json({ msg: "No hay usuario en la base de datos" });
    }
    res.json(users);
  } catch (error) {
    throw new Error("Error al conectar con el servidor");
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ msg: "El usuario no existe" });
    }
    res.json(user);
  } catch (error) {
    throw new Error("Error al conectar con el servidor");
  }
};

export const getUserbyId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.json({ msg: `El usuario con el ID: ${id} no existe` });
    }
    res.json(user);
  } catch (error) {
    throw new Error("Error al conectar con el servidor");
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, age } = req.body;
  if (!name || !email || !age) {
    return res.json({ msg: "Faltan datos para crear un usuario" });
  }
  const user = { name, email, age };
  try {
    await User.create(user);
    res.json({ msg: "Usuario guardado existosamente" });
  } catch (error) {
    throw new Error("Error al conectar con el servidor");
  }
};
