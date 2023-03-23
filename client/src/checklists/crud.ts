interface Props {
  data?: any;
  setData?: (something: any) => any;
  storageKey: string;
}

interface CRUD {
  //returns the something it created
  create: (something: any) => any;
  //returns the whole storage data
  read: () => any;
  //returns the somthing it updated
  update: (id: string | number, something: any) => any;
  //stupid reserved words! You've ruined it!
  del: (something: any) => void;
}
export function useCRUD<Props>({ data, setData, storageKey }): CRUD {
  const create = (something: any) => {};
  const read = () => {};
  const update = (id: string | number, something: any) => {};
  const del = (something: any) => {};
  return {
    create,
    read,
    update,
    del,
  };
}
