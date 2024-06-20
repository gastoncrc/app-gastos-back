import { Request, Response } from "express";
import Bill from "../models/bill";
import User from "../models/user";

export const createBill = async (req: Request, res: Response) => {
  const { name, price, category, user } = req.body;
  if (!name || !price || !category || !user) {
    return res.json("Faltan datos en el gasto ingresado");
  }
  try {
    const billCreate = await Bill.create({
      name: name,
      price: price,
      category: category,
      user: user,
    });
    res.json(billCreate);
  } catch (error) {
    throw new Error("Error al conectar con el servidor");
  }
};

export const getBillByName = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    return res.json("El nombre del gasto está vacío");
  }
  try {
    const bill = await Bill.findOne({ name: name });
    if (!bill) {
      return res.json({ msg: "No existe un gasto con ese nombre" });
    }
    res.json(bill);
  } catch (error) {
    throw new Error("Error al conectar con el servidor");
  }
};

export const getBills = async (_: Request, res: Response) => {
  try {
    const bills = await Bill.find({}).populate("user");
    if (bills.length == 0) {
      return res.json({ msg: "No hay ningún gasto en la base de datos" });
    }
    res.json(bills);
  } catch (error) {
    throw new Error("Error al conectar con el servidor");
  }
};

export const getBillByEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.json({ msg: "No ha ingresado ningún email" });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ msg: "No existe el email" });
    }
    const { id } = user;
    const bill = await Bill.find({ user: id });
    if (!bill) {
      return res.json({
        msg: "No existe un gasto asociado al email ingresado",
      });
    }
    res.json(bill);
  } catch (error) {
    throw new Error("Error al conectar con el servidor");
  }
};
