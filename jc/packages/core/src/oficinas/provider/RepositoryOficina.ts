import Oficina from "../model/Oficina";

export default interface RepositoryOficina {
  save(params: Oficina): Promise<string>;
  list(): Promise<Oficina[]>;
  findById(id: string): Promise<Oficina | null>;
  delete(id: string): Promise<void>;
  updatePhoto(photo: any): Promise<any | null>;
}