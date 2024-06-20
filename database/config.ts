import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const dbURL = process.env.DB;
    if (!dbURL) {
      console.error("No está seteada correctamente la variable de entorno");
      throw new Error("No está seteada correctamente la variable de entorno");
    }
    await mongoose.connect(dbURL);
    console.log("La conexión se realizó exitosamente");
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo conectar a la base de datos");
  }
};
