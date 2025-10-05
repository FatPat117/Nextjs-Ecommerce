import { useFormStatus } from "react-dom";

export default function SubmitButton() {
        const { pending } = useFormStatus();
        return (
                <button
                        type="submit"
                        disabled={pending}
                        className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition disabled:bg-gray-400"
                >
                        {pending ? (
                                <>
                                        <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                                        Adding...
                                </>
                        ) : (
                                "➕ Add Product"
                        )}
                </button>
        );
}
