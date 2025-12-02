import express, { type ErrorRequestHandler, type Request, type Response, type NextFunction } from "express";
import productRoutes from "./routes/product.route.js"
const app = express();
const PORT = process.env.PORT ?? 4000;
const API_PREFIX = process.env.API_PREFIX ?? "/api"

app.use(express.json());
app.use(`${API_PREFIX}/products`, productRoutes);

const errorHandler: ErrorRequestHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if( err instanceof Error){
    res.status(500).json({error: err.message});
  } else {
    res.status(500).json({error: "an unexpected error occured"});
  }
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("server started");
})


