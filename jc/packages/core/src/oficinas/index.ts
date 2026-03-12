import Oficina from "./model/Oficina";
import RepositoryOficina from "./provider/RepositoryOficina";
import SaveOficina from "./service/Save";
import ListOficina from "./service/List";
import FindByIdOficina from "./service/FindById";
import DeleteOficina from "./service/Delete";
import UpdateLogoOficinaForNif from './service/UpdateLogoNif';
export type { Oficina,RepositoryOficina };
export { SaveOficina,ListOficina,FindByIdOficina,DeleteOficina , UpdateLogoOficinaForNif};