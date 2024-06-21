import create from 'zustand';

const useStore = create((set) => ({
  data: [],
  setData: (newData) => set({ data: newData }),
  updateRow: (id, newRow) => set((state) => ({
    data: state.data.map((row) =>
      row.id === id ? { ...row, ...newRow } : row
    )
  })),
  deleteRow: (id) => set((state) => ({
    data: state.data.filter((row) => row.id !== id)
  })),
}));

export default useStore;
