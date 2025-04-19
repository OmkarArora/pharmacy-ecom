import { create } from "zustand";

interface ToastState {
	message: string;
	visible: boolean;
	show: (message: string) => void;
	hide: () => void;
}

const useToastStore = create<ToastState>((set) => ({
	message: "",
	visible: false,
	show: (message: string) => {
		set({ message, visible: true });
		setTimeout(() => {
			set({ visible: false });
		}, 2000); // Adjust duration as needed
	},
	hide: () => set({ visible: false }),
}));

export default useToastStore;
